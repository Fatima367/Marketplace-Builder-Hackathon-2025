// app/car-rent/page.tsx
import Link from "next/link";
import React from "react";
import Navbar from "../navbar/Navbar";
import Navbar2 from "../navbar/Navbar2";
import SideBar from "../components/sideBar";
import { ToastContainer } from "react-toastify";
import {
  CarRentPopularCarSection,
  CarRentRecommendationCar,
} from "../components/car-rent-carGrids";
import { PickAndDropForm } from "../components/pickNdrop-form";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

// Define your queries
const POPULAR_CAR_QUERY = defineQuery(`*[ 
  _type == "car" && 
  "popular" in tags[] && defined(_id)
]{
  _id,
  name,
  rentPerDay,
  originalPrice,
  capacity,
  mode,
  fuel,
  category,
  slug,
  image {
    asset -> {
      _id,
      url
    }
  },
  _createdAt,
  _updatedAt
}|order(_createdAt desc)`);

const RECOMMENDATION_CAR_QUERY = defineQuery(`*[ 
  _type == "car" && 
  "recommended" in tags[] && defined(_id)
]{
  _id,
  name,
  rentPerDay,
  originalPrice,
  capacity,
  mode,
  fuel,
  category,
  image {
    asset -> {
      _id,
      url
    }
  },
  _createdAt,
  _updatedAt
}|order(_createdAt desc)`);

// Server Component that fetches data directly
const CarRent = async () => {
  // Fetch the car data using Sanity inside a server-side function
  const popularCarList = await sanityFetch({ query: POPULAR_CAR_QUERY });
  const recommendedCarList = await sanityFetch({ query: RECOMMENDATION_CAR_QUERY });

  return (
    <div className="bg-[#F6F7F9]">
      <Navbar />
      <Navbar2 />
      <div className="flex relative items-start">
        {/* Left Sidebar */}
        <SideBar className="h-[114rem]" />

        {/* Right Content */}
        <div className="flex flex-col items-start justify-center mx-auto lg:px-6 lg:w-[83%]">
          <PickAndDropForm />

          <ToastContainer hideProgressBar />
          <div className="flex flex-col lg:space-y-8 space-y-4 mx-auto">
            {/* Row 1 */}
            <CarRentPopularCarSection cars={popularCarList.data} carCardsNo={3} />

            {/* Row 2 */}
            <CarRentRecommendationCar cars={recommendedCarList.data} carCardsNo={6} />
          </div>

          <div className="flex items-center justify-center mt-16 mb-16 mx-auto">
            <Link href="/car-rent">
              <button
                className="rounded space-x-2 px-5 bg-[#3563E9] text-base font-semibold text-white h-11 w-[156px] mb-16 hover:bg-blue-800"
              >
                Show more car
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarRent;
