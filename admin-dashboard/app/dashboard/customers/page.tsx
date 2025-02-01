import { client } from "@/lib/sanity";
import { CustomersClient } from "./customers-client";

async function getCustomers() {
  const customers = await client.fetch(`*[_type == "customer"] {
    _id,
    name,
    email,
    phone,
    "rentals": count(*[_type == "bookedCar" && references(^._id)]),
    "totalSpent": (*[_type == "bookedCar" && references(^._id)].car_rent),
    "status": *[_type == "bookedCar" && references(^._id)] | order(_createdAt desc)[0].status
  }`);

  return customers;
}

export default async function CustomersPage() {
  const customers = await getCustomers();

  return <CustomersClient customers={customers} />;
}