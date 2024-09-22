import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { ChevronLeft, ChevronRight } from "lucide-react";


/**
 * This is all the props for CategoryPillP Element
 * @prop {categories} - This will be given as param that contains the categories to be shown in the element
 * @prop {selectedCategory} - This will be given as a param that contains the selected category to then highlight buttons
 * This paramater is saved in the parent component to be used in other components
 * @prop {onSelect} - This function is to change the selected category in the parent function to be used in this component
 * and used in other child components the parent has
 */
type CategoryPillProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

// Translation amount for translating the scrollable categories 
const TRANSLATION_AMOUNT = 200; // default is 200px

/**
 * This element shows all category buttons in it's respective div element and give selected category to parent to be used in
 * other components, the selected category is also used in this element to highlight seleceted category button
 * @param categories - The categories that the user has given by parent function from user's data
 * @param selectedCategory - The selected category that is given by parent function
 * @param onSelect - A void function that will change the selected category in the parent function
 * @returns {JSX.Element} Category Pills Element
 */
const CategoryPills = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillProps): JSX.Element => {

  const [translate, setTranslate] = useState(0); // how much the page is translated to the right
  const [isLeftNotVisible, setIsLeftNotVisible] = useState(false); // are the left side pills visible
  const [isRightNotVisible, setIsRightNotVisible] = useState(true); // are the Right side pills visible


  const containerRef = useRef<HTMLDivElement>(null);   // main container ref (used on first div)

  /**
   * When the page is translated or the categories are changed this useEffect will check if the left or right side are
   * still visible or not, it will not return anything at all if the containerRef is in base state.
   * It checks left side is visible as if the page is translated at all to the right (translate > 0) it isnt visible
   * It checks if left side is visible as if the translation + base computer width is less than the pill list it the right 
   * side is not visible.
   * After it checks visibility it will stop observing the containerRef
   */
  useEffect(() => {
    if (containerRef.current === null) {
      return;
    }
    const observer = new ResizeObserver((entries) => {
      console.log(entries);
      const container = entries[0]?.target;

      if (container == null) {
        return;
      }

      setIsLeftNotVisible(translate > 0);
      setIsRightNotVisible(
        translate + container.clientWidth < container.scrollWidth
      );
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [categories, translate]);

  return (
    <div ref={containerRef} className="overflow-x-hidden relative">
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{
          transform: "translateX(-" + translate + "px)", //translation to right of "translate" pixels
        }}
      >
        {/*Maps all category buttons with their respective names, and if the selceted category is the category 
        that the button has (key) it will change the style to dark to signify it is selected */}
        {categories.map((category) => (
          <Button
            variant={selectedCategory === category ? "dark" : "default"}
            className="py-1 px-3 rounded-lg whitespace-nowrap"
            key={category}
            onClick={() => onSelect(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      {/*if the left side is not visible it will show an arrow to scroll left */}
      {isLeftNotVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
                /* the new translate is made by subtracting translate from amount which will transform it to the left
                as the transformX starts as negative (-(-x)) if the newTranslate is less than or equal to zero it either
                overshot to the left or is at base state in which it will return 0 makeing the new transform at base 
                state 0, If it doens't overshoot it will set translate to the new translate moving it to the left x 
                amount of pixels */
              setTranslate((translate) => {
                const newTranslate = translate - TRANSLATION_AMOUNT;
                if (newTranslate <= 0) {
                  return 0;
                } else {
                  return newTranslate;
                }
              });
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {/*if the right side is not visible it will show an arrow to scroll right */}
      {isRightNotVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
                /* if containerRef is in base form it will return base translate as it wont be able to move
                Also, if the translate is greater than the size to the edge (overshoots) it will to to the
                right as far as possible aka. edge-width which is enough to see the right and as much of 
                the left side s possible. Other than those cases it will just return the newTranslate which 
                is translate + the translation amount as it will be moving left with + sign (-(+))*/
              setTranslate((translate) => {
                if (containerRef.current == null) {
                  return translate;
                }
                const newTranslate = translate + TRANSLATION_AMOUNT;
                const edge = containerRef.current.scrollWidth;
                const width = containerRef.current.clientWidth;

                if (newTranslate + width >= edge) {
                  return edge - width;
                } else {
                  return newTranslate;
                }
              });
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryPills;
