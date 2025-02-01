"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { client } from "@/lib/sanity";

export default function NewCarPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      // Create car document in Sanity
      await client.create({
        _type: "car",
        name: formData.get("name"),
        category: formData.get("category"),
        rentPerDay: Number(formData.get("rentPerDay")),
        fuel: formData.get("fuel"),
        capacity: Number(formData.get("capacity")),
      });

      router.push("/dashboard/cars");
      router.refresh();
    } catch (error) {
      console.error("Error adding car:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      <Card className="dark:bg-gray-950">
        <CardHeader>
          <CardTitle>Add New Car</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Car Name</Label>
              <Input
                id="name"
                name="name"
                required
                className="dark:bg-gray-800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                required
                className="dark:bg-gray-800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rentPerDay">Rent Per Day ($)</Label>
              <Input
                id="rentPerDay"
                name="rentPerDay"
                type="number"
                min="0"
                step="0.01"
                required
                className="dark:bg-gray-800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fuel">Fuel Type</Label>
              <Input
                id="fuel"
                name="fuel"
                required
                className="dark:bg-gray-800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Seating Capacity</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                min="1"
                required
                className="dark:bg-gray-800"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#3563E9] hover:bg-blue-800 dark:text-white text-white"
            >
              {isLoading ? "Adding..." : "Add Car"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}