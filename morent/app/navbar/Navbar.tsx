"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import {SearchBar} from "../components/searchBar";
import { useRouter } from "next/router";

export default function Navbar({ cars }: any) {
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

  const handleSearch = (query: string) => {
    console.log('Searching for:', query)
  }
  return (
    <nav
      className="box-border bg-white border border-[#C3D4E9] mt-0 lg:mt-16
      border-opacity-40 p-6 lg:p-5 lg:flex lg:flex-row lg:items-start 
      lg:justify-between items-center justify-center h-auto relative border-r-0 hidden"
    >
      <div className="lg:flex items-center justify-between lg:space-x-10 lg:-mb-5">
        {/* Logo */}
        <div className="flex lg:items-center lg:space-x-0 lg:ml-3 mt-1">
          <Link href="/" className="h-11">
            <Image src="/images/Logo.png" width={130} height={36} alt="Logo" />
          </Link>

          <Link href="/dashboard">
            <Image
              src="/images/Image.png"
              height={44}
              width={44}
              alt="profile"
              className="lg:hidden block ml-40 -mt-1"
            />
          </Link>
        </div>

        {/* Search bar */}
        <div className="z-30">
        <SearchBar onSearch={handleSearch}/>
        </div>
        {/* <div className="flex items-center justify-center space-x-5 lg:transform lg:-mt-2 mt-4">
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
              className="absolute bg-transparent lg:w-80 h-10
       placeholder:text-sm placeholder:text-[#596780] placeholder:font-medium placeholder:mx-4
       ml-10 border-0 border-transparent focus-visible:outline-none focus-visible:ring-0"
              placeholder="Search something here"
            />

            <button>
              <Image
                src="/images/filter.png"
                height={24}
                width={24}
                alt="filter"
                className="hidden lg:flex"
              />
            </button>
          </div>
          <div
            className=" rounded-md ring-1 ring-[#C3D4E9] ring-opacity-70 lg:hidden
      h-10 w-9 flex items-center justify-center relative"
          >
            <button>
              <Image
                src="/images/filter.png"
                height={24}
                width={24}
                alt="filter"
                className="block lg:hidden"
              />
            </button>
          </div>
        </div> */}
      </div>

      {/* Profile and Notification */}
      <ul className="lg:items-center gap-5 mt-4 lg:mt-0 lg:ml-0 ml-5 lg:mr-4 lg:flex hidden">
        <li
          className="w-9 h-9 flex-none rounded-full ring-1 ring-[#C3D4E9] ring-opacity-40 
          flex items-center justify-center hover:bg-[#e7eef7] relative group"
        >
          <button>
            <Image
              src="/images/heart.png"
              height={24}
              width={24}
              alt="search"
            />
          </button>
          {wishlist.length > 0 && (
            <div className="absolute rounded-full h-2 w-2 bg-red-500 right-0 top-[2px]"></div>
          )}

          <ul
            className="absolute hidden group-hover:block p-3 top-9 right-3 z-30 bg-[#F6F7F9] shadow-md
            space-y-2 w-[28rem] rounded"
          >
            <div className="flex items-center px-3 gap-2">
              <h1 className="font-bold text-lg text-[#90A3BF]">Wishlist</h1>
              <Image
                src="/images/heart.png"
                height={20}
                width={20}
                alt="wishlist"
              />
            </div>
            {wishlist.length > 0 ? (
              wishlist.map((item) => (
                <li
                  className="bg-white p-3 rounded-md shadow-sm"
                  key={item._id}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 items-center">
                      <Image
                        src={item.image.asset.url}
                        height={100}
                        width={100}
                        alt="item"
                      />
                      <div className="flex flex-col gap-1">
                        <h2 className="font-bold text-[#1A202C]">
                          {item.name}
                        </h2>
                        <p className="font-bold text-sm text-[#90A3BF]">
                          {item.category}
                        </p>
                        <div className="text-base font-bold">
                          {item.rentPerDay}/{" "}
                          <span className="text-sm text-[#90A3BF]">day</span>
                        </div>
                      </div>
                    </div>
                    <AiOutlineDelete
                      onClick={() => handleDelete(item._id)}
                      className="text-[#90A3BF] h-5 w-5 hover:cursor-pointer hover:text-[#8ea5c6]"
                    />
                  </div>
                </li>
              ))
            ) : (
              <div className="flex items-center justify-center mx-auto">
                <p className="text-[#90A3BF] text-base">
                  Your wishlist is empty!
                </p>
              </div>
            )}
          </ul>
        </li>

        <Link href="/">
          <li
            className="w-9 h-9 flex-none rounded-full ring-1 ring-[#C3D4E9] ring-opacity-40 
          flex items-center justify-center relative hover:bg-[#e7eef7]"
          >
            <button>
              <Image
                src="/images/notification.png"
                height={24}
                width={24}
                alt="notification"
              />
            </button>
            <div
              className="rounded-full h-2 w-2 bg-red-500 z-10 absolute top-[2px]
            right-0"
            ></div>
          </li>
        </Link>

        <Link href="/">
          <li
            className="w-9 h-9 flex-none rounded-full ring-1 ring-[#C3D4E9] ring-opacity-40 
          flex items-center justify-center hover:bg-[#e7eef7]"
          >
            <button>
              <Image
                src="/images/setting-2.png"
                height={24}
                width={24}
                alt="settings"
              />
            </button>
          </li>
        </Link>

        <Link href="/dashboard">
          <li
            className="w-9 h-9 flex-none rounded-full ring-1 ring-[#C3D4E9] ring-opacity-40 
          flex items-center justify-center"
          >
            <button>
              <Image
                src="/images/Image.png"
                height={44}
                width={44}
                alt="profile"
              />
            </button>
          </li>
        </Link>
      </ul>
    </nav>
  );
}
