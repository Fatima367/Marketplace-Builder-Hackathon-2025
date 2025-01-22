"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Navbar2 from "../navbar/Navbar2";
import SideBar from "../components/sideBar";
import { ToastContainer } from "react-toastify";
import {
  CarRentPopularCarSection,
  CarRentRecommendationCar,
} from "../components/car-rent-carGrids";
import { PickAndDropForm } from "../components/pickNdrop-form";
import { FaCar } from "react-icons/fa";

const CarRent = () => {
  const [popularCarData, setPopularCarData] = useState<any[]>([]);
  const [recommendationCarData, setRecommendationCarData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("/api/cars");
        const data = await response.json();

        if (response.ok) {
          setPopularCarData(data.popularCars?.data || []);
          setRecommendationCarData(data.recommendedCars?.data || []);
        } else {
          throw new Error(data.message || "Failed to fetch cars.");
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong"
        );
      }
    };

    fetchCars();
  }, []);

  if (error) {
    return <div className="text-[#90A3BF] bg-[#F6F7F9]">Error: {error}</div>;
  }

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
            {popularCarData.length && recommendationCarData.length > 0 ? (
              <>
                <CarRentPopularCarSection
                  cars={popularCarData}
                  carCardsNo={3}
                />
                <CarRentRecommendationCar
                  cars={recommendationCarData}
                  carCardsNo={6}
                />
              </>
            ) : (
              <div className="text-[#90A3BF] flex gap-2 items-center">
                <FaCar className="h-4 w-4" /> No cars available{" "}
              </div>
            )}
            {/* Row 2 */}
          </div>

          <div className="flex items-center justify-center mt-16 mb-16 mx-auto">
            <Link href="/car-rent">
              <button className="rounded space-x-2 px-5 bg-[#3563E9] text-base font-semibold text-white h-11 w-[156px] mb-16 hover:bg-blue-800">
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