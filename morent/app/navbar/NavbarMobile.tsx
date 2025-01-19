import Image from "next/image";
import Link from "next/link";

export default function NavbarMobile() {
  return (
    <nav
      className="box-border bg-white border border-[#C3D4E9] mt-0 lg:mt-16
        border-opacity-40 p-6 flex flex-col
        lg:justify-between items-center justify-center h-auto relative border-r-0 lg:hidden"
    >
      <div className="lg:flex md:flex items-center justify-between lg:space-x-10 lg:-mb-5">
        {/* Logo */}
        <div className="flex lg:items-center lg:space-x-0 lg:ml-3 mt-1">
          <Link href="/" className="h-11">
            <Image
              src="/images/Logo.png"
              width={130}
              height={36}
              alt="Logo"
              className="absolute md:left-8 left-4"
            />
          </Link>

          <Link href="/dashboard">
            <Image
              src="/images/Image.png"
              height={44}
              width={44}
              alt="profile"
              className="lg:hidden block ml-40 -mt-1 absolute md:right-8 right-2"
            />
          </Link>
        </div>

        {/* Search bar */}
        <div
          className="flex items-center justify-center space-x-5 lg:transform lg:-mt-2 mt-4
        md:mt-0"
        >
          <div
            className="flex items-center justify-between w-[280px] lg:w-[420px] h-[36px]
           lg:rounded-full rounded-md ring-1 ring-[#C3D4E9] ring-opacity-70 
           px-4 relative"
          >
            <button>
              <Image
                src="/images/search-normal.png"
                height={24}
                width={24}
                alt="search"
              />
            </button>

            <input
              type="text"
              className="absolute bg-transparent lg:w-80 h-10
         placeholder:text-sm placeholder:text-[#596780] placeholder:font-medium placeholder:mx-4
         ml-10 border-0 border-transparent focus-visible:outline-none focus-visible:ring-0"
              placeholder="Search something here"
            />

            <button>
              <Image
                src="/images/filter.png"
                height={24}
                width={24}
                alt="filter"
                className="hidden lg:flex"
              />
            </button>
          </div>
          <div
            className=" rounded-md ring-1 ring-[#C3D4E9] ring-opacity-70 lg:hidden
        h-10 w-9 flex items-center justify-center relative"
          >
            <button>
              <Image
                src="/images/filter.png"
                height={24}
                width={24}
                alt="filter"
                className="block lg:hidden"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Profile and Notification */}
      <div className="lg:items-center gap-5 mt-4 lg:mt-0 lg:ml-0 ml-5 lg:mr-4 lg:flex hidden">
        <Link href="/detail-car-rent">
          <div
            className="w-9 h-9 flex-none rounded-full ring-1 ring-[#C3D4E9] ring-opacity-40 
            flex items-center justify-center"
          >
            <button>
              <Image
                src="/images/heart.png"
                height={24}
                width={24}
                alt="search"
              />
            </button>
          </div>
        </Link>

        <Link href="/">
          <div
            className="w-9 h-9 flex-none rounded-full ring-1 ring-[#C3D4E9] ring-opacity-40 
            flex items-center justify-center relative"
          >
            <button>
              <Image
                src="/images/notification.png"
                height={24}
                width={24}
                alt="notification"
              />
            </button>
            <div
              className="rounded-full h-2 w-2 bg-red-500 z-10 absolute top-[2px]
              right-0"
            ></div>
          </div>
        </Link>

        <Link href="/">
          <div
            className="w-9 h-9 flex-none rounded-full ring-1 ring-[#C3D4E9] ring-opacity-40 
            flex items-center justify-center"
          >
            <button>
              <Image
                src="/images/setting-2.png"
                height={24}
                width={24}
                alt="settings"
              />
            </button>
          </div>
        </Link>

        <Link href="/dashboard">
          <div
            className="w-9 h-9 flex-none rounded-full ring-1 ring-[#C3D4E9] ring-opacity-40 
            flex items-center justify-center"
          >
            <button>
              <Image
                src="/images/Image.png"
                height={44}
                width={44}
                alt="profile"
              />
            </button>
          </div>
        </Link>
      </div>
    </nav>
  );
}
