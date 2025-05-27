"use client";
import Image from "next/image";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Navbar2 from "../navbar/Navbar2";
import Link from "next/link";
import { useWishlist } from "../contexts/wishlist-context";
import { IoCarSport } from "react-icons/io5";

export default function Wishlist() {
  const { wishlist, handleDelete } = useWishlist();

  return (
    <div>
      <Navbar2 />
      <div className="flex items-center mt-4 px-3 gap-2">
        <h1 className="font-bold text-lg text-[#90A3BF]">Wishlist</h1>
        <Image src="/images/heart.png" height={20} width={20} alt="wishlist" />
      </div>
      <div
        className="flex items-start justify-center relative px-3 py-4 mb-8
                min-h-screen"
      >
        <div
          className="p-2 z-30 bg-[#F6F7F9] shadow-md
                  space-y-2 w-[28rem] rounded md:w-full"
        >
          {wishlist.length > 0 ? (
            wishlist.map((item: any) => (
              <div className="bg-white p-3 rounded-md shadow-sm" key={item._id}>
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
                          <span className="text-sm text-[#90A3BF]">day</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div
                    className="flex items-center justify-center rounded-full
                   hover:bg-[#F6F7F9] p-2"
                  >
                    <AiOutlineDelete
                      onClick={() => handleDelete(item._id)}
                      className="text-[#90A3BF] h-6 w-6 hover:cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center mx-auto">
              <div className="flex-col">
                <p className="text-[#90A3BF] text-base">
                  Your wishlist is empty!
                </p>
                <Link href="/car-rent">
                  <div
                    className="mt-3 mb-4 bg-[#90A3BF] hover:bg-slate-500 rounded-full p-2 flex
              items-center justify-center gap-2 hover:scale-100 duration-100 hover:shadow-md"
                  >
                    <p className="text-white font-medium">Browse Cars</p>
                    <IoCarSport className="h-5 w-5 text-white" />
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}