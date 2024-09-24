import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

/**
 * This button styles will take in 2 variants those being:
 * @variation {variant} - This will be either ghost (no bg till hover) or default button style
 * @variation {size} - This will be either default button size or icon button which will be round and fit icon in center
 * If no specific style is specified it will default to @variation {variant} default & @variation {size} default
 * The basic style that will always be active no matter the variation will be "transition-colors"
 */
export const buttonStyles = cva(["transition-colors"], {
  variants: {
    variant: {
      default: ["bg-secondary", "hover:bg-secondary-hover"],
      ghost: ["hover:bg-gray-100"],
      dark: [
        "bg-secondary-dark",
        "hover:bg-secondary-dark-hover",
        "text-secondary",
      ],
    },
    size: {
      default: ["rounded", "p-2"],
      icon: [
        "rounded-full",
        "w-10",
        "h-10",
        "flex",
        "items-center",
        "justify-center",
        "padding-2.5",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;
/**
 * This is a custom button prop that will take in the button style variations as paramaters these are as follows:
 * @param variant - This will be either ghost (no bg till hover) or default button style
 * @param size - This will be either default button size or icon button which will be round and fit icon in center
 * If no specific style is specified it will default to @param variant as "default" & @param size  as "default"
 * The basic style that will always be active no matter the variation will be "transition-colors"
 * The button will also take in className for further custom styling and take basic button component props
 * @param className - Basic className for all other styling but will not override button variations or other styling in @function buttonStyles
 * This component will also take in child props that would be taken in from button components aswell
 * @returns {JSX.Element} A custom button with style variants and added classnames and all child props needed
 */
export function Button({ variant, size, className, ...props }: ButtonProps): JSX.Element {
  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ variant, size }), className)}
    />
  );
}
