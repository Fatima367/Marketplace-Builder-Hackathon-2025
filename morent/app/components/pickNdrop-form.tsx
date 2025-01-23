"use client";
import Image from "next/image";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Function to fetch location data from PositionStack API
const fetchPlaces = async (query: string) => {
  const apiKey = process.env.NEXT_PUBLIC_POSITIONSTACK_API_KEY; // Replace with your PositionStack API Key
  const response = await fetch(
    `http://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.data || []; // Return the `data` array from the API response
};

export default function HomePagePickAndDropForm() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState<any[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<any[]>([]);
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState<string>("");
  const [dropoffDate, setDropoffDate] = useState<Date | null>(null);
  const [dropoffTime, setDropoffTime] = useState<string>("");

  const handleLocationChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setLocation: React.Dispatch<React.SetStateAction<string>>,
    setSuggestions: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    const location = e.target.value;
    setLocation(location);
    if (location.length > 2) {
      const places = await fetchPlaces(location);
      setSuggestions(places); // Update suggestions
    } else {
      setSuggestions([]); // Clear suggestions if input is too short
    }
  };

  const handleSuggestionClick = (
    suggestion: any,
    setLocation: React.Dispatch<React.SetStateAction<string>>,
    setSuggestions: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    setLocation(suggestion.label); // Set the selected location
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:gap-x-4 lg:-space-y-0 lg:space-x-6 mb-9 items-center justify-center mx-auto relative lg:max-w-[100%] -space-y-2 md:flex-row lg:mt-16 md:mt-20 mt-6">
      {/* Pick-Up */}
      <div className="lg:flex-1 items-start justify-between bg-white shadow-md lg:p-8 p-6 rounded-lg flex flex-col relative lg:h-40 lg:w-[36rem] w-[20rem]">
        <div className="flex-1 items-start justify-between">
          <div className="flex space-x-3 items-center justify-start lg:absolute lg:top-6 lg:left-8">
            <div className="rounded-full h-2 w-2 bg-[#3563E9] ring-4 ring-[#3563E9] ring-opacity-30"></div>
            <h3 className="text-lg font-semibold text-[#1A202C]">Pick-Up</h3>
          </div>

          <div className="lg:space-x-4 space-x-2 flex mt-4 mx-auto lg:absolute lg:top-14 lg:left-8">
            <div className="space-y-2 flex flex-col">
              <label className="text-base font-bold text-[#1A202C]">
                Locations
              </label>
              <input
                type="text"
                placeholder="Select your city"
                value={pickupLocation}
                onChange={(e) =>
                  handleLocationChange(
                    e,
                    setPickupLocation,
                    setPickupSuggestions
                  )
                }
                className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md focus:outline-none focus:border-none placeholder:text-[#90A3BF] placeholder:font-medium"
              />
              {/* Suggestions dropdown */}
              {pickupSuggestions.length > 0 && (
                <ul
                  className="absolute lg:top-16 lg:-left-5 bg-[#F6F7F9] shadow-md 
                rounded-2xl w-full max-h-40 overflow-y-auto z-30 md:top-36 md:left-0
                top-32 left-0"
                >
                  {pickupSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() =>
                        handleSuggestionClick(
                          suggestion,
                          setPickupLocation,
                          setPickupSuggestions
                        )
                      }
                    >
                      {suggestion.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mx-5 w-[1px] bg-[#C3D4E9] opacity-40"></div>
            <div className="space-y-2 flex-col flex">
              <label className="text-base font-bold text-[#1A202C] lg:ml-0 ml-1">
                Date
              </label>
              <ReactDatePicker
                selected={pickupDate}
                onChange={(date) => setPickupDate(date)}
                dateFormat="MM/dd/yyyy"
                className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md"
                placeholderText="Select your date"
              />
            </div>
            <div className="mx-5 w-[1px] bg-[#C3D4E9] opacity-40"></div>
            <div className="space-y-2 flex-col flex">
              <label className="text-base font-bold text-[#1A202C] lg:ml-0 ml-1">
                Time
              </label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex items-center justify-center">
        <button className="bg-[#3563E9] p-4 shadow-lg hover:bg-blue-400 items-center justify-center rounded-lg h-14 w-14 relative z-10">
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
      <div className="lg:flex-1 items-start justify-between bg-white shadow-md lg:p-8 p-6 rounded-lg flex flex-col relative lg:h-40 lg:w-[36rem] w-[20rem]">
        <div className="flex-1 items-start justify-between">
          <div className="flex space-x-3 items-center justify-start lg:absolute lg:top-6 lg:left-8">
            <div className="rounded-full h-2 w-2 bg-[#3563E9] ring-4 ring-[#5CAFFC] ring-opacity-30"></div>
            <h3 className="text-lg font-semibold text-[#1A202C]">Drop-Off</h3>
          </div>

          <div className="lg:space-x-4 space-x-2 flex mt-4 mx-auto lg:absolute lg:top-14 lg:left-8">
            <div className="space-y-2 flex flex-col">
              <label className="text-base font-bold text-[#1A202C]">
                Locations
              </label>
              <input
                type="text"
                placeholder="Select your city"
                value={dropoffLocation}
                onChange={(e) =>
                  handleLocationChange(
                    e,
                    setDropoffLocation,
                    setDropoffSuggestions
                  )
                }
                className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md focus:outline-none focus:border-none placeholder:text-[#90A3BF] placeholder:font-medium"
              />
              {/* Suggestions dropdown */}
              {dropoffSuggestions.length > 0 && (
                <ul
                  className="absolute lg:top-16 lg:-left-5 bg-[#F6F7F9] shadow-md 
                rounded-2xl w-full max-h-40 overflow-y-auto z-30 md:top-36 md:left-0
                top-32 left-0"
                >
                  {dropoffSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() =>
                        handleSuggestionClick(
                          suggestion,
                          setDropoffLocation,
                          setDropoffSuggestions
                        )
                      }
                    >
                      {suggestion.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mx-6 w-[1px] bg-[#C3D4E9] opacity-40"></div>
            <div className="space-y-2 flex-col flex">
              <label className="text-base font-bold text-[#1A202C] lg:ml-0 ml-1">
                Date
              </label>
              <ReactDatePicker
                selected={dropoffDate}
                onChange={(date) => setDropoffDate(date)}
                dateFormat="MM/dd/yyyy"
                className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md"
                placeholderText="Select your date"
              />
            </div>
            <div className="mx-6 w-[1px] bg-[#C3D4E9] opacity-40"></div>
            <div className="space-y-2 flex-col flex">
              <label className="text-base font-bold text-[#1A202C] lg:ml-0 ml-1">
                Time
              </label>
              <input
                type="time"
                value={dropoffTime}
                onChange={(e) => setDropoffTime(e.target.value)}
                className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PickAndDropForm() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState<any[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<any[]>([]);
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState<string>("");
  const [dropoffDate, setDropoffDate] = useState<Date | null>(null);
  const [dropoffTime, setDropoffTime] = useState<string>("");

  const handleLocationChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setLocation: React.Dispatch<React.SetStateAction<string>>,
    setSuggestions: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    const location = e.target.value;
    setLocation(location);
    if (location.length > 2) {
      const places = await fetchPlaces(location);
      setSuggestions(places); // Update suggestions
    } else {
      setSuggestions([]); // Clear suggestions if input is too short
    }
  };

  const handleSuggestionClick = (
    suggestion: any,
    setLocation: React.Dispatch<React.SetStateAction<string>>,
    setSuggestions: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    setLocation(suggestion.label); // Set the selected location
    setSuggestions([]); // Clear suggestions after selection
  };

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
              <input
                type="text"
                placeholder="Select your city"
                value={pickupLocation}
                onChange={(e) =>
                  handleLocationChange(
                    e,
                    setPickupLocation,
                    setPickupSuggestions
                  )
                }
                className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium
           text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md focus:outline-none focus:border-none placeholder:text-[#90A3BF]
                placeholder:font-medium"
              />
              {/* Suggestions dropdown */}
              {pickupSuggestions.length > 0 && (
                <ul
                  className="absolute lg:top-16 lg:-left-5 bg-[#F6F7F9] shadow-md 
                rounded-2xl w-full max-h-40 overflow-y-auto z-30 md:top-36 md:left-0
                top-32 left-0"
                >
                  {pickupSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() =>
                        handleSuggestionClick(
                          suggestion,
                          setPickupLocation,
                          setPickupSuggestions
                        )
                      }
                    >
                      {suggestion.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mx-5 w-[1px] bg-[#C3D4E9] opacity-40"> </div>
            <div className="space-y-2 flex-col flex">
              <label className="text-base font-bold text-[#1A202C] lg:ml-0 ml-1">
                Date
              </label>
              <ReactDatePicker
                selected={pickupDate}
                onChange={(date) => setPickupDate(date)}
                dateFormat="MM/dd/yyyy"
                placeholderText="Select your date"
                className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium
           text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md"
              />
            </div>
            <div className="mx-5 w-[1px] bg-[#C3D4E9] opacity-40"> </div>
            <div className="space-y-2 flex-col flex">
              <label className="text-base font-bold text-[#1A202C] lg:ml-0 ml-1">
                Time
              </label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium
           text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md"
              />
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
              <input
                className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium
          text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md
          focus:outline-none focus:border-none placeholder:text-[#90A3BF]
           placeholder:font-medium"
                value={dropoffLocation}
                onChange={(e) =>
                  handleLocationChange(
                    e,
                    setDropoffLocation,
                    setDropoffSuggestions
                  )
                }
                type="text"
                placeholder="Select your city"
              />
              {/* Suggestions dropdown */}
              {dropoffSuggestions.length > 0 && (
                <ul
                  className="absolute lg:top-16 lg:-left-5 bg-[#F6F7F9] shadow-md 
                rounded-2xl w-full max-h-40 overflow-y-auto z-30 md:top-36 md:left-0
                top-32 left-0"
                >
                  {dropoffSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() =>
                        handleSuggestionClick(
                          suggestion,
                          setDropoffLocation,
                          setDropoffSuggestions
                        )
                      }
                    >
                      {suggestion.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mx-6 w-[1px] bg-[#C3D4E9] opacity-40"> </div>
            <div className="space-y-2 flex-col flex">
              <label className="text-base font-bold text-[#1A202C] lg:ml-0 ml-1">
                Date
              </label>
              <ReactDatePicker
                selected={dropoffDate}
                onChange={(date) => setDropoffDate(date)}
                dateFormat="MM/dd/yyyy"
                placeholderText="Select your date"
                className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium
            text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md"
              />
            </div>
            <div className="mx-6 w-[1px] bg-[#C3D4E9] opacity-40"> </div>
            <div className="space-y-2 flex-col flex">
              <label className="text-base font-bold text-[#1A202C] lg:ml-0 ml-1">
                Time
              </label>
              <input
                type="time"
                value={dropoffTime}
                onChange={(e) => setDropoffTime(e.target.value)}
                className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium
            text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}