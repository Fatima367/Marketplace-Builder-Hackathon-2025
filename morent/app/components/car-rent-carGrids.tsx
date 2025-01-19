"use client";
import Image from "next/image";
import FavIcon from "./favIcon";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function CarRentPopularCarSection({ cars, carCardsNo }: any) {
  const searchParams = useSearchParams();

  // Retrieve selected categories and capacities from query parameters
  const selectedCategories = searchParams.getAll("category");
  const selectedCapacities = searchParams.getAll("capacity");

  // Filter cars based on selected categories and selected capacities
  const filteredPopularCars = cars.filter((car: any) => {
    const matchesCategory = selectedCategories.length
      ? selectedCategories.includes(car.category)
      : true; // If no categories are selected, include all cars
    const matchesCapacity = selectedCapacities.length
      ? selectedCapacities.includes(car.capacity)
      : true; // If no capacities are selected, include all cars

    return matchesCategory && matchesCapacity;
  });

  const carsToDisplay = filteredPopularCars.slice(0, carCardsNo);

  return (
    <div>
      {/*Car Cards*/}
      <div className="hidden sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:grid sm:grid max-md:justify-items-center">
        {carsToDisplay.map((car: any) => (
          <div
            className="bg-white rounded-lg flex flex-col p-6 relative flex-shrink-0 lg:flex-shrink w-[304px] md:w-full lg:w-auto shadow-sm"
            key={car._id}
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col text-left space-y-1">
                <p className="font-bold text-xl text-[#1A202C]">{car.name}</p>
                <p className="font-bold text-sm text-[#90A3BF]">
                  {car.category}
                </p>
              </div>

              <FavIcon car={car} />
            </div>

            <Image
              src={car.image.asset.url}
              width={300}
              height={100}
              alt="car-image"
              className="mt-16 w-64 h-auto object-cover mx-auto"
            />

            <div className="flex space-x-4 sm:flex-row mt-16 items-center justify-center -mx-2">
              <div className="flex space-x-1 items-center justify-center">
                <Image
                  height={24}
                  width={24}
                  src="/images/gas-station.png"
                  alt="Gas-Station"
                />
                <p className="text-[#90A3BF] text-sm font-medium">{car.fuel}</p>
              </div>
              <div className="flex space-x-1 items-center justify-center">
                <Image
                  height={24}
                  width={24}
                  src="/images/manual.png"
                  alt="Mode"
                />
                <p className="text-[#90A3BF] text-sm font-medium">{car.mode}</p>
              </div>
              <div className="flex space-x-1 items-center justify-center">
                <Image
                  height={24}
                  width={24}
                  src="/images/profile-2user.png"
                  alt="2users-profile"
                />
                <p className="text-[#90A3BF] text-sm font-medium">
                  {car.capacity}
                </p>
              </div>
            </div>

            <div className="flex items-start justify-between mt-6 gap-2">
              <div className="flex flex-col font-bold text-[#1A202C]">
                <div className="text-xl font-bold">
                  {car.rentPerDay}/{" "}
                  <span className="text-sm text-[#90A3BF]">day</span>
                </div>
                <div className="mt-1 text-sm text-[#90A3BF] line-through">
                  {car.originalPrice || null}
                </div>
              </div>

              <Link href="/car-rent">
                <button className="text-base font-medium text-center gap-2 h-11 w-28 text-white bg-[#3563E9] hover:bg-blue-800 rounded">
                  Rent Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CarRentRecommendationCar({ cars, carCardsNo }: any) {
  const searchParams = useSearchParams();

  // Retrieve selected categories and capacities from query parameters
  const selectedCategories = searchParams.getAll("category");
  const selectedCapacities = searchParams.getAll("capacity");

  // Filter cars based on selected categories and selected capacities
  const filteredCars = cars.filter((car: any) => {
    const matchesCategory = selectedCategories.length
      ? selectedCategories.includes(car.category)
      : true; // If no categories are selected, include all cars
    const matchesCapacity = selectedCapacities.length
      ? selectedCapacities.includes(car.capacity)
      : true; // If no capacities are selected, include all cars

    return matchesCategory && matchesCapacity;
  });

  const carsToDisplay = filteredCars.slice(0, carCardsNo);

  return (
    <div>
      {/*Car Cards*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-md:justify-items-center">
        {carsToDisplay.map((car: any) => (
          <div
            className="bg-white rounded-lg flex flex-col p-6 relative flex-shrink-0 lg:flex-shrink
          w-[304px] md:w-full lg:w-auto shadow-sm"
            key={car._id}
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <div className="font-bold text-xl text-[#1A202C]">
                  {car.name}
                </div>
                <p className="mt-1 font-semibold text-sm text-[#90A3BF]">
                  {car.category}
                </p>
              </div>
              <FavIcon car={car} />
            </div>
            <Image
              width={300}
              height={100}
              src={car.image.asset.url}
              alt="All New Rush"
              className="self-center mt-16 mx-auto w-64 h-auto object-cover"
            />
            <div className="flex space-x-4 sm:flex-row items-center justify-center -mx-2 mt-16 text-sm font-medium text-[#90A3BF]">
              <div className="flex space-x-1 items-center justify-center">
                <Image
                  height={24}
                  width={24}
                  src="/images/gas-station.png"
                  alt="Gas-Station"
                />
                <p>{car.fuel}</p>
              </div>
              <div className="flex space-x-1 items-center justify-center">
                <Image
                  height={24}
                  width={24}
                  src="/images/manual.png"
                  alt="Mode"
                />
                <p>{car.mode}</p>
              </div>
              <div className="flex space-x-1 items-center justify-center">
                <Image
                  height={24}
                  width={24}
                  src="/images/profile-2user.png"
                  alt="2users-profile"
                />
                <p>{car.capacity}</p>
              </div>
            </div>
            <div className="flex items-start justify-between mt-6 gap-2">
              <div className="flex flex-col font-bold text-[#1A202C]">
                <div className="text-xl">
                  {car.rentPerDay}/{" "}
                  <span className="text-sm text-[#90A3BF]">day</span>
                </div>
                <div className="mt-1 text-sm text-[#90A3BF] line-through">
                  {car.originalPrice || null}
                </div>
              </div>

              <Link href="/car-rent">
                <button
                  className="text-base font-medium text-center gap-2 h-11 w-28
                     text-white bg-[#3563E9] hover:bg-blue-800 rounded"
                >
                  Rent Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DetailCarRecentCars({ cars, carCardsNo }: any) {
  const searchParams = useSearchParams();

  // Retrieve selected categories and capacities from query parameters
  const selectedCategories = searchParams.getAll("category");
  const selectedCapacities = searchParams.getAll("capacity");

  // Filter cars based on selected categories and selected capacities
  const filteredPopularCars = cars.filter((car: any) => {
    const matchesCategory = selectedCategories.length
      ? selectedCategories.includes(car.category)
      : true; // If no categories are selected, include all cars
    const matchesCapacity = selectedCapacities.length
      ? selectedCapacities.includes(car.capacity)
      : true; // If no capacities are selected, include all cars

    return matchesCategory && matchesCapacity;
  });

  const carsToDisplay = filteredPopularCars.slice(0, carCardsNo);

  return (
    <div className="flex flex-col space-y-4 relative lg:w-[100%]">
      {filteredPopularCars.length > 0 && (
        <div className="flex items-start justify-between">
          <p className="text-base font-semibold text-[#90A3BF]">Recent Car</p>
          <p className="text-base font-semibold text-[#3563E9]">View All</p>
        </div>
      )}
      {/*Car Cards*/}
      <div
        className="relative flex sm:grid-cols-2 lg:grid-cols-3 md:grid md:grid-cols-2 gap-6
           overflow-x-auto lg:overflow-visible mb-8 lg:w-full w-80 md:w-[680px]
        max-md:justify-items-center"
      >
        {carsToDisplay.map((car: any) => (
          <div
            className="bg-white rounded-lg flex flex-col p-6 relative flex-shrink-0
               lg:flex-shrink w-[304px] md:w-full lg:w-auto shadow-sm"
            key={car._id}
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col text-left space-y-1">
                <p className="font-bold text-xl text-[#1A202C]">{car.name}</p>
                <p className="font-bold text-sm text-[#90A3BF]">
                  {car.category}
                </p>
              </div>

              <FavIcon car={car} />
            </div>

            <Image
              src={car.image.asset.url}
              width={300}
              height={100}
              alt="car-image"
              className="mt-16 w-64 h-auto object-cover mx-auto"
            />

            <div className="flex space-x-4 sm:flex-row mt-16 items-center justify-center -mx-2">
              <div className="flex space-x-1 items-center justify-center">
                <Image
                  height={24}
                  width={24}
                  src="/images/gas-station.png"
                  alt="Gas-Station"
                />
                <p className="text-[#90A3BF] text-sm font-medium">{car.fuel}</p>
              </div>
              <div className="flex space-x-1 items-center justify-center">
                <Image
                  height={24}
                  width={24}
                  src="/images/manual.png"
                  alt="Mode"
                />
                <p className="text-[#90A3BF] text-sm font-medium">{car.mode}</p>
              </div>
              <div className="flex space-x-1 items-center justify-center">
                <Image
                  height={24}
                  width={24}
                  src="/images/profile-2user.png"
                  alt="2users-profile"
                />
                <p className="text-[#90A3BF] text-sm font-medium">
                  {car.capacity}
                </p>
              </div>
            </div>

            <div className="flex items-start justify-between mt-6 gap-2">
              <div className="flex flex-col font-bold text-[#1A202C]">
                <div className="text-xl font-bold">
                  {car.rentPerDay}/{" "}
                  <span className="text-sm text-[#90A3BF]">day</span>
                </div>
                <div className="mt-1 text-sm text-[#90A3BF] line-through">
                  {car.originalPrice || null}
                </div>
              </div>

              <Link href="/car-rent">
                <button className="text-base font-medium text-center gap-2 h-11 w-28 text-white bg-[#3563E9] hover:bg-blue-800 rounded">
                  Rent Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DetailCarRecommendations({ cars, carCardsNo }: any) {
  const searchParams = useSearchParams();

  // Retrieve selected categories and capacities from query parameters
  const selectedCategories = searchParams.getAll("category");
  const selectedCapacities = searchParams.getAll("capacity");

  // Filter cars based on selected categories and selected capacities
  const filteredCars = cars.filter((car: any) => {
    const matchesCategory = selectedCategories.length
      ? selectedCategories.includes(car.category)
      : true; // If no categories are selected, include all cars
    const matchesCapacity = selectedCapacities.length
      ? selectedCapacities.includes(car.capacity)
      : true; // If no capacities are selected, include all cars

    return matchesCategory && matchesCapacity;
  });

  const carsToDisplay = filteredCars.slice(0, carCardsNo);

  return (
    <div className="flex flex-col space-y-4 relative lg:w-[100%]">
      {filteredCars.length > 0 && (
        <div className="flex items-stretch justify-between">
          <p className="text-base font-semibold text-[#90A3BF]">
            Recomendation Car
          </p>
          <p className="text-base font-semibold text-[#3563E9] absolute right-3">
            View All
          </p>
        </div>
      )}

      {/*Car Cards*/}
      <div
        className="relative flex sm:grid-cols-2 lg:grid-cols-3 md:grid md:grid-cols-2 gap-6
           overflow-x-auto lg:overflow-visible mb-8 lg:w-full w-80 md:w-[680px]
        max-md:justify-items-center"
      >
        {carsToDisplay.map((car: any) => (
          <div
            className="bg-white rounded-lg flex flex-col p-6 relative flex-shrink-0 lg:flex-shrink
            w-[304px] md:w-full lg:w-auto shadow-sm"
            key={car._id}
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <div className="font-bold text-xl text-[#1A202C]">
                  {car.name}
                </div>
                <p className="mt-1 font-semibold text-sm text-[#90A3BF]">
                  {car.category}
                </p>
              </div>
              <FavIcon car={car} />
            </div>
            <Image
              width={300}
              height={100}
              src={car.image.asset.url}
              alt="All New Rush"
              className="self-center mt-16 mx-auto w-64 h-auto object-cover"
            />
            <div className="flex space-x-4 sm:flex-row items-center justify-center -mx-2 mt-16 text-sm font-medium text-[#90A3BF]">
              <div className="flex space-x-1 items-center justify-center">
                <Image
                  height={24}
                  width={24}
                  src="/images/gas-station.png"
                  alt="Gas-Station"
                />
                <p>{car.fuel}</p>
              </div>
              <div className="flex space-x-1 items-center justify-center">
                <Image
                  height={24}
                  width={24}
                  src="/images/manual.png"
                  alt="Mode"
                />
                <p>{car.mode}</p>
              </div>
              <div className="flex space-x-1 items-center justify-center">
                <Image
                  height={24}
                  width={24}
                  src="/images/profile-2user.png"
                  alt="2users-profile"
                />
                <p>{car.capacity}</p>
              </div>
            </div>
            <div className="flex items-start justify-between mt-6 gap-2">
              <div className="flex flex-col font-bold text-[#1A202C]">
                <div className="text-xl">
                  {car.rentPerDay}/{" "}
                  <span className="text-sm text-[#90A3BF]">day</span>
                </div>
                <div className="mt-1 text-sm text-[#90A3BF] line-through">
                  {car.originalPrice || null}
                </div>
              </div>

              <Link href="/car-rent">
                <button
                  className="text-base font-medium text-center gap-2 h-11 w-28
                       text-white bg-[#3563E9] hover:bg-blue-800 rounded"
                >
                  Rent Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
