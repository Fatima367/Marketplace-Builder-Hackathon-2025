import Image from "next/image";

export default function Header() {
  return (
    <header className="hidden lg:mx-8 lg:mt-0 lg:visible lg:block">
      <div className="flex items-center justify-between lg:-mb-14 lg:mt-2 ">
        <div className="flex space-x-3 items-center">
          <Image
            src="/images/command.png"
            height={24}
            width={24}
            alt="command"
          />
          <h2 className="font-bold text-2xl">
            High Fidelity Dashboard - Detail Car
          </h2>
        </div>
        <div className="flex space-x-2">
          <p className="text-base font-medium text-[#666666]">Last Updated:</p>
          <p className="text-base font-bold -ml-10">8 Aug 2022</p>
        </div>
      </div>
    </header>
  );
}