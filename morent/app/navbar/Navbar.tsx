"use client";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import SearchBar from "../components/searchBar";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import { useWishlist } from "../contexts/wishlist-context";

export default function Navbar() {
  const { wishlist, handleDelete } = useWishlist();

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };
  return (
    <ClerkProvider>
      <nav
        className="box-border bg-white border border-[#C3D4E9] mt-0 lg:mt-16
      border-opacity-40 p-6 lg:p-5 lg:flex lg:flex-row lg:items-start 
      lg:justify-between items-center justify-center h-auto relative border-r-0 hidden"
      >
        <div className="lg:flex items-center justify-between lg:space-x-10 lg:-mb-5">
          {/* Logo */}
          <div className="flex lg:items-center lg:space-x-0 lg:ml-3 mt-1">
            <Link href="/" className="h-11">
              <Image
                src="/images/Logo.png"
                width={130}
                height={36}
                alt="Logo"
              />
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
            <SearchBar onSearch={handleSearch} />
          </div>
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
                wishlist.map((item: any) => (
                  <li
                    className="bg-white p-3 rounded-md shadow-sm"
                    key={item._id}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 items-center">
                        <Link href={`/detail-car-rent/${item.slug.current}`}>
                          <Image
                            src={item.image.asset.url}
                            height={100}
                            width={100}
                            alt="item"
                          />
                        </Link>
                        <div className="flex flex-col gap-1">
                          <Link href={`/detail-car-rent/${item.slug.current}`}>
                            <h2 className="font-bold text-[#1A202C]">
                              {item.name}
                            </h2>
                            <p className="font-bold text-sm text-[#90A3BF]">
                              {item.category}
                            </p>
                            <div className="text-base font-bold">
                              {item.rentPerDay}/{" "}
                              <span className="text-sm text-[#90A3BF]">
                                day
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div
                        className="flex items-center justify-center hover:bg-[#F6F7F9]
                      rounded-full p-1"
                      >
                        <AiOutlineDelete
                          onClick={() => handleDelete(item._id)}
                          className="text-[#90A3BF] h-5 w-5 hover:cursor-pointer"
                        />
                      </div>
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

          <Link href="/settings">
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

          <SignedOut>
            <Link href="/dashboard">
              <li
                className="w-9 h-9 flex-none rounded-full ring-1 ring-[#C3D4E9] ring-opacity-40 
          flex items-center justify-center"
              >
                <div className="h-9 w-9">
                  <SignInButton>
                    <Image
                      src="/images/profileiconloggedout.png"
                      height={54}
                      width={54}
                      alt="profile absolute"
                    />
                  </SignInButton>
                </div>
              </li>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <li
                className="w-9 h-9 flex-none rounded-full ring-1 ring-[#C3D4E9] ring-opacity-40 
          flex items-center justify-center"
              >
                <button className="flex items-center justify-center h-9 w-9">
                  <Image
                    src="/images/profileicon.png"
                    height={54}
                    width={54}
                    alt="profile absolute"
                  />
                </button>
              </li>
            </Link>
          </SignedIn>
        </ul>
      </nav>
    </ClerkProvider>
  );
}