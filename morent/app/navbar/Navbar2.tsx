"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { XMarkIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";

export default function Navbar2() {

    const [wishlist, setWishlist] = useState<any[]>([]);
  
    useEffect(() => {
      const favItems = JSON.parse(
        localStorage.getItem("carRentWishlist") || "[]"
      );
      setWishlist(favItems);
      console.log("Product passed to Wishlist:", favItems);
    }, []);
  
    const handleDelete = (itemId: string) => {
      const updatedWishlist = wishlist.filter((item) => item._id !== itemId);
      setWishlist(updatedWishlist); // Update the wishlist state
      localStorage.setItem("carRentWishlist", JSON.stringify(updatedWishlist)); // Update localStorage
    };
  
  const [showNav, setShowNav] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [progress, setProgress] = useState(70);

  const increaseProgress = (e: MouseEvent<HTMLDivElement>) => {
    setProgress((prev) => Math.min(prev + 10, 100));
  };

  const decreaseProgress = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent triggering the parent click
    setProgress((prev) => Math.max(prev - 10, 0));
  };

  return (
    <nav
      className="box-border bg-white border border-[#C3D4E9] mt-0 lg:mt-16
        border-opacity-40 p-6 lg:p-5 flex flex-col items-center justify-center h-auto
         relative border-r-0 lg:hidden"
    >
      <div className="flex w-full items-center justify-between mb-2">
        <button
          className=" absolute cursor-pointer top-6 
                    left-2 md:left-4 w-[2rem] h-[1rem]"
          onClick={() => setShowNav(!showNav)}
        >
          {showNav ? (
            <XMarkIcon className="text-2xl text-[#596780] " />
          ) : (
            <Image src="/images/menu.png" width={24} height={24} alt="menu" />
          )}
        </button>
        {/* Logo */}
        <div className="">
          <Link href="/dashboard">
            <Image
              src="/images/Image.png"
              height={44}
              width={44}
              alt="profile"
              className="lg:hidden block -mt-1 right-2 md:right-4 absolute "
            />
          </Link>
        </div>
      </div>
      {showNav && (
        <div className="absolute left-2 md:left-6 mt-5 md:mt-16 bg-white rounded-md shadow-md p-4 z-20">
          <ul className="space-y-2 flex flex-col">
            <Link href="/wishlist">
              <li className="flex space-x-3">
                <button>
                  <Image
                    src="/images/heart.png"
                    height={24}
                    width={24}
                    alt="search"
                  />
                </button>
                {wishlist.length > 0 && (
            <div className="rounded-full h-2 w-2 bg-red-500 z-10 absolute 
            left-5"></div>
          )}
                <p className="text-sm text-[#596780]"> Wishlist</p>
              </li>
            </Link>

            <Link href="/">
              <li className="flex space-x-3">
                <button>
                  <Image
                    src="/images/notification.png"
                    height={24}
                    width={24}
                    alt="notification"
                  />
                </button>
                <div
                  className="rounded-full h-2 w-2 bg-red-500 z-10 absolute 
            left-5"
                ></div>
                <p className="text-sm text-[#596780]"> Notifications</p>
              </li>
            </Link>

            <Link href="/">
              <li className="flex space-x-3">
                <button>
                  <Image
                    src="/images/setting-2.png"
                    height={24}
                    width={24}
                    alt="settings"
                  />
                </button>
                <p className="text-sm text-[#596780]"> Settings</p>
              </li>
            </Link>
          </ul>
        </div>
      )}
      <div
        className="lg:flex items-center justify-between lg:space-x-10 lg:-mb-5 mt-12
      md:flex md:mt-0 md:mb-0 md:items-center md:justify-between md:w-full"
      >
        {/* Logo */}
        <div className="flex lg:items-center lg:space-x-0 lg:ml-3 mt-1">
          <Link href="/" className="h-11 md:h-auto">
            <Image
              src="/images/Logo.png"
              width={130}
              height={36}
              alt="Logo"
              className="md:absolute md:left-6 md:mt-2"
            />
          </Link>
        </div>

        {/* Search bar */}
        <div
          className="flex items-center justify-center space-x-5 lg:transform lg:-mt-2 mt-4
         md:mt-14"
        >
          <div
            className="flex items-center justify-between w-[280px] lg:w-[420px] h-[36px]
           lg:rounded-full rounded-md ring-1 ring-[#C3D4E9] ring-opacity-70 
           px-4 relative"
          >
            <button>
              <Image
                src="/images/search-normal.png"
                height={24}
                width={24}
                alt="search"
              />
            </button>

            <input
              type="text"
              className="absolute bg-transparent lg:w-80 h-10 w-full
         placeholder:text-sm placeholder:text-[#596780] placeholder:font-medium placeholder:mx-4
         ml-10 border-0 border-transparent focus-visible:outline-none focus-visible:ring-0"
              placeholder="Search something here"
            />
          </div>
          <div
            className="rounded-md ring-1 ring-[#C3D4E9] ring-opacity-70
        h-10 w-9 flex items-center justify-center relative"
          >
            <button
              className="absolute"
              onClick={() => setShowFilter(!showFilter)}
            >
              {showFilter ? (
                <XMarkIcon
                  className="text-2xl text-[#596780]"
                  height={24}
                  width={24}
                />
              ) : (
                <Image
                  src="/images/filter.png"
                  height={24}
                  width={24}
                  alt="filter"
                />
              )}
            </button>
          </div>
          {showFilter && (
            <ul
              className="right-4 flex flex-col bg-white absolute py-4 z-50 shadow-md rounded-md
                        top-44 px-6 md:top-32 md:right-6"
            >
              <li className="flex flex-col space-y-4 mt-5">
                <p className="text-[#90A3BF] text-base">T Y P E</p>
                <p className="text-xl font-medium">
                  <Checkbox className="mr-2" checked /> Sport{" "}
                  <span className="ml-2 text-[#90A3BF] text-base">(10)</span>
                </p>
                <p className="text-xl font-medium">
                  <Checkbox className="mr-2" checked /> SUV{" "}
                  <span className="ml-2 text-[#90A3BF] text-base">(12)</span>
                </p>
                <p className="text-xl font-medium">
                  <Checkbox className="mr-2" /> MPV{" "}
                  <span className="ml-2 text-[#90A3BF] text-base">(16)</span>
                </p>
                <p className="text-xl font-medium">
                  <Checkbox className="mr-2" /> Sedan{" "}
                  <span className="ml-2 text-[#90A3BF] text-base">(20)</span>
                </p>
                <p className="text-xl font-medium">
                  <Checkbox className="mr-2" /> Cope{" "}
                  <span className="ml-2 text-[#90A3BF] text-base">(14)</span>
                </p>
                <p className="text-xl font-medium">
                  <Checkbox className="mr-2" /> Hatchback{" "}
                  <span className="ml-2 text-[#90A3BF] text-base">(14)</span>
                </p>
              </li>

              <li className="flex flex-col space-y-4 mt-10">
                <p className="text-[#90A3BF] text-base">C A P A C I T Y</p>
                <p className="text-xl font-medium">
                  <Checkbox className="mr-2" checked /> 2 People{" "}
                  <span className="ml-2 text-[#90A3BF] text-base">(10)</span>
                </p>
                <p className="text-xl font-medium">
                  <Checkbox className="mr-2" /> 4 People{" "}
                  <span className="ml-2 text-[#90A3BF] text-base">(14)</span>
                </p>
                <p className="text-xl font-medium">
                  <Checkbox className="mr-2" /> 6 People{" "}
                  <span className="ml-2 text-[#90A3BF] text-base">(12)</span>
                </p>
                <p className="text-xl font-medium">
                  <Checkbox className="mr-2" checked /> 8 People{" "}
                  <span className="ml-2 text-[#90A3BF] text-base">(16)</span>
                </p>
              </li>

              <li className="flex flex-col space-y-4 mt-10">
                <p className="text-[#90A3BF] text-base">P R I C E</p>

                {/* Progress bar */}
                <div
                  className="relative w-full h-2 bg-gray-300 rounded overflow-hidden
                          hover:cursor-pointer"
                  onClick={increaseProgress}
                >
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>

                  <div
                    className="absolute -right-2 w-4 h-4 bg-blue-500 rounded-full ring-4
                               ring-white z-50 top-0 "
                    style={{ left: `${progress}%` }}
                    onClick={decreaseProgress}
                  ></div>
                </div>

                <p className="text-xl font-medium text-[#596780]">
                  Max. $100.00
                </p>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
