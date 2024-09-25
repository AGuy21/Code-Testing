import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import logo from "../assets/logo.png";
import { Button } from "./Button";
import { useState } from "react";
import { useSidebarContext } from "../contexts/SidebarContexts";

/**
 * PageHeader is a component that will show the youtube header,
 * This header will have 3 segmants:
 * 1. Left side with menu and logo
 * 2. Middle with search bar and microphone search
 * 3. Account change, notifications, and other icons
 *
 * @returns {JSX.Element} PageHeader Element
 */
const PageHeader = (): JSX.Element => {
  /* showFullWidthSearch is true if the user clicks to search icon which is shown if screen size is too small to fit full width search bar
  when the full width search bar is shown it also shows a back arrow which will set showFullWidthSearch to false */
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pd-2 mb-6 mx-4">
      {/*Left side of  Header  has the menu button and youtube logo made into a seperate component due to it being used in another component*/}
      <PageHeaderFirstSection hidden={showFullWidthSearch} />
      {/* Middle of Header used to search up anything with either typing or voice */}
      <form
        className={
          showFullWidthSearch
            ? "gap-4 flex-grow justify-center flex"
            : "gap-4 flex-grow justify-center hidden md:flex"
        }
      >
        {/* If we are going to need to show the full search on a small screen we need the back button
        if we dont need to click the search button to use search like on a wider screen we can hide the back button */}
        {showFullWidthSearch && (
          <Button
            size="icon"
            className="flex-shrink-0"
            type="button"
            variant="ghost"
            onClick={() => setShowFullWidthSearch(false)}
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          ></input>

          <Button className="py-2 px-4 rounded-r-full border-secondary-border border border-1-0 flex-shrink-0">
            <Search />
          </Button>
        </div>
        <Button size="icon" className="flex-shrink-0" type="button">
          <Mic />
        </Button>
      </form>

      <div
        className={
          showFullWidthSearch
            ? "flex-shrink-0 md:gap-2 hidden"
            : "flex-shrink-0 md:gap-2 flex"
        }
      >
        {/*We use md:hidden here so when the screen size is medium or higher the buttons will not show as 
        the main search bar will show when the screen size is medium or larger */}
        <Button
          onClick={() => setShowFullWidthSearch(true)}
          size="icon"
          variant="ghost"
          className="md:hidden"
        >
          <Search />
        </Button>
        <Button size="icon" variant="ghost" className="md:hidden">
          <Mic />
        </Button>

        {/* Right side of Header buttons: Account, Upload, Notifications*/}
        <Button size="icon" variant="ghost">
          <Upload />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>
        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </div>
  );
};

type PageHeaderFirstSectionProps = {
  hidden?: boolean;
};

export function PageHeaderFirstSection({
  hidden = false,
}: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext();

  return (
    <div
      className={
        hidden
          ? "gap-4 items-center flex-shrink-0 hidden"
          : "gap-4 items-center flex-shrink-0 flex"
      }
    >
      <Button variant="ghost" size="icon" onClick={toggle}>
        <Menu /> {/*This is menu icon not component*/}
      </Button>

      <a href="/">
        <img src={logo} className="h-6"></img>
      </a>
    </div>
  );
}
export default PageHeader;
