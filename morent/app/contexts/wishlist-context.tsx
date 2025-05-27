"use client";
import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext<any>(undefined);

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const favItems = JSON.parse(
        localStorage.getItem("carRentWishlist") ?? "[]"
      );
      setWishlist(favItems);
    }
  }, []);

  const addToWishlist = (item: any) => {
    const updatedWishlist = [...wishlist, item];
    setWishlist(updatedWishlist);
    localStorage.setItem("carRentWishlist", JSON.stringify(updatedWishlist));
  };

  const handleDelete = (itemId: string) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== itemId);
    setWishlist(updatedWishlist);
    localStorage.setItem("carRentWishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, handleDelete }}>
      {children}
    </WishlistContext.Provider>
  );
};

//hook to access wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};