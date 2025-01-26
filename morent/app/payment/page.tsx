"use client";
import Image from "next/image";
import React, { Suspense } from "react";
import Navbar from "../navbar/Navbar";
import NavbarMobile2 from "../navbar/NavbarMobile2";
import { useSearchParams } from "next/navigation";
import BookingForm from "../components/bookingForm";

const PaymentPage = () => {
  const searchParams = useSearchParams();

  // Extract query parameters from the URL
  const carName = searchParams.get("carName");
  const rentPerDay = searchParams.get("rentPerDay");
  const imageUrl = searchParams.get("imageUrl");
  const totalPrice = searchParams.get("totalPrice");

  return (
    <div className="bg-[#F6F7F9]">
      <Navbar />
      <NavbarMobile2 />
      <div
        className="lg:flex-row lg:space-x-6 lg:items-start lg:justify-center lg:px-2 flex flex-col justify-center
        mx-auto md:px-8"
      >
        {/*For Responsive Design*/}
        <div
          className="bg-white p-6 mt-8 rounded-lg
        lg:hidden block flex-shrink-0 lg:flex-shrink
             w-80 md:w-full lg:w-auto mx-auto"
        >
          <div className="flex flex-col text-left space-y-1">
            <p className="text-xl font-bold text-[#1A202C]">Rental Summary</p>
            <p className="text-sm text-[#90A3BF] font-medium">
              Prices may change depending on the length of the rental and the{" "}
              <br /> price of your rental car.
            </p>
          </div>

          <div className="flex">
            <div className="flex items-center justify-center lg:flex-row mt-6 relative">
              <Image
                src="/images/View.png"
                height={108}
                width={120}
                alt="car"
                className="rounded-lg"
              />

              <Image
                src={imageUrl || "/images/image 8.png"}
                height={36}
                width={110}
                alt="car"
                className="z-10 rounded-none mx-auto absolute"
              />
            </div>

            <div className="flex flex-col items-start space-y-2 mt-[50px] ml-4">
              <h2 className="text-lg font-bold text-[#1A202C]">{carName}</h2>
              <div className="flex flex-col items-center justify-center">
                <Image
                  src="/images/Four Star.png"
                  height={20}
                  width={90}
                  alt="ratings"
                  className="-ml-1"
                />
                <p className="text-xs text-[#90A3BF] font-medium mt-1">
                  440+ Reviewer
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 mb-8 h-[1px] bg-[#C3D4E9] opacity-40">
            {" "}
          </div>

          <div className="flex items-stretch justify-between lg:space-x-[212px] space-x-[140px]">
            <p className="text-base text-[#90A3BF] font-medium text-left">
              Subtotal
            </p>
            <p className="text-[#1A202C] text-base font-semibold text-right">
              {rentPerDay}
            </p>
          </div>

          <div className="flex items-stretch justify-between space-x-[212px] mt-6">
            <p className="text-base text-[#90A3BF] font-medium text-left">
              Tax
            </p>
            <p className="text-[#1A202C] text-base font-semibold text-right">
              $0
            </p>
          </div>

          <div
            className="rounded-lg w-[280px] lg:w-[444px] h-14 bg-[#F6F7F9] my-8 md:w-full
     flex items-center justify-between relative"
          >
            <input
              type="text"
              className="absolute bg-transparent w-[250px] h-14
       placeholder:text-sm placeholder:text-[#90A3BF] placeholder:font-medium 
       ml-5 border-0 border-transparent focus-visible:outline-none focus-visible:ring-0"
              placeholder="Apply promo code"
            />

            <button className="text-base font-semibold text-[#1A202C] absolute right-6">
              Apply Now
            </button>
          </div>

          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-1">
              <p className="text-lg font-bold text-[#1A202C]">
                Total Rental Price
              </p>
              <p className="text-xs text-[#90A3BF] font-medium">
                Overall price and includes rental discount
              </p>
            </div>
            <p className="lg:text-[32px] text-2xl font-bold text-[#1A202C]">
              {totalPrice}
            </p>
          </div>
        </div>

        {/*Left Form*/}
        <BookingForm />

        {/*Right Card*/}
        <div className="bg-white p-6 mt-8 rounded-lg lg:block hidden mx-auto">
          <div className="flex flex-col text-left space-y-1">
            <p className="text-xl font-bold text-[#1A202C]">Rental Summary</p>
            <p className="text-sm text-[#90A3BF] font-medium">
              Prices may change depending on the length of the rental and the{" "}
              <br /> price of your rental car.
            </p>
          </div>

          <div className="flex">
            <div className="flex items-center justify-center lg:flex-row mt-8 relative">
              <Image
                src="/images/View.png"
                height={108}
                width={132}
                alt="car"
                className="rounded-lg"
              />

              <Image
                src={imageUrl || "/images/image 8.png"}
                height={36}
                width={116}
                alt="car"
                className="z-10 rounded-none mx-auto absolute"
              />
            </div>

            <div className="flex flex-col items-start space-y-2 mt-12 ml-4">
              <h2 className="text-xl font-bold text-[#1A202C]">{carName}</h2>
              <div className="flex space-x-2 items-center justify-center">
                <Image
                  src="/images/Four Star.png"
                  height={20}
                  width={108}
                  alt="ratings"
                />
                <p className="text-sm text-[#90A3BF] font-medium">
                  440+ Reviewer
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 mb-8 h-[1px] bg-[#C3D4E9] opacity-40">
            {" "}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-base text-[#90A3BF] font-medium text-left">
              Subtotal
            </p>
            <p className="text-[#1A202C] text-base font-semibold text-right">
              {rentPerDay}
            </p>
          </div>

          <div className="flex items-center justify-between mt-6">
            <p className="text-base text-[#90A3BF] font-medium text-left">
              Tax
            </p>
            <p className="text-[#1A202C] text-base font-semibold text-right">
              $0
            </p>
          </div>

          <div
            className="rounded-lg w-full h-14 bg-[#F6F7F9] my-8
     flex items-center justify-between relative"
          >
            <input
              type="text"
              className="absolute bg-transparent w-full h-14
       placeholder:text-sm placeholder:text-[#90A3BF] placeholder:font-medium 
       ml-5 border-0 border-transparent focus-visible:outline-none focus-visible:ring-0"
              placeholder="Apply promo code"
            />

            <button className="text-base font-semibold text-[#1A202C] right-3 absolute">
              Apply Now
            </button>
          </div>

          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-1">
              <p className="text-xl font-bold text-[#1A202C]">
                Total Rental Price
              </p>
              <p className="text-sm text-[#90A3BF] font-medium">
                Overall price and includes rental discount
              </p>
            </div>
            <p className="text-[32px] font-bold text-[#1A202C]">{totalPrice}</p>
          </div>
        </div>
        {/*----------------------------------------------*/}
      </div>
    </div>
  );
};

const Payment = () => (
  <Suspense
    fallback={
      <div className="text-[#90A3BF] flex justify-center mt-5 bg-[#F6F7F9]">
        Loading...
      </div>
    }
  >
    <PaymentPage />
  </Suspense>
);

export default Payment;