import Image from "next/image";
import RecommendationCar, { recommendedCarList } from "./components/recommendation-car";
import Link from "next/link";
import Navbar from "./navbar/Navbar";
import NavbarMobile from "./navbar/NavbarMobile";
import { ToastContainer } from "react-toastify";
import PopularCarSection, { popularCarList } from "./components/popular-car";
import HomePagePickAndDropForm from "./components/pickNdrop-form";

export default function Home() {
  const popularCarData = popularCarList;
  const recommendedCarData = recommendedCarList;

  return (
    <section className="bg-[#F6F7F9] font-PlusJakartaSans relative">
      <Navbar />
      <NavbarMobile />

      <div className="flex flex-col items-center justify-center px-5 lg:px-4 mx-auto">
        {/*Hero Section*/}

        <div
          className="flex lg:flex-row lg:space-x-8 items-center justify-center mt-8 flex-col lg:space-y-0 
        space-y-6 mx-auto relative"
        >
          <div
            className="rounded-lg object-cover lg:mx-0 mx-auto relative
          lg:w-[48%] md:w-full md:h-80 lg:h-80 w-80 h-96 bg-blue-400 hover:scale-105 transition"
          >
            <Image
              src="/images/Ads 1.png"
              height={360}
              width={640}
              alt="Ad 1"
            />

            <div
              className="flex flex-col space-y-4 z-10 text-white absolute lg:top-5 lg:left-6
            top-4 left-5 "
            >
              <h2 className="text-[32px] font-semibold">
                The Best Platform <br /> for Car Rental
              </h2>
              <p className="text-base font-medium">
                Ease of doing a car rental safely and <br /> reliably. Of course
                at a low price.
              </p>

              <Link href="/car-rent">
                <button
                  className="rounded space-x-2 px-5 bg-[#3563E9] text-base font-medium text-white
           h-11 w-[120px] hover:bg-blue-800"
                >
                  Rental Car
                </button>
              </Link>
            </div>

            <div className="flex items-center justify-center mx-auto">
              <Image
                src="/images/image 7.png"
                height={118}
                width={340}
                alt="car-image"
                className="z-20 absolute lg:top-60 md:top-60 lg:my-auto lg:bottom-auto bottom-4"
              />
            </div>
          </div>

          <div
            className="rounded-lg lg:w-[48%] lg:h-80 w-80 h-96 bg-blue-600 lg:block hidden 
            hover:scale-105 transition relative"
          >
            <Image
              src="/images/Ads 2.png"
              height={360}
              width={640}
              alt="Ad 2"
            />

            <div
              className="flex flex-col space-y-4 z-10 text-white absolute lg:top-5 lg:left-6
            top-4 left-5"
            >
              <h2 className="text-[32px] font-semibold">
                The Best Platform <br /> for Car Rental
              </h2>
              <p className="text-base font-medium">
                Providing cheap car rental services <br />
                and safe and comfortable facilities.
              </p>

              <Link href="/car-rent">
                <button
                  className="rounded space-x-2 px-5 bg-[#54A6FF] text-base font-medium text-white
           h-11 w-[120px] hover:bg-blue-300"
                >
                  Rental Car
                </button>
              </Link>
            </div>

            <div className="flex items-center justify-center ">
              <Image
                src="/images/image 8.png"
                height={108}
                width={340}
                alt="car-image"
                className="z-50 absolute lg:top-56 lg:my-auto lg:bottom-auto bottom-4"
              />
            </div>
          </div>
        </div>

        {/*--------------------------------------------------------------------------------------------------------*/}

        {/*--------------*/}

        <HomePagePickAndDropForm />

        {/*--------------------------------------------------------------------------------------------------------*/}

        <ToastContainer hideProgressBar />
        <div className="max-w-[1440px] lg:py-8 mx-auto flex justify-center">
          <div className="flex flex-col space-y-5 relative">
            <div className="flex items-start justify-between">
              <p className="text-xl font-bold text-[#90A3BF]">Popular Car</p>

              <Link href="/car-rent">
                <p className="text-base font-semibold text-[#3563E9] ">
                  View All
                </p>
              </Link>
            </div>

            {/*Car Cards*/}
            <PopularCarSection cars={popularCarData} carCardsNo={4} />
          </div>
        </div>

        {/*--------------------------------------------------------------------------------------------------------*/}

        {/* Recommendation Car Section */}

        <div className="lg:py-8 mx-auto flex relative max-w-[1260px] md:py-8">
          <div className="flex flex-col relative">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-bold text-[#90A3BF] text-left mb-8">
                Recomendation Car{" "}
              </h2>
            </div>

            {/*Car Cards*/}

            <RecommendationCar cars={recommendedCarData} carCardsNo={8} />

            <div className="flex items-center justify-center my-16 mx-auto">
              <Link href="/car-rent">
                <button
                  className="rounded space-x-2 px-5 bg-[#3563E9] text-base font-semibold text-white
           h-11 w-[156px] hover:bg-blue-800"
                >
                  Show more car
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/*--------------------------------------------------------------------------------------------------------*/}
      </div>
    </section>
  );
}
