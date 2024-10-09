import { HeaderItem } from "../types/HeaderItems";

//!This file will contain all necesssary hardcoded data for the header component (/components/Header.tsx)

//*Header items data is the routes and titles of all pages to be used in the header
export const headerItems: HeaderItem[] = [
  {
    // Page Name & Route
    title: "Home",
    route: "/home",
  },
  {
    // Page Name & Route
    title: "About Me",
    route: "/about",
  },
  {
    // Page Name & Route
    title: "Projects",
    route: "/projects",
  },
  {
    // Page Name & Route
    title: "Blog",
    route: "/blog",
  },
];
