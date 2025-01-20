"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Navbar2 from "../navbar/Navbar2";

export default function Wishlist() {
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
            wishlist.map((item) => (
              <div className="bg-white p-3 rounded-md shadow-sm" key={item._id}>
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 items-center">
                    <Image
                      src={item.image.asset.url}
                      height={100}
                      width={100}
                      alt="item"
                    />
                    <div className="flex flex-col gap-1">
                      <h2 className="font-bold text-[#1A202C]">{item.name}</h2>
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
                    className="text-[#90A3BF] h-6 w-6 hover:cursor-pointer hover:text-[#8ea5c6]"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center mx-auto">
              <p className="text-[#90A3BF] text-base">
                Your wishlist is empty!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}