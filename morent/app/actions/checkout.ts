import { client } from "@/sanity/lib/client";
import { v4 as uuidv4 } from "uuid";

const createCustomer = async (customerInfo: any) => {
  try {
    const existingCustomer = await client.fetch(
      `*[_type == "customer" && phone == $phone][0]`,
      {
        phone: customerInfo.phone,
      }
    );

    if (existingCustomer) {
      return existingCustomer;
    }

    const customer = await client.create({
      _type: "customer",
      name: customerInfo.name,
      phone: customerInfo.phone,
      address: customerInfo.address,
      townCity: customerInfo.townCity,
      bookings: [],
    });

    return customer;
  } catch (error) {
    console.error("Error creating/finding customer:", error);
    throw new Error(`Customer creation failed: ${error}`);
  }
};

const calculateTotalRent = (carData: any) => {
  const pickupDate = new Date(carData.pickupDate);
  const dropoffDate = new Date(carData.dropoffDate);

  const diffTime = Math.abs(dropoffDate.getTime() - pickupDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const numberOfDays = Math.max(1, diffDays);

  const rentPerDay = Number.parseFloat(carData.rentPerDay.replace("$", ""));
  const totalRent = (rentPerDay * numberOfDays).toFixed(2);

  return `$${totalRent}`;
};

const createBookedCar = async (carData: any, customer: any) => {
  try {
    const totalRent = calculateTotalRent(carData);

    const bookedCar = await client.create({
      _type: "bookedCar",
      car_name: carData.name,
      car_rent: carData.rentPerDay,
      total_rent: totalRent,
      pickup_location: carData.pickupLocation,
      dropoff_location: carData.dropoffLocation,
      pickup_date: carData.pickupDate,
      dropoff_date: carData.dropoffDate,
      pickup_time: carData.pickupTime,
      dropoff_time: carData.dropoffTime,
      customer: {
        _type: "reference",
        _ref: customer._id,
      },
    });

    return { ...bookedCar, total_rent: totalRent };
  } catch (error) {
    console.error("Error creating booked car:", error);
    throw new Error(`Booked car creation failed: ${error}`);
  }
};

export default async function CheckOut(rentalData: any) {
  try {
    const customer = await createCustomer(rentalData.customerInfo);

    const bookedCarsPromises = rentalData.carData.map((car: any) =>
      createBookedCar(car, customer)
    );
    const bookedCars = await Promise.all(bookedCarsPromises);

    const totalAmount = bookedCars
      .reduce((total, car) => {
        const amount = Number.parseFloat(car.total_rent.replace("$", ""));
        return total + amount;
      }, 0)
      .toFixed(2);

    const booking = await client.create({
      _type: "booking",
      order_date: new Date().toISOString(),
      customer: {
        _type: "reference",
        _ref: customer._id,
      },
      bookedCars: bookedCars.map((car) => ({
        _type: "reference",
        _ref: car._id,
        _key: uuidv4(),
      })),
      total_amount: `$${totalAmount}`,
    });

    // Append the new booking to the customer's bookings array
    await client
      .patch(customer._id)
      .setIfMissing({ bookings: [] })
      .append("bookings", [
        {
          _type: "reference",
          _ref: booking._id,
          _key: uuidv4(),
        },
      ])
      .commit();

    console.log("Checkout completed successfully");
    return { success: true, booking };
  } catch (error) {
    console.error("Error during checkout process:", error);
    throw error;
  }
}