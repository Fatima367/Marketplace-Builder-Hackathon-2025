"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function FavIcon({ car }: any) {
  const [isFav, setIsFav] = useState(false);
  const savedToWl = () => toast("Item added to wishlist!");
  const removed = () => toast("Item removed from wishlist!");

  useEffect(() => {
    const storedWishlist = localStorage.getItem("carRentWishlist");
    const wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];

    // Check if the product is in the wishlist
    const isProductInWishlist = wishlist.some(
      (item: any) => item._id === car._id
    );

    setIsFav(isProductInWishlist);
  }, [car._id]); // Re-run if the product changes (useEffect dependency array)

  const handleClick = () => {
    if (car && car._id) {
      const storedWishlist = localStorage.getItem("carRentWishlist");
      let wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];

      // Ensure wishlist is an array before using findIndex
      if (!Array.isArray(wishlist)) {
        wishlist = []; // Reset to empty array if it's not valid
      }

      const productIndex = wishlist.findIndex(
        (item: any) => item._id === car._id
      );

      if (productIndex === -1) {
        // If the product is not in the wishlist, add it
        wishlist.push(car);
        localStorage.setItem("carRentWishlist", JSON.stringify(wishlist));
        savedToWl();
      } else {
        // If the product is in the wishlist, remove it
        wishlist.splice(productIndex, 1);
        localStorage.setItem("carRentWishlist", JSON.stringify(wishlist));
        removed();
      }

      //to Toggle fav state
      setIsFav(!isFav);
    } else {
      console.log("Product is undefined or invalid");
    }
  };

  return (
    <>
      <button onClick={handleClick}>
        {isFav ? (
          <Image
            src="/images/Like.png"
            height={24}
            width={24}
            alt="Favourite"
          />
        ) : (
          <Image
            src="/images/Like2.png"
            height={24}
            width={24}
            alt="Favourite"
          />
        )}
      </button>
    </>
  );
}
