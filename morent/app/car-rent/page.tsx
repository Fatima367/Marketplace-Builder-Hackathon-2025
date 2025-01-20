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
import { popularCarList } from "../components/popular-car";
import { recommendedCarList } from "../components/recommendation-car";

const CarRent = () => {
  const popularCarData = popularCarList;
  const recommendedCarData = recommendedCarList;

  return (
    <div className="bg-[#F6F7F9]">
      <Navbar />
      <Navbar2 />
      <div className="flex relative items-start">
        {/*Left*/}
        <SideBar className="h-[114rem]" />

        {/*Right*/}
        <div className="flex flex-col items-start justify-center mx-auto lg:px-6 lg:w-[83%]">
          <PickAndDropForm />

          <ToastContainer hideProgressBar />
          <div className="flex flex-col lg:space-y-8 space-y-4 mx-auto">
            {/*Row 1*/}
            <CarRentPopularCarSection cars={popularCarData} carCardsNo={3} />

            {/*Row 2*/}
            <CarRentRecommendationCar
              cars={recommendedCarData}
              carCardsNo={6}
            />
          </div>

          <div className="flex items-center justify-center mt-16 mb-16 mx-auto">
            <Link href="/car-rent">
              <button
                className="rounded space-x-2 px-5 bg-[#3563E9] text-base font-semibold text-white
           h-11 w-[156px] mb-16 hover:bg-blue-800"
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