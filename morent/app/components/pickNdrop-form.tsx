"use client";
import Image from "next/image";
import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import axios from "axios"; 

interface Location {
  place_id: string;
  display_name: string;
}

const API_KEY = process.env.LOCATIONIQ_API_KEY;

export default function HomePagePickAndDropForm() {
  const [pickupLocation, setPickupLocation] = useState<string>("");
  const [dropoffLocation, setDropoffLocation] = useState<string>("");
  const [pickupSuggestions, setPickupSuggestions] = useState<Location[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<Location[]>([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);

  const pickupRef = useRef<HTMLInputElement | null>(null);
  const dropoffRef = useRef<HTMLInputElement | null>(null);
  const pickupSuggestionsRef = useRef<HTMLUListElement | null>(null);
  const dropoffSuggestionsRef = useRef<HTMLUListElement | null>(null);

  const handleLocationSearch = async (
    query: string,
    setSuggestions: React.Dispatch<React.SetStateAction<Location[]>>,
    setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (query.length < 3) return;
    try {
      const response = await axios.get(
        `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${query}&format=json`
      );
      setSuggestions(response.data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const handleLocationInput = (
    event: ChangeEvent<HTMLInputElement>,
    setLocation: React.Dispatch<React.SetStateAction<string>>,
    setSuggestions: React.Dispatch<React.SetStateAction<Location[]>>,
    setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const { value } = event.target;
    setLocation(value);
    handleLocationSearch(value, setSuggestions, setShowSuggestions);
  };

  const handleSelectLocation = (
    location: Location,
    setLocation: React.Dispatch<React.SetStateAction<string>>,
    setSuggestions: React.Dispatch<React.SetStateAction<Location[]>>,
    setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLocation(location.display_name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      (pickupRef.current &&
        !pickupRef.current.contains(event.target as Node) &&
        pickupSuggestionsRef.current &&
        !pickupSuggestionsRef.current.contains(event.target as Node)) ||
      (dropoffRef.current &&
        !dropoffRef.current.contains(event.target as Node) &&
        dropoffSuggestionsRef.current &&
        !dropoffSuggestionsRef.current.contains(event.target as Node))
    ) {
      setShowPickupSuggestions(false);
      setShowDropoffSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
                ref={pickupRef}
                type="text"
                value={pickupLocation}
                onChange={(e) =>
                  handleLocationInput(
                    e,
                    setPickupLocation,
                    setPickupSuggestions,
                    setShowPickupSuggestions
                  )
                }
                placeholder="Select your city"
                className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium 
                text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md 
                focus:outline-none focus:border-none placeholder:text-[#90A3BF] 
                placeholder:font-medium"
              />
              {showPickupSuggestions && pickupSuggestions.length > 0 && (
                <ul
                  ref={pickupSuggestionsRef}
                  className="absolute bg-white shadow-md border mt-1 max-h-60 overflow-y-auto w-full z-20 lg:top-16 lg:left-0 top-32 left-1"
                >
                  {pickupSuggestions.map((suggestion) => (
                    <li
                      key={suggestion.place_id}
                      onClick={() =>
                        handleSelectLocation(
                          suggestion,
                          setPickupLocation,
                          setPickupSuggestions,
                          setShowPickupSuggestions
                        )
                      }
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {suggestion.display_name}
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
              <select className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md">
                <option>Select your date</option>
              </select>
            </div>
            <div className="mx-5 w-[1px] bg-[#C3D4E9] opacity-40"></div>
            <div className="space-y-2 flex-col flex">
              <label className="text-base font-bold text-[#1A202C] lg:ml-0 ml-1">
                Time
              </label>
              <select className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md">
                <option>Select your time</option>
              </select>
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
                ref={dropoffRef}
                type="text"
                value={dropoffLocation}
                onChange={(e) =>
                  handleLocationInput(
                    e,
                    setDropoffLocation,
                    setDropoffSuggestions,
                    setShowDropoffSuggestions
                  )
                }
                placeholder="Select your city"
                className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md focus:outline-none focus:border-none placeholder:text-[#90A3BF] placeholder:font-medium"
              />
              {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
                <ul
                  ref={dropoffSuggestionsRef}
                  className="absolute bg-white shadow-md border mt-1 max-h-60 overflow-y-auto w-full z-20 lg:top-16 lg:left-0 top-32 left-1"
                >
                  {dropoffSuggestions.map((suggestion) => (
                    <li
                      key={suggestion.place_id}
                      onClick={() =>
                        handleSelectLocation(
                          suggestion,
                          setDropoffLocation,
                          setDropoffSuggestions,
                          setShowDropoffSuggestions
                        )
                      }
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {suggestion.display_name}
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
              <select className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md">
                <option>Select your date</option>
              </select>
            </div>
            <div className="mx-6 w-[1px] bg-[#C3D4E9] opacity-40"></div>
            <div className="space-y-2 flex-col flex">
              <label className="text-base font-bold text-[#1A202C] lg:ml-0 ml-1">
                Time
              </label>
              <select className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md">
                <option>Select your time</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PickAndDropForm() {
  const [pickupLocation, setPickupLocation] = useState<string>("");
  const [dropoffLocation, setDropoffLocation] = useState<string>("");
  const [pickupSuggestions, setPickupSuggestions] = useState<Location[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<Location[]>([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);

  const pickupRef = useRef<HTMLInputElement | null>(null);
  const dropoffRef = useRef<HTMLInputElement | null>(null);
  const pickupSuggestionsRef = useRef<HTMLUListElement | null>(null);
  const dropoffSuggestionsRef = useRef<HTMLUListElement | null>(null);

  const handleLocationSearch = async (
    query: string,
    setSuggestions: React.Dispatch<React.SetStateAction<Location[]>>,
    setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (query.length < 3) return;
    try {
      const response = await axios.get(
        `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${query}&format=json`
      );
      setSuggestions(response.data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const handleLocationInput = (
    event: ChangeEvent<HTMLInputElement>,
    setLocation: React.Dispatch<React.SetStateAction<string>>,
    setSuggestions: React.Dispatch<React.SetStateAction<Location[]>>,
    setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const { value } = event.target;
    setLocation(value);
    handleLocationSearch(value, setSuggestions, setShowSuggestions);
  };

  const handleSelectLocation = (
    location: Location,
    setLocation: React.Dispatch<React.SetStateAction<string>>,
    setSuggestions: React.Dispatch<React.SetStateAction<Location[]>>,
    setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLocation(location.display_name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      (pickupRef.current &&
        !pickupRef.current.contains(event.target as Node) &&
        pickupSuggestionsRef.current &&
        !pickupSuggestionsRef.current.contains(event.target as Node)) ||
      (dropoffRef.current &&
        !dropoffRef.current.contains(event.target as Node) &&
        dropoffSuggestionsRef.current &&
        !dropoffSuggestionsRef.current.contains(event.target as Node))
    ) {
      setShowPickupSuggestions(false);
      setShowDropoffSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
                ref={pickupRef}
                type="text"
                value={pickupLocation}
                onChange={(e) =>
                  handleLocationInput(
                    e,
                    setPickupLocation,
                    setPickupSuggestions,
                    setShowPickupSuggestions
                  )
                }
                placeholder="Select your city"
                className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium
           text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md focus:outline-none focus:border-none placeholder:text-[#90A3BF] 
                placeholder:font-medium"
              />
              {showPickupSuggestions && pickupSuggestions.length > 0 && (
                <ul
                  ref={pickupSuggestionsRef}
                  className="absolute bg-white shadow-md border mt-1 max-h-60 overflow-y-auto w-full z-20 lg:top-16 lg:left-0 top-32 left-1"
                >
                  {pickupSuggestions.map((suggestion) => (
                    <li
                      key={suggestion.place_id}
                      onClick={() =>
                        handleSelectLocation(
                          suggestion,
                          setPickupLocation,
                          setPickupSuggestions,
                          setShowPickupSuggestions
                        )
                      }
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {suggestion.display_name}
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
              <input
                className="w-full lg:w-[110%] border-0 text-[#90A3BF] font-medium 
          text-xs bg-transparent lg:p-0 p-2 lg:rounded-none rounded-md
          focus:outline-none focus:border-none placeholder:text-[#90A3BF]
           placeholder:font-medium"
                ref={dropoffRef}
                type="text"
                value={dropoffLocation}
                onChange={(e) =>
                  handleLocationInput(
                    e,
                    setDropoffLocation,
                    setDropoffSuggestions,
                    setShowDropoffSuggestions
                  )
                }
                placeholder="Select your city"
              />
              {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
                <ul
                  ref={dropoffSuggestionsRef}
                  className="absolute bg-white shadow-md border mt-1 max-h-60 overflow-y-auto w-full z-20 lg:top-16 lg:left-0 top-32 left-1"
                >
                  {dropoffSuggestions.map((suggestion) => (
                    <li
                      key={suggestion.place_id}
                      onClick={() =>
                        handleSelectLocation(
                          suggestion,
                          setDropoffLocation,
                          setDropoffSuggestions,
                          setShowDropoffSuggestions
                        )
                      }
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {suggestion.display_name}
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