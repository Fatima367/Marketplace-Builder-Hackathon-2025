import { client } from "@/lib/sanity";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { HiUsers } from "react-icons/hi2";

// Function to fetch cars
async function getCars() {
  const query = `*[_type == "car"] {
    _id,
    name,
    category,
    rentPerDay,
    fuel,
    capacity,
    image {
      asset-> {
        url
      }
    }
  }`;

  return client.fetch(query);
}

export default async function CarsPage() {
  const cars = await getCars();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#1A202C]">Cars</h1>
        <Link href="/dashboard/cars/new">
          <Button className="bg-[#3563E9] hover:bg-blue-800 dark:bg-[#3563E9] dark:text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add New Car
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car: any) => (
          <div
            className="bg-white rounded-lg flex flex-col p-6 relative flex-shrink-0 lg:flex-shrink
          w-[304px] md:w-full lg:w-auto shadow-sm dark:bg-gray-800"
            key={car._id}
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col text-left space-y-1">
                <p className="font-bold text-xl text-[#1A202C] dark:text-slate-300">
                  {car.name}
                </p>
                <p className="font-bold text-sm text-[#90A3BF]">
                  {car.category}
                </p>
              </div>
            </div>

            <Image
              src={car.image?.asset?.url || "/placeholder.jpg"}
              alt={car.name}
              width={300}
              height={100}
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
                <HiUsers className="h-6 w-6 text-[#90A3BF]" />
                <p className="text-[#90A3BF] text-sm font-medium">
                  {car.capacity}
                </p>
              </div>
            </div>

            <div className="flex items-start justify-between mt-6 gap-2">
              <div className="flex flex-col font-bold text-[#1A202C] dark:text-slate-300">
                <div className="text-xl font-bold">
                  {car.rentPerDay}/{" "}
                  <span className="text-sm text-[#90A3BF]">day</span>
                </div>
                <div className="mt-1 text-sm text-[#90A3BF] line-through">
                  {car.originalPrice || null}
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/dashboard/cars/${car._id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="dark:bg-blue-800"
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  className="dark:bg-red-600"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}