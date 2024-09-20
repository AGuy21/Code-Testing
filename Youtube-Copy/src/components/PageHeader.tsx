import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import logo from "../assets/logo.png";
import { Button } from "./Button";
import { useState } from "react";

/**
 * PageHeader is a component that will show the youtube header,
 * This header will have 3 segmants:
 * 1. Left side with menu and logo
 * 2. Middle with search bar and microphone search
 * 3. Account change, notifications, and other icons
 * @returns PageHeader
 */
const PageHeader = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  // string interpolation wasn't working so we make a const that holds the value of if FullWidthSearch should be used
  // getShowFullWidthSearchStyleHide is for when the show full is true we want to show and vice versa for getShowFullWidthSearchStyleShow
  const getShowFullWidthSearchStyleHide = showFullWidthSearch
    ? "hidden"
    : "flex";
  const getShowFullWidthSearchStyleShow = showFullWidthSearch
    ? "flex"
    : "hidden md:flex ";
  return (
    <div className="flex gap-10 lg:gap-20 justify-between pd-2 mb-6 mx-4">
      {/*Left side of  Header  has the menu button and youtube logo*/}
      <div
        className={
          "gap-4 items-center flex-shrink-0 " + getShowFullWidthSearchStyleHide
        }
      >
        <Button variant="ghost" size="icon">
          <Menu /> {/*This is menu icon not component*/}
        </Button>

        <a href="/">
          <img src={logo} className="h-6"></img>
        </a>
      </div>

      {/* Middle of Header used to search up anything with either typing or voice */}
      <form
        className={
          "gap-4 flex-grow justify-center " + getShowFullWidthSearchStyleShow
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
        className={"flex-shrink-0 md:gap-2 " + getShowFullWidthSearchStyleHide}
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

export default PageHeader;
