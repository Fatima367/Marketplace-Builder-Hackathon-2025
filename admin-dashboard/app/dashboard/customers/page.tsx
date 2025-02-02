import { client } from "@/lib/sanity";
import { CustomersClient } from "./customers-client";

function getRentalStatus(pickupDate: string, dropoffDate: string) {
  const now = new Date();
  const pickup = new Date(pickupDate);
  const dropoff = new Date(dropoffDate);

  if (now < pickup) return "pending";
  if (now > dropoff) return "completed";
  return "active";
}

async function getCustomers() {
  const customers = await client.fetch(`*[_type == "customer"] {
    _id,
    name,
    email,
    phone,
    "rentals": count(*[_type == "bookedCar" && references(^._id)]),
    "totalSpent": (*[_type == "bookedCar" && references(^._id)].car_rent),
    "status": *[_type == "bookedCar" && references(^._id)]{
    pickup_date,
    dropoff_date,
    }
  }`);

  return customers.map((customer: any) => {
    const rentalStatuses = customer.status.map((rental: any) => {
      const status = getRentalStatus(rental.pickup_date, rental.dropoff_date);
      return status;
    });
    customer.status = rentalStatuses[0];
    return customer;
  });
}

export default async function CustomersPage() {
  const customers = await getCustomers();

  return <CustomersClient customers={customers} />;
}