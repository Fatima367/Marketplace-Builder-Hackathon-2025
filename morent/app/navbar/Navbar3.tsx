"use client";
import { XMarkIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar3() {
  const [showNav, setShowNav] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav
      className="box-border bg-white border border-[#C3D4E9] mt-0 lg:mt-16
        border-opacity-40 p-6 lg:p-5 flex flex-col items-center justify-center h-auto
         relative border-r-0 lg:hidden"
    >
      <div className="flex w-full items-center justify-between mb-2">
        <button
          className=" absolute cursor-pointer top-6 
                    left-3 md:left-5 w-[2rem] h-[1rem]"
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
          <button
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            {showMenu ? (
              <XMarkIcon
                className="text-2xl text-[#596780] absolute right-4 top-5"
                height={24}
                width={24}
              />
            ) : (
              <Image
                src="/images/Image.png"
                height={44}
                width={44}
                alt="profile"
                className="absolute right-3 top-5 md:right-5"
              />
            )}
          </button>
        </div>
      </div>
      {showNav && (
        <div className="absolute left-2 mt-5 bg-white rounded-md shadow-md p-4 z-20">
          <ul className="space-y-2 flex flex-col">
            <Link href="/detail-car-rent">
              <li className="flex space-x-3">
                <button>
                  <Image
                    src="/images/heart.png"
                    height={24}
                    width={24}
                    alt="search"
                  />
                </button>
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
      {showMenu && (
        <ul
          className="flex flex-col bg-white rounded-md shadow-md p-5 z-20 absolute md:right-5 right-3
        md:top-11 top-10"
        >
          <li className="flex flex-col space-y-10 mt-5">
            <p className="text-[#90A3BF] text-base ml-2">M A I N M E N U</p>
            <div className="space-y-8">
              <div
                className="w-60 h-14 rounded-lg bg-[#3563E9] text-white
                       relative flex items-center justify-start"
              >
                <div className="text-xl font-medium z-10 absolute flex items-center">
                  <Image
                    src="/images/home.png"
                    height={24}
                    width={24}
                    alt="Home"
                    className="ml-3 mr-2"
                  />{" "}
                  <p> Dashboard</p>
                </div>
              </div>

              <div
                className="text-xl font-medium flex z-10 text-[#90A3BF] items-center
                       hover:bg-blue-50 hover:rounded-md cursor-pointer"
              >
                <Image
                  src="/images/car-icon.png"
                  height={24}
                  width={24}
                  alt="Home"
                  className="ml-3 mr-2"
                />{" "}
                <p> Car Rent</p>
              </div>

              <div
                className="text-xl font-medium flex z-10 text-[#90A3BF] items-center
                       hover:bg-blue-50 hover:rounded-md cursor-pointer"
              >
                <Image
                  src="/images/chart.png"
                  height={24}
                  width={24}
                  alt="Home"
                  className="ml-3 mr-2"
                />{" "}
                <p> Insight</p>
              </div>

              <div
                className="text-xl font-medium flex z-10 text-[#90A3BF] items-center
                       hover:bg-blue-50 hover:rounded-md cursor-pointer"
              >
                <Image
                  src="/images/wallet.png"
                  height={24}
                  width={24}
                  alt="Home"
                  className="ml-3 mr-2"
                />{" "}
                <p> Reimburse</p>
              </div>

              <div
                className="text-xl font-medium flex z-10 text-[#90A3BF] items-center
                       hover:bg-blue-50 hover:rounded-md cursor-pointer"
              >
                <Image
                  src="/images/message.png"
                  height={24}
                  width={24}
                  alt="Home"
                  className="ml-3 mr-2"
                />{" "}
                <p> Inbox</p>
              </div>

              <div
                className="text-xl font-medium flex z-10 text-[#90A3BF] items-center
                       hover:bg-blue-50 hover:rounded-md cursor-pointer"
              >
                <Image
                  src="/images/calendar.png"
                  height={24}
                  width={24}
                  alt="Home"
                  className="ml-3 mr-2"
                />{" "}
                <p> Calendar</p>
              </div>
            </div>
          </li>

          <li className="flex flex-col space-y-7 mt-10">
            <p className="text-[#90A3BF] text-base ml-2">
              P R E F E R E N C E S
            </p>

            <div className="space-y-8">
              <div
                className="text-xl font-medium flex z-10 text-[#90A3BF] items-center
                       hover:bg-blue-50 hover:rounded-md cursor-pointer"
              >
                <Image
                  src="/images/setting.png"
                  height={24}
                  width={24}
                  alt="Home"
                  className="ml-3 mr-2"
                />{" "}
                <p>Settings</p>
              </div>

              <div
                className="text-xl font-medium flex z-10 text-[#90A3BF] items-center
                       hover:bg-blue-50 hover:rounded-md cursor-pointer"
              >
                <Image
                  src="/images/info.png"
                  height={24}
                  width={24}
                  alt="Home"
                  className="ml-3 mr-2"
                />{" "}
                <p> Help & Center</p>
              </div>

              <div
                className="text-xl font-medium flex z-10 text-[#90A3BF] items-center
                       hover:bg-blue-50 hover:rounded-md cursor-pointer"
              >
                <Image
                  src="/images/briefcase.png"
                  height={24}
                  width={24}
                  alt="Home"
                  className="ml-3 mr-2"
                />{" "}
                <p> Dark Mode</p>
                <div
                  className="ml-6 bg-[#F6F7F9] rounded-full w-68px flex items-center justify-center
                         w-[68px] h-[34px] space-x-3"
                >
                  <div className="rounded-full bg-[#3563E9] h-7 w-7 flex items-center justify-center">
                    <Image
                      src="/images/sun.png"
                      height={16}
                      width={16}
                      alt="lightmode"
                    />
                  </div>
                  <Image
                    src="/images/moon.png"
                    height={14.96}
                    width={14.96}
                    alt="darkmode"
                  />
                </div>
              </div>
            </div>
          </li>

          <li className="flex mt-10 mb-6">
            <Link href="/">
              <div
                className="text-xl font-medium flex z-10 text-[#90A3BF] items-center
                       hover:bg-blue-50 hover:rounded-md cursor-pointer hover:w-60"
              >
                <Image
                  src="/images/logout.png"
                  height={24}
                  width={24}
                  alt="Home"
                  className="ml-3 mr-2"
                />{" "}
                <p>LogOut</p>
              </div>
            </Link>
          </li>
        </ul>
      )}

      <div
        className="lg:flex md:flex md:justify-between md:w-full items-center justify-between 
      lg:space-x-10 lg:-mb-5 mt-5"
      >
        {/* Logo */}
        <div className="flex lg:items-center lg:space-x-0 lg:ml-3 ml-1 mt-1">
          <Link href="/" className="h-11 md:h-auto">
            <Image src="/images/Logo.png" width={130} height={36} alt="Logo" />
          </Link>
        </div>

        {/* Search bar */}
        <div className="flex items-center justify-center space-x-5 lg:transform lg:-mt-2 mt-4">
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
            <button className="absolute">
              <Image
                src="/images/filter.png"
                height={24}
                width={24}
                alt="filter"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}