import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Reviews() {
  return (
    <div
      className="bg-white lg:h-[452px] rounded-lg
    p-6 h-auto lg:mt-0 mt-6 relative flex-shrink-0 lg:flex-shrink
     w-80 md:w-full lg:w-[100%]"
    >
      <div className="space-x-3 flex">
        <p className="text-xl font-semibold text-[#1A202C]">Reviews</p>
        <button
          className="px-5 space-x-2 rounded text-white bg-[#3563E9]
            text-sm font-bold"
        >
          13
        </button>
      </div>

      {/*Review 1*/}
      <div className="flex mt-8 items-start relative">
        <Image
          src="/images/Image.png"
          height={56}
          width={56}
          alt="Profile-Image"
          className="lg:w-14 lg:h-14 h-[46px] w-[46px]"
        />

        <div className="flex flex-col lg:ml-4 ml-[14px]">
          <div className="flex items-stretch justify-between">
            <div className="flex flex-col space-y-2 text-left">
              <p className="lg:text-xl text-lg font-bold text-[#1A202C]">
                Alex Stanton
              </p>
              <p className="text-sm text-[#90A3BF] font-medium">
                CEO at Bukalapak
              </p>
            </div>

            <div
              className="flex flex-col space-y-2 text-right lg:ml-0 lg:mt-0
            mt-1 "
            >
              <p className="lg:text-sm text-[13px] text-[#90A3BF] font-medium">
                21 July 2022
              </p>
              <Image
                src="/images/Four Star.png"
                height={20}
                width={108}
                alt="ratings"
                className="lg:w-[108px] lg:h-[20px] w-[70px] h-[15px]"
              />
            </div>
          </div>

          <div className="mt-3">
            <p className="text-left lg:text-sm text-[#596780] text-[11px] relative">
              We are very happy with the service from the MORENT App. Morent has
              a low price and also a large variety of cars with good and
              comfortable facilities. In addition, the service provided by the
              officers is also very friendly and very polite.
            </p>
          </div>
        </div>
      </div>

      {/*Review 2*/}
      <div className="flex mt-6 items-start relative">
        <Image
          src="/images/Profile.png"
          height={56}
          width={56}
          alt="Profile-Image"
          className="lg:w-14 lg:h-14 h-[46px] w-[46px]"
        />

        <div className="flex flex-col lg:ml-4 ml-[14px]">
          <div className="flex items-stretch justify-between">
            <div className="flex flex-col space-y-2 text-left">
              <p className="lg:text-xl text-lg font-bold text-[#1A202C]">
                Skylar Dias
              </p>
              <p className="text-sm text-[#90A3BF] font-medium">
                CEO at Amazon
              </p>
            </div>

            <div className="flex flex-col space-y-2 text-right">
              <p className="lg:text-sm text-xs text-[#90A3BF] font-medium">
                20 July 2022
              </p>
              <Image
                src="/images/Four Star.png"
                height={20}
                width={108}
                alt="ratings"
                className="lg:w-[108px] lg:h-[20px] w-[70px] h-[15px]"
              />
            </div>
          </div>

          <div className="mt-3">
            <p className="text-left lg:text-sm text-xs text-[#596780] relative">
              We are greatly helped by the services of the MORENT Application.
              Morent has low prices and also a wide variety of cars with good
              and comfortable facilities. In addition, the service provided by
              the officers is also very friendly and very polite.
            </p>
          </div>
        </div>
      </div>

      <div className=" flex items-center justify-center mx-auto">
        <button
          className="mt-6 rounded px-5 space-x-2 h-11
        text-base font-medium text-[#90A3BF] flex items-center justify-center"
        >
          Show All <ChevronDown className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  );
}
