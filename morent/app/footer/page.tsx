import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="lg:bg-white bg-[#F6F7F9] bottom-0">
      <div className="lg:flex p-20 grid">
        <div className="space-y-4">
          <Link href="/">
            <Image src="/images/Logo.png" width={148} height={44} alt="Logo" />
          </Link>
          <p className="text-base font-medium text-[#131313] opacity-60">
            Our vision is to provide convenience <br /> and help increase your
            sales business.
          </p>
        </div>

        <div
          className="lg:flex lg:flex-row lg:space-x-20 justify-between items-start grid grid-cols-2
         space-y-8 lg:space-y-0 lg:ml-80"
        >
          <div className="flex flex-col space-y-6 lg:mt-0 mt-8">
            <h2 className="text-xl font-semibold text-[#1A202C] cursor-pointer">
              About
            </h2>
            <div className="space-y-4">
              <p className="text-base font-medium text-[#131313] opacity-60 cursor-pointer">
                How it works
              </p>
              <p className="text-base font-medium text-[#131313] opacity-60 cursor-pointer">
                Featured
              </p>
              <p className="text-base font-medium text-[#131313] opacity-60 cursor-pointer">
                Partnership
              </p>
              <p className="text-base font-medium text-[#131313] opacity-60 cursor-pointer">
                Bussiness Relation
              </p>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <h2 className="text-xl font-semibold text-[#1A202C]">Community</h2>
            <div className="space-y-4">
              <p className="text-base font-medium text-[#131313] opacity-60 cursor-pointer">
                Events
              </p>
              <p className="text-base font-medium text-[#131313] opacity-60 cursor-pointer">
                Blog
              </p>
              <p className="text-base font-medium text-[#131313] opacity-60 cursor-pointer">
                Podcast
              </p>
              <p className="text-base font-medium text-[#131313] opacity-60 cursor-pointer">
                Invite a friend
              </p>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <h2 className="text-xl font-semibold text-[#1A202C]">About</h2>
            <div className="space-y-4">
              <p className="text-base font-medium text-[#131313] opacity-60">
                <Link href="https://discord.com/" target="_blank">
                  Discord
                </Link>
              </p>

              <p className="text-base font-medium text-[#131313] opacity-60">
                <Link href="https://instagram.com/" target="_blank">
                  Instagram
                </Link>
              </p>

              <p className="text-base font-medium text-[#131313] opacity-60">
                <Link href="https://twitter.com/" target="_blank">
                  Twitter
                </Link>
              </p>
              <p className="text-base font-medium text-[#131313] opacity-60">
                <Link href="https://facebook.com/" target="_blank">
                  Facebook
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/*Copyright Section*/}

      <div className="mx-[60px] h-[1px] bg-[#131313] opacity-20"> </div>

      <div
        className="flex flex-row items-stretch 
            justify-between p-[25px] lg:mx-[70px] mx-10"
      >
        <p className="text-base font-semibold text-[#1A202C]">
          ©2022 MORENT. All rights reserved
        </p>
        <div
          className="space-x-6 flex items-center justify-center lg:ml-0 ml-10
        hover:cursor-pointer"
        >
          <p className="text-base font-semibold text-[#1A202C]">
            Privacy Policy{" "}
          </p>
          <p className="text-base font-semibold text-[#1A202C]">
            Terms & Condition{" "}
          </p>
        </div>
      </div>
    </footer>
  );
}
