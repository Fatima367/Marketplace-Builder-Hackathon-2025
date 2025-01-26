import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navbar from "@/app/navbar/Navbar";
import Navbar2 from "@/app/navbar/Navbar2";
import Sidebar from "@/app/components/sideBar";
import {
  DetailCarRecentCars,
  DetailCarRecommendations,
} from "@/app/components/car-rent-carGrids";
import Reviews from "@/app/components/reviews";
import { defineQuery } from "next-sanity";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { ToastContainer } from "react-toastify";

const CAR_QUERY = defineQuery(`*[
  _type == "car" && slug.current == $slug
][0] {
  ...,
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
}`);

const RECOMMENDATION_CAR_QUERY = defineQuery(`*[
  _type == "car"
  && "recommended" in tags[] && defined(_id)
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

const POPULAR_CAR_QUERY = defineQuery(`*[
  _type == "car"
  && "popular" in tags[] && defined(_id)
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

const { projectId, dataset } = client.config();

// Function to generate image URL for the car images
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function DetailCarRent({
  params,
}: {
  params: Promise<{ slug: string }>; // Expecting slug with the format 'carId-name'
}) {
  // Extracting the slug from the params (e.g., '10-chevrolet-camaro')
  const { slug } = await params;

  // Extract carId and name from the slug
  const [carId, ...nameParts] = slug.split("-");
  const carName = nameParts.join(" "); // Join the remaining parts back to form the car name

  console.log("Extracted carId:", carId); // Check the extracted carId
  console.log("Extracted carName:", carName); // Check the extracted carName

  // Fetching the car details from Sanity using the CAR_QUERY with slug
  const { data: car } = await sanityFetch({
    query: CAR_QUERY,
    params: { slug }, // Pass the full slug (e.g., '10-chevrolet-camaro')
  });

  // If no car is found, handle the error (e.g., show a 404 page)
  if (!car) {
    console.error("Car not found for slug:", slug);
    notFound(); // Redirect to a 404 page if the car is not found
  }

  // Destructure the car data
  const {
    _id,
    name,
    rentPerDay,
    originalPrice,
    capacity,
    mode,
    fuel,
    category,
    image,
    _createdAt,
    _updatedAt,
  } = car;

  // Generate the image URL (if an image exists)
  const imageUrl = image ? urlFor(image)?.width(380).height(120).url() : null;

  const { data: recommendedCarList } = await sanityFetch({
    query: RECOMMENDATION_CAR_QUERY,
  });

  const { data: popularCarList } = await sanityFetch({
    query: POPULAR_CAR_QUERY,
  });

  const recentCarData = popularCarList;

  return (
    <div className="bg-[#F6F7F9]">
      <Navbar />
      <Navbar2 />
      <div className="flex relative items-start">
        {/*Left*/}
        <Sidebar className="h-[158rem]" />
        <ToastContainer hideProgressBar />
        {/*Right*/}
        <div className="flex flex-col items-center justify-center mb-8 relative lg:px-6 md:px-4 mx-auto gap-8">
          <div
            className="flex lg:flex-row md:flex-row flex-col lg:space-x-8 space-y-5 relative lg:w-[100%]
                lg:items-start lg:justify-between items-center justify-center md:space-x-8
                md:w-[50%] md:items-start md:justify-center"
          >
            {/*Left Side*/}
            <div
              className="flex flex-col mt-6 relative items-center justify-center
            flex-shrink-0 lg:flex-shrink w-80 md:w-auto lg:w-auto"
            >
              <div
                className="rounded-lg object-cover lg:w-[30.6rem] lg:h-[22rem] w-[310px] 
           h-[420px] bg-blue-600 lg:mx-0 mx-auto relative"
              >
                <Image
                  src="/images/View.png"
                  height={360}
                  width={492}
                  alt="Bg image"
                />

                <div
                  className="flex flex-col space-y-4 z-10 ml-6 text-white absolute lg:top-6
                    top-4"
                >
                  <h2 className="text-[32px] font-semibold text-left">
                    {category} car with the best <br /> design and acceleration
                  </h2>
                  <p className="text-base font-medium text-left">
                    Safety and comfort while driving a <br />
                    futuristic and elegant {category} car
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      height={120}
                      width={380}
                      alt="car-image"
                      className="z-30 absolute lg:bottom-0 lg:top-48
                    mx-auto mb-10 lg:mt-8 mt-6 bottom-0 top-72"
                    />
                  )}
                </div>
              </div>

              <div
                className="lg:flex-row flex lg:space-x-6 space-y-5 items-center 
          justify-center mx-auto space-x-3 w-[100%] relative"
              >
                <div
                  className="rounded-lg flex items-center justify-center
            ring-2 ring-[#3563E9] ring-offset-[#F6F7F9]
            lg:flex-row flex-col mt-6 relative lg:h-[124px] lg:w-[148px] h-16 w-24"
                >
                  <Image
                    src="/images/View.png"
                    height={108}
                    width={132}
                    alt="car"
                    className="rounded-lg lg:h-[108px] lg:w-[132px] h-14 w-[88px] absolute"
                  />

                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      height={36}
                      width={116}
                      alt="car"
                      className="z-50 rounded-none mx-auto absolute lg:h-[36px] lg:w-[116px] h-[26px] w-20"
                    />
                  )}
                </div>

                <Image
                  src="/images/View 2.png"
                  height={124}
                  width={148}
                  alt="car-interior"
                  className="rounded-lg lg:h-[124px] lg:w-[148px] h-16 w-24"
                />

                <Image
                  src="/images/View 3.png"
                  height={124}
                  width={148}
                  alt="car-interior"
                  className="rounded-lg lg:h-[124px] lg:w-[148px] h-16 w-24"
                />
              </div>
            </div>

            {/*Right Side*/}
            <div
              className="lg:h-[31rem] bg-white rounded-lg my-6
              lg:mx-0 h-auto relative flex-shrink-0 lg:flex-shrink
             w-80 md:w-full lg:w-auto p-6 md:h-[32rem]"
            >
              <div className="flex flex-col">
                <div className="">
                  <div className="flex flex-col space-y-2">
                    <h2 className="text-[32px] font-bold text-left">{name}</h2>
                    <div className="flex space-x-2 items-start justify-start">
                      <Image
                        src="/images/Four Star.png"
                        height={20}
                        width={108}
                        alt="ratings"
                      />
                      <p className="text-[#596780] text-sm font-medium">
                        440+ Reviewer
                      </p>
                    </div>
                  </div>

                  <div className="hidden lg:flex absolute lg:right-5 top-5">
                    <Image
                      src="/images/Like.png"
                      height={24}
                      width={24}
                      alt="favourite"
                      className="cursor-pointer"
                    />
                  </div>
                </div>

                <div className="mt-8 md:mt-4 lg:mt-8 flex items-start justify-between">
                  <p className="text-[#596780] lg:text-lg text-lg md:text-base text-left">
                    NISMO has become the embodiment of {name}'s outstanding
                    performance, inspired by the most unforgiving proving
                    ground, the "race track".
                  </p>
                </div>

                <div className="mt-8 md:mt-4 lg:mt-8 lg:grid lg:grid-cols-2 grid lg:space-y-0 space-y-5">
                  <div className="grid gap-4">
                    <div className="lg:space-x-4 space-x-28 flex">
                      <p className="text-[#90A3BF] text-lg text-left">
                        Type Car
                      </p>
                      <p className="text-[#596780] text-lg text-right">
                        {category}
                      </p>
                    </div>
                    <div className="lg:space-x-4 space-x-28 flex">
                      <p className="text-[#90A3BF] text-lg text-left">
                        Steering
                      </p>
                      <p className="text-[#596780] text-lg text-right">
                        {mode}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div className="lg:space-x-4 space-x-28 flex">
                      <p className="text-[#90A3BF] text-lg text-left">
                        Capacity
                      </p>
                      <p className="text-[#596780] text-lg text-right">
                        {capacity}
                      </p>
                    </div>
                    <div className="lg:space-x-4 space-x-28 flex">
                      <p className="text-[#90A3BF] text-lg text-left">
                        Gasoline
                      </p>
                      <p className="text-[#596780] text-lg text-right">
                        {fuel}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex lg:mt-auto mt-16 md:mt-9 md:mb-2 items-center justify-between">
                  <div
                    className="flex flex-col font-bold text-[#1A202C] lg:absolute lg:bottom-5 lg:left-6
                  md:absolute md:bottom-5"
                  >
                    <div className="lg:text-[28px] text-2xl font-bold">
                      {rentPerDay}/
                      <span className="lg:text-base text-sm text-[#90A3BF]">
                        day
                      </span>
                    </div>
                    <div className="mt-1 text-base text-[#90A3BF] line-through">
                      {originalPrice || null}
                    </div>
                  </div>

                  <Link
                    href={{
                      pathname: "/payment",
                      query: {
                        carName: name,
                        rentPerDay,
                        imageUrl,
                        totalPrice: rentPerDay,
                      },
                    }}
                  >
                    <button
                      className="lg:px-8 px-5 mt-1 text-base font-medium text-center gap-2
                     text-white bg-[#3563E9] hover:bg-blue-800 rounded lg:h-14 h-11
                     lg:absolute lg:bottom-5 lg:right-6 md:absolute md:bottom-5 md:right-5"
                    >
                      Rent Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/*Reviews*/}
          <Reviews slug={slug} />

          {/*Recent Car Section*/}

          <DetailCarRecentCars cars={recentCarData} carCardsNo={3} />

          {/*Recommended Car Section*/}
          <DetailCarRecommendations cars={recommendedCarList} carCardsNo={6} />
        </div>
      </div>
    </div>
  );
}