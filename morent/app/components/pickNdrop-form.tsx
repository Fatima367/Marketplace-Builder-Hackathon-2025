"use client"
import Image from "next/image";
import React,{ useState } from "react";
import PlacesAutocomplete from "react-google-places-autocomplete"

export default function HomePagePickAndDropForm() {
   return (
    <div
    className="flex flex-col lg:flex-row lg:items-center lg:gap-x-4 lg:-space-y-0
  lg:space-x-6 mb-9 items-center justify-center mx-auto relative lg:max-w-[100%] 
  -space-y-2 md:flex-row lg:mt-16 md:mt-20 mt-6"
  >
    {/* Pick-Up */}
    <div
      className="lg:flex-1 items-start justify-between bg-white shadow-md 
     lg:p-8 p-6 rounded-lg flex flex-col relative lg:h-40 lg:w-[36rem] w-[20rem]"
    >
      <div className="flex-1 items-start justify-between">
        <div className="flex space-x-3 items-center justify-start lg:absolute lg:top-6 lg:left-8">
          <div className="rounded-full h-2 w-2 bg-[#3563E9] ring-4 ring-[#3563E9] ring-opacity-30"></div>
          <h3 className="text-lg font-semibold text-[#1A202C]">
            Pick-Up
          </h3>
        </div>

        <div
          className="lg:space-x-4 space-x-2 flex mt-4 mx-auto
        lg:absolute lg:top-14 lg:left-8"
        >
          <div className="space-y-2 flex flex-col">
            <label className="text-base font-bold text-[#1A202C]">
              Locations
            </label>
            <select
              className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium
             text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md"
            >
              <option>Select your city</option>
            </select>
          </div>
          <div className="mx-5 w-[1px] bg-[#C3D4E9] opacity-40"> </div>
          <div className="space-y-2 flex-col flex">
            <label className="text-base font-bold text-[#1A202C] lg:ml-0 ml-1">
              Date
            </label>
            <select
              className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium
             text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md"
            >
              <option>Select your date</option>
            </select>
          </div>
          <div className="mx-5 w-[1px] bg-[#C3D4E9] opacity-40"> </div>
          <div className="space-y-2 flex-col flex">
            <label className="text-base font-bold text-[#1A202C] lg:ml-0 ml-1">
              Time
            </label>
            <select
              className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium
             text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md"
            >
              <option>Select your time</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    {/* Swap Button */}
    <div className=" flex items-center justify-center">
      <button
        className="bg-[#3563E9] p-4 shadow-lg hover:bg-blue-400
      items-center justify-center rounded-lg h-14 w-14 relative z-10"
      >
        <Image
          src="/images/Swap.png"
          height={24}
          width={24}
          alt="Swap"
          className="z-10 text-white absolute top-4"
        />
      </button>
    </div>

    {/* Drop-Off */}
    <div
      className="lg:flex-1 items-start justify-between bg-white shadow-md
     lg:p-8 p-6 rounded-lg flex flex-col relative lg:h-40 lg:w-[36rem] w-[20rem]"
    >
      <div className="flex-1 items-start justify-between">
        <div className="flex space-x-3 items-center justify-start lg:absolute lg:top-6 lg:left-8">
          <div className="rounded-full h-2 w-2 bg-[#3563E9] ring-4 ring-[#5CAFFC] ring-opacity-30"></div>
          <h3 className="text-lg font-semibold text-[#1A202C]">
            Drop-Off
          </h3>
        </div>

        <div
          className="lg:space-x-4 space-x-2 flex mt-4 mx-auto
        lg:absolute lg:top-14 lg:left-8"
        >
          <div className="space-y-2 flex flex-col">
            <label className="text-base font-bold text-[#1A202C]">
              Locations
            </label>
            <select
              className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium 
            text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md"
            >
              <option>Select your city</option>
            </select>
          </div>
          <div className="mx-6 w-[1px] bg-[#C3D4E9] opacity-40"> </div>
          <div className="space-y-2 flex-col flex">
            <label className="text-base font-bold text-[#1A202C] lg:ml-0 ml-1">
              Date
            </label>
            <select
              className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium 
              text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md"
            >
              <option>Select your date</option>
            </select>
          </div>
          <div className="mx-6 w-[1px] bg-[#C3D4E9] opacity-40"> </div>
          <div className="space-y-2 flex-col flex">
            <label className="text-base font-bold text-[#1A202C] lg:ml-0 ml-1">
              Time
            </label>
            <select
              className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium 
              text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md"
            >
              <option>Select your time</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
  
)
}

export function PickAndDropForm() {
  return (
    <div
      className="flex flex-col lg:flex-row lg:items-center lg:gap-x-4 lg:-space-y-0 lg:-space-x-6
 mb-9 items-center justify-center mt-5 mx-auto relative lg:max-w-[100%] -space-y-2 md:flex-row"
    >
      {/* Pick-Up */}
      <div
        className="lg:flex-1 items-start justify-between bg-white shadow-md 
       p-6 rounded-lg flex flex-col relative lg:h-36 lg:w-[28.5rem] w-[20rem]"
      >
        <div className="flex-1 items-start justify-between">
          <div className="flex space-x-3 items-center justify-start">
            <div className="rounded-full h-2 w-2 bg-[#3563E9] ring-4 ring-[#3563E9] ring-opacity-30"></div>
            <h3 className="text-lg font-semibold text-[#1A202C]">Pick-Up</h3>
          </div>

          <div className="lg:space-x-4 space-x-2 flex mt-4 mx-auto">
            <div className="space-y-2 flex flex-col">
              <label className="text-base font-bold text-[#1A202C]">
                Locations
              </label>
              <select
                className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium
           text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md"
              >
                <option>Select your city</option>
              </select>
            </div>
            <div className="mx-5 w-[1px] bg-[#C3D4E9] opacity-40"> </div>
            <div className="space-y-2 flex-col flex">
              <label className="text-base font-bold text-[#1A202C] lg:ml-0 ml-1">
                Date
              </label>
              <select
                className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium
           text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md"
              >
                <option>Select your date</option>
              </select>
            </div>
            <div className="mx-5 w-[1px] bg-[#C3D4E9] opacity-40"> </div>
            <div className="space-y-2 flex-col flex">
              <label className="text-base font-bold text-[#1A202C] lg:ml-0 ml-1">
                Time
              </label>
              <select
                className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium
           text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md"
              >
                <option>Select your time</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Swap Button */}
      <div className=" flex items-center justify-center">
        <button
          className="bg-[#3563E9] p-4 shadow-lg hover:bg-blue-400
    items-center justify-center rounded-lg h-14 w-14 relative z-10"
        >
          <Image
            src="/images/Swap.png"
            height={24}
            width={24}
            alt="Swap"
            className="z-10 text-white absolute top-4"
          />
        </button>
      </div>

      {/* Drop-Off */}
      <div
        className="lg:flex-1 items-start justify-between bg-white shadow-md
      p-6 rounded-lg flex flex-col relative lg:h-36 lg:w-[28.5rem] w-[20rem]"
      >
        <div className="flex-1 items-start justify-between">
          <div className="flex space-x-3 items-center justify-start">
            <div className="rounded-full h-2 w-2 bg-[#3563E9] ring-4 ring-[#5CAFFC] ring-opacity-30"></div>
            <h3 className="text-lg font-semibold text-[#1A202C]">Drop-Off</h3>
          </div>

          <div className="lg:space-x-4 space-x-2 flex mt-4 mx-auto">
            <div className="space-y-2 flex flex-col">
              <label className="text-base font-bold text-[#1A202C]">
                Locations
              </label>
              <select
                className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium 
          text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md"
              >
                <option>Select your city</option>
              </select>
            </div>
            <div className="mx-6 w-[1px] bg-[#C3D4E9] opacity-40"> </div>
            <div className="space-y-2 flex-col flex">
              <label className="text-base font-bold text-[#1A202C] lg:ml-0 ml-1">
                Date
              </label>
              <select
                className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium 
            text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md"
              >
                <option>Select your date</option>
              </select>
            </div>
            <div className="mx-6 w-[1px] bg-[#C3D4E9] opacity-40"> </div>
            <div className="space-y-2 flex-col flex">
              <label className="text-base font-bold text-[#1A202C] lg:ml-0 ml-1">
                Time
              </label>
              <select
                className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium 
            text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md"
              >
                <option>Select your time</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
