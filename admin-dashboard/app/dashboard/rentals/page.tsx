import { client } from "@/lib/sanity";
import RentalsClient from "./rentals-client";

// Function to fetch rentals
async function getRentals() {
  const query = `*[_type == "bookedCar"] | order(_createdAt desc) {
    _id,
    car_name,
    car_rent,
    pickup_location,
    dropoff_location,
    pickup_date,
    dropoff_date,
    "customer": customer->name,
    _createdAt
  }`;

  return client.fetch(query);
}

export default async function RentalsPage() {
  const rentals = await getRentals();

  return <RentalsClient rentals={rentals} />;
}