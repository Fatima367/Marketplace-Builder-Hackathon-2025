import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import Navbar from "../navbar/Navbar";
import Navbar3 from "../navbar/Navbar3";

const Dashboard = () => {
  return (
    <div className="bg-[#F6F7F9]">
      <Navbar />
      <Navbar3 />
      <div className="flex relative">
        {/*Left*/}
        <div className="left-0 lg:flex lg:flex-col lg:visible hidden lg:h-[2000px] bg-white w-[17rem] px-5">
          <div className="flex flex-col space-y-10 mt-10">
            <p className="text-[#90A3BF] text-base ml-2">M A I N M E N U</p>
            <div className="space-y-8">
              <div
                className="w-56 h-14 rounded-lg bg-[#3563E9] text-white
               relative flex items-center justify-start"
              >
                <div className="text-xl font-medium z-10 absolute flex items-center">
                  <Image
                    src="/images/home.png"
                    height={24}
                    width={24}
                    alt="Home"
                    className="ml-3 mr-2"
                  />{" "}
                  <p> Dashboard</p>
                </div>
              </div>

              <div
                className="text-xl font-medium flex z-10 text-[#90A3BF] items-center
               hover:bg-blue-50 hover:rounded-md cursor-pointer"
              >
                <Image
                  src="/images/car-icon.png"
                  height={24}
                  width={24}
                  alt="Home"
                  className="ml-3 mr-2"
                />{" "}
                <p> Car Rent</p>
              </div>

              <div
                className="text-xl font-medium flex z-10 text-[#90A3BF] items-center
               hover:bg-blue-50 hover:rounded-md cursor-pointer"
              >
                <Image
                  src="/images/chart.png"
                  height={24}
                  width={24}
                  alt="Home"
                  className="ml-3 mr-2"
                />{" "}
                <p> Insight</p>
              </div>

              <div
                className="text-xl font-medium flex z-10 text-[#90A3BF] items-center
               hover:bg-blue-50 hover:rounded-md cursor-pointer"
              >
                <Image
                  src="/images/wallet.png"
                  height={24}
                  width={24}
                  alt="Home"
                  className="ml-3 mr-2"
                />{" "}
                <p> Reimburse</p>
              </div>

              <div
                className="text-xl font-medium flex z-10 text-[#90A3BF] items-center
               hover:bg-blue-50 hover:rounded-md cursor-pointer"
              >
                <Image
                  src="/images/message.png"
                  height={24}
                  width={24}
                  alt="Home"
                  className="ml-3 mr-2"
                />{" "}
                <p> Inbox</p>
              </div>

              <div
                className="text-xl font-medium flex z-10 text-[#90A3BF] items-center
               hover:bg-blue-50 hover:rounded-md cursor-pointer"
              >
                <Image
                  src="/images/calendar.png"
                  height={24}
                  width={24}
                  alt="Home"
                  className="ml-3 mr-2"
                />{" "}
                <p> Calendar</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-7 mt-14">
            <p className="text-[#90A3BF] text-base ml-2">
              P R E F E R E N C E S
            </p>

            <div className="space-y-8">
              <div
                className="text-xl font-medium flex z-10 text-[#90A3BF] items-center
               hover:bg-blue-50 hover:rounded-md cursor-pointer"
              >
                <Image
                  src="/images/setting.png"
                  height={24}
                  width={24}
                  alt="Home"
                  className="ml-3 mr-2"
                />{" "}
                <p>Settings</p>
              </div>

              <div
                className="text-xl font-medium flex z-10 text-[#90A3BF] items-center
               hover:bg-blue-50 hover:rounded-md cursor-pointer"
              >
                <Image
                  src="/images/info.png"
                  height={24}
                  width={24}
                  alt="Home"
                  className="ml-3 mr-2"
                />{" "}
                <p> Help & Center</p>
              </div>

              <div
                className="text-xl font-medium flex z-10 text-[#90A3BF] items-center justify-between
               hover:bg-blue-50 hover:rounded-md cursor-pointer"
              >
                <div className="flex">
                  <Image
                    src="/images/briefcase.png"
                    height={24}
                    width={24}
                    alt="Home"
                    className="ml-3 mr-2"
                  />{" "}
                  <p> Dark Mode</p>
                </div>
                <div
                  className="bg-[#F6F7F9] rounded-full flex items-center justify-center
                 w-[68px] h-[34px] space-x-3"
                >
                  <div className="rounded-full bg-[#3563E9] h-7 w-7 flex items-center justify-center">
                    <Image
                      src="/images/sun.png"
                      height={16}
                      width={16}
                      alt="lightmode"
                    />
                  </div>
                  <Image
                    src="/images/moon.png"
                    height={14.96}
                    width={14.96}
                    alt="darkmode"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex mt-36 mb-20">
            <Link href="/">
              <div
                className="text-xl font-medium flex z-10 text-[#90A3BF]
               hover:bg-blue-50 hover:rounded-md cursor-pointer hover:w-60"
              >
                <Image
                  src="/images/logout.png"
                  height={24}
                  width={24}
                  alt="Home"
                  className="ml-3 mr-2"
                />{" "}
                <p>LogOut</p>
              </div>
            </Link>
          </div>
        </div>

        {/*Right*/}
        <div className="mt-8 mx-auto">
          <div
            className="lg:flex lg:flex-row lg:flex-wrap sm:flex sm:flex-row flex-col justify-center
        lg:gap-5 lg:px-0 px-5 sm:items-start sm:gap-10 sm:justify-center"
          >
            <div className="bg-white p-6 rounded-lg lg:w-auto w-80 lg:ml-4 lg:mx-0 mx-auto">
              <p className="text-xl font-bold text-[#1A202C]">Details Rental</p>

              <Image
                src="/images/Maps.png"
                height={272}
                width={486}
                alt="map"
                className="mt-6 mb-[38px] lg:w-[486px] w-[280px]"
              />

              <div className="flex">
                <div className="flex items-center justify-center lg:flex-row mt-8 relative">
                  <Image
                    src="/images/View.png"
                    height={72}
                    width={132}
                    alt="car"
                    className="rounded-[8px] lg:w-[132px] lg:h-[72px] w-[100px] h-16"
                  />

                  <Image
                    src="/images/image 8.png"
                    height={36}
                    width={116}
                    alt="car"
                    className="z-50 rounded-none mx-auto absolute lg:w-[116px] lg:h-[36px] w-[95px] h-8"
                  />
                </div>

                <div
                  className="flex mt-[38px] ml-4 items-start justify-between 
              lg:space-x-[126px]"
                >
                  <div className="flex flex-col items-start space-y-2">
                    <h2 className="lg:text-2xl text-lg font-bold text-[#1A202C]">
                      Nissan GT - R
                    </h2>
                    <p className="text-sm text-[#90A3BF] font-medium">Sport</p>
                  </div>
                  <p
                    className="text-sm text-[#3D5278] font-medium text-right lg:mt-0
                mt-10"
                  >
                    #9761
                  </p>
                </div>
              </div>

              <div className="flex-1 items-start justify-between mt-8">
                <div className="flex space-x-2 items-center justify-start">
                  <div className="rounded-full h-2 w-2 bg-[#3563E9] ring-4 ring-[#3563E9] ring-opacity-30"></div>
                  <h3 className="text-base font-medium text-[#1A202C]">
                    Pick-Up
                  </h3>
                </div>

                <div className="grid space-y-2 lg:flex mt-4 mx-auto">
                  <div className="space-y-2 flex flex-col">
                    <label className="text-base font-bold text-[#1A202C]">
                      Locations
                    </label>
                    <select
                      className="lg:w-[126px] w-[280px] border-0 text-[#90A3BF] font-medium
                   text-xs lg:bg-transparent bg-[#F6F7F9] lg:p-0 p-4 lg:rounded-none rounded-md"
                    >
                      <option>Kota Semarang</option>
                    </select>
                  </div>
                  <div className="mx-6 w-[1px] bg-[#C3D4E9] opacity-40"> </div>
                  <div className="space-y-2 flex-col flex">
                    <label className="text-base font-bold text-[#1A202C]">
                      Date
                    </label>
                    <select
                      className="lg:w-[126px] w-[280px] border-0 text-[#90A3BF] font-medium
                   text-xs  lg:bg-transparent bg-[#F6F7F9] lg:p-0 p-4 lg:rounded-none rounded-md"
                    >
                      <option>20 July 2022</option>
                    </select>
                  </div>
                  <div className="mx-6 w-[1px] bg-[#C3D4E9] opacity-40"> </div>
                  <div className="space-y-2 flex-col flex">
                    <label className="text-base font-bold text-[#1A202C]">
                      Time
                    </label>
                    <select
                      className="lg:w-[126px] w-[280px] border-0 text-[#90A3BF] font-medium
                   text-xs lg:bg-transparent bg-[#F6F7F9] lg:p-0 p-4 lg:rounded-none rounded-md"
                    >
                      <option>07.00</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex-1 items-start justify-between mt-8">
                <div className="flex space-x-2 items-center justify-start">
                  <div className="rounded-full h-2 w-2 bg-[#3563E9] ring-4 ring-[#5CAFFC] ring-opacity-30"></div>
                  <h3 className="text-base font-medium text-[#1A202C]">
                    Drop-Off
                  </h3>
                </div>

                <div className="grid space-y-2 lg:flex mt-4 mx-auto">
                  <div className="space-y-2 flex flex-col">
                    <label className="text-base font-bold text-[#1A202C]">
                      Locations
                    </label>
                    <select
                      className="lg:w-[126px] w-[280px] border-0 text-[#90A3BF] font-medium 
                  text-xs lg:bg-transparent bg-[#F6F7F9] lg:p-0 p-4 lg:rounded-none rounded-md"
                    >
                      <option>Kota Semarang</option>
                    </select>
                  </div>
                  <div className="mx-6 w-[1px] bg-[#C3D4E9] opacity-40"> </div>
                  <div className="space-y-2 flex-col flex">
                    <label className="text-base font-bold text-[#1A202C]">
                      Date
                    </label>
                    <select
                      className="lg:w-[126px] w-[280px] border-0 text-[#90A3BF] font-medium 
                  text-xs lg:bg-transparent bg-[#F6F7F9] lg:p-0 p-4 lg:rounded-none rounded-md"
                    >
                      <option>21 July 2022</option>
                    </select>
                  </div>
                  <div className="mx-6 w-[1px] bg-[#C3D4E9] opacity-40"> </div>
                  <div className="space-y-2 flex-col flex">
                    <label className="text-base font-bold text-[#1A202C]">
                      Time
                    </label>
                    <select
                      className="lg:w-[126px] w-[280px] border-0 text-[#90A3BF] font-medium 
                  text-xs lg:bg-transparent bg-[#F6F7F9] lg:p-0 p-4 lg:rounded-none rounded-md"
                    >
                      <option>01.00</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-10 mb-9 h-[1px] bg-[#C3D4E9] opacity-40">
                {" "}
              </div>

              <div className="flex items-start justify-between">
                <div className="flex flex-col space-y-1">
                  <p className="lg:text-xl text-[17px] font-bold text-[#1A202C]">
                    Total Rental Price
                  </p>
                  <p className="text-sm text-[#90A3BF] font-medium">
                    Overall price and includes rental discount
                  </p>
                </div>
                <p
                  className="lg:text-[32px] text-[28px] font-bold text-[#1A202C]
              lg:-mt-0 -mt-1"
                >
                  $80.00
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-8 lg:mt-0 mt-5 sm:mt-0 mb-8 mx-auto items-center justify-center">
              <div className="bg-white p-7 rounded-lg lg:w-auto w-80 lg:mx-0 mx-auto">
                <div className="flex items-center justify-between lg:space-x-[260px] ">
                  <p className="text-xl font-bold text-[#1A202C]">
                    Top 5 Car Rental
                  </p>

                  <button>
                    <Image
                      src="/images/more.png"
                      height={24}
                      width={24}
                      alt="more"
                    />
                  </button>
                </div>

                <div className="grid lg:flex mt-8 space-x-6 mb-6">
                  <div className=" lg:mx-0 mx-10">
                    <Image
                      src="/images/Chartpie.png"
                      height={220}
                      width={220}
                      alt="chart"
                      className="relative"
                    />
                    <div
                      className="flex flex-col space-y-1 z-10 items-center justify-center 
                  lg:-mt-36 -mt-32"
                    >
                      <p className="text-2xl font-bold text-[#1A202C]">
                        72,030
                      </p>
                      <p className="text-sm text-[#90A3BF] font-medium">
                        Rental Car
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-[25px] lg:mt-0 mt-28">
                    <div className="flex items-start justify-between space-x-9">
                      <div className="flex items-center justify-center">
                        <Image
                          src="/images/Mark.png"
                          height={12}
                          width={12}
                          alt="mark"
                        />
                        <p className="ml-3 text-sm text-[#90A3BF] font-semibold">
                          Sport Car
                        </p>
                      </div>
                      <p className="text-sm text-[#1A202C] font-semibold text-right">
                        17,439
                      </p>
                    </div>

                    <div className="flex items-start justify-between space-x-9">
                      <div className="flex items-center justify-center">
                        <Image
                          src="/images/Mark (1).png"
                          height={12}
                          width={12}
                          alt="mark"
                        />
                        <p className="ml-3 text-sm text-[#90A3BF] font-semibold">
                          SUV
                        </p>
                      </div>
                      <p className="text-sm text-[#1A202C] font-semibold text-right">
                        9,478
                      </p>
                    </div>

                    <div className="flex items-start justify-between space-x-9">
                      <div className="flex items-center justify-center">
                        <Image
                          src="/images/Mark (2).png"
                          height={12}
                          width={12}
                          alt="mark"
                        />
                        <p className="ml-3 text-sm text-[#90A3BF] font-semibold">
                          Coupe
                        </p>
                      </div>
                      <p className="text-sm text-[#1A202C] font-semibold text-right">
                        18,197
                      </p>
                    </div>

                    <div className="flex items-start justify-between space-x-9">
                      <div className="flex items-center justify-center">
                        <Image
                          src="/images/Mark (3).png"
                          height={12}
                          width={12}
                          alt="mark"
                        />
                        <p className="ml-3 text-sm text-[#90A3BF] font-semibold">
                          Hatchback
                        </p>
                      </div>
                      <p className="text-sm text-[#1A202C] font-semibold text-right">
                        12,510
                      </p>
                    </div>

                    <div className="flex items-start justify-between space-x-9">
                      <div className="flex items-center justify-center">
                        <Image
                          src="/images/Mark (4).png"
                          height={12}
                          width={12}
                          alt="mark"
                        />
                        <p className="ml-3 text-sm text-[#90A3BF] font-semibold">
                          MPV
                        </p>
                      </div>
                      <p className="text-sm text-[#1A202C] font-semibold text-right">
                        14,406
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg lg:w-auto w-80">
                <div className="flex items-center justify-between lg:space-x-[216px]">
                  <p className="text-xl font-bold text-[#1A202C]">
                    Recent Transaction
                  </p>

                  <button>
                    <p className="text-[#3563E9] text-sm font-medium">
                      View All
                    </p>
                  </button>
                </div>

                <div className="flex mt-8 lg:-ml-0 -ml-4">
                  <Image
                    src="/images/Car (2).png"
                    width={114}
                    height={36}
                    alt="car"
                    className="lg:m-[17px] m-[10px] lg:w-[114px] lg:h-[36px] w-[90px] h-9 lg:mr-auto mr-5"
                  />
                  <div className="flex flex-col space-y-2 text-left">
                    <p className="lg:text-base text-[15px] font-bold text-[#1A202C]">
                      Nissan GT -R
                    </p>
                    <p className="text-xs text-[#90A3BF]">Sport Car</p>
                  </div>
                  <div className="flex flex-col space-y-2 text-right lg:ml-[140px] ml-[15px]">
                    <p className="text-xs text-[#90A3BF]">20 July</p>
                    <p className="text-base font-bold text-[#1A202C]">$80.00</p>
                  </div>
                </div>

                <div className="flex mt-8 lg:-ml-0 -ml-4">
                  <Image
                    src="/images/image 7.png"
                    width={120}
                    height={36}
                    alt="car"
                    className="lg:m-[17px] m-[5px] lg:w-[120px] lg:h-[36px] w-[110px] h-9 lg:mr-auto mr-2"
                  />
                  <div className="flex flex-col space-y-2 text-left">
                    <p className="lg:text-base text-sm font-bold text-[#1A202C]">
                      Koegnigsegg
                    </p>
                    <p className="text-xs text-[#90A3BF]">Sport Car</p>
                  </div>
                  <div className="flex flex-col space-y-2 text-right lg:ml-[140px] ml-4">
                    <p className="text-xs text-[#90A3BF]">19 July</p>
                    <p className="text-base font-bold text-[#1A202C]">$99.00</p>
                  </div>
                </div>

                <div className="flex mt-8 lg:-ml-0 -ml-4">
                  <Image
                    src="/images/Car (1).png"
                    width={116}
                    height={36}
                    alt="car"
                    className="lg:m-[17px] lg:ml-auto ml-4 lg:w-[116px] lg:h-[36px] w-[90px] h-9 lg:mr-auto mr-4"
                  />
                  <div className="flex flex-col space-y-2 text-left">
                    <p className="lg:text-base text-sm font-bold text-[#1A202C]">
                      Rolls - Royce
                    </p>
                    <p className="text-xs text-[#90A3BF]">Sport Car</p>
                  </div>
                  <div className="flex flex-col space-y-2 text-right lg:ml-[140px] ml-4">
                    <p className="text-xs text-[#90A3BF]">18 July</p>
                    <p className="text-base font-bold text-[#1A202C]">$96.00</p>
                  </div>
                </div>

                <div className="flex mt-8 lg:-ml-0 -ml-4">
                  <Image
                    src="/images/Car4.png"
                    width={110}
                    height={44}
                    alt="car"
                    className="lg:m-5 m-[10px] lg:w-[110px] lg:h-11 w-[100px] h-10 lg:mr-auto mr-4"
                  />
                  <div className="flex flex-col space-y-2 text-left">
                    <p className="lg:text-base text-sm font-bold text-[#1A202C]">
                      CR - V
                    </p>
                    <p className="text-xs text-[#90A3BF]">SUV</p>
                  </div>
                  <div className="flex flex-col space-y-2 text-right lg:ml-[180px] ml-14">
                    <p className="text-xs text-[#90A3BF]">17 July</p>
                    <p className="text-base font-bold text-[#1A202C]">$80.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
