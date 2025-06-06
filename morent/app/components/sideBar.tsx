"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useRouter } from "next/navigation";

export default function Sidebar({ className }: { className?: string }) {
  const router = useRouter();
  const defaultCategories = [
    "Sport",
    "SUV",
    "MPV",
    "Sedan",
    "Cope",
    "Hatchback",
  ];
  const defaultCapacities = ["2 People", "4 People", "6 People", "8 People"];

  const handleCategoryChange = (category: string, isChecked: boolean) => {
    const currentParams = new URLSearchParams(window.location.search);
    const categories = currentParams.getAll("category");

    if (isChecked) {
      currentParams.append("category", category);
    } else {
      const updatedCategories = categories.filter((cat) => cat !== category);
      currentParams.delete("category");
      updatedCategories.forEach((cat) => currentParams.append("category", cat));
    }

    router.push(`?${currentParams.toString()}`);
  };

  const handleCapacityChange = (capacity: string, isChecked: boolean) => {
    const currentParams = new URLSearchParams(window.location.search);
    const capacities = currentParams.getAll("capacity");

    if (isChecked) {
      currentParams.append("capacity", capacity);
    } else {
      const updatedCapacities = capacities.filter((cap) => cap !== capacity);
      currentParams.delete("capacity");
      updatedCapacities.forEach((cap) => currentParams.append("capacity", cap));
    }

    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div
      className={`left-0 lg:flex lg:flex-col lg:visible hidden ${className} bg-white relative
          w-[22rem] px-5`}
    >
      <div className="flex flex-col space-y-4 mt-10 ml-2">
        <p className="text-[#90A3BF] text-base">T Y P E</p>
        {defaultCategories.map((category) => (
          <p className="text-xl font-medium" key={category}>
            <Checkbox
              className="mr-2"
              onCheckedChange={(isChecked) =>
                handleCategoryChange(category, isChecked as boolean)
              }
            />
            {category}
            <span className="ml-2 text-[#90A3BF] text-base">(10)</span>
          </p>
        ))}
      </div>

      <div className="flex flex-col space-y-4 mt-14 ml-2">
        <p className="text-[#90A3BF] text-base">C A P A C I T Y</p>
        {defaultCapacities.map((capacity) => (
          <p className="text-xl font-medium" key={capacity}>
            <Checkbox
              className="mr-2"
              onCheckedChange={(isChecked) =>
                handleCapacityChange(capacity, isChecked as boolean)
              }
            />
            {capacity}{" "}
            <span className="ml-2 text-[#90A3BF] text-base">(10)</span>
          </p>
        ))}
      </div>

      <div className="flex flex-col space-y-4 mt-14 ml-2">
        <p className="text-[#90A3BF] text-base">P R I C E</p>

        {/* Slider bar */}
        <Slider defaultValue={[70]} max={100} step={1} className="hover:cursor-pointer"/>

        <p className="text-xl font-medium text-[#596780]">Max. $100.00</p>
      </div>
    </div>
  );
}
