import Image from "next/image";
import Link from "next/link";
import FavIcon from "./favIcon";
import { CarListProps } from "@/lib/types";
import { popularCars } from "../data/page";

export default async function PopularCarSection({ carCardsNo }: CarListProps) {
  const cars = popularCars.slice(0, carCardsNo);

  return (
    <div>
      {/*Car Cards*/}
      <div
        className="relative flex sm:grid-cols-2 lg:grid-cols-4 md:grid md:grid-cols-2 gap-6
           overflow-x-auto lg:overflow-visible mb-8 lg:w-full w-80 md:w-[680px] max-lg:justify-items-center"
      >
        {cars.map((car: any) => (
          <div
            className="bg-white rounded-lg flex flex-col p-6 relative flex-shrink-0 lg:flex-shrink
              w-[304px] md:w-full lg:w-auto shadow-sm"
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

            <Link href={`/detail-car-rent/${car.slug.current}`}>
              <Image
                src={car.image.asset.url}
                width={300}
                height={100}
                alt="car-image"
                className="mt-16 w-64 h-auto object-cover mx-auto"
              />
            </Link>

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
