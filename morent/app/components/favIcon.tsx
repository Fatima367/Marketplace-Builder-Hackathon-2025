"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useWishlist } from "../contexts/wishlist-context";

export default function FavIcon({ car }: any) {
  const { wishlist, addToWishlist, handleDelete } = useWishlist();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const isProductInWishlist = wishlist.some(
      (item: any) => item._id === car._id
    );
    setIsFav(isProductInWishlist);
  }, [wishlist, car._id]);

  const handleClick = () => {
    if (isFav) {
      handleDelete(car._id);
      toast("Item removed from wishlist!");
    } else {
      addToWishlist(car);
      toast("Item added to wishlist!");
    }
    setIsFav(!isFav);
  };

  return (
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
  );
}