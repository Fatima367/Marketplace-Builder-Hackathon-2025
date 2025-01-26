import { client } from "@/sanity/lib/client";

const CreateCustomer = async (customerInfo: any) => {
  try {
    const customer = {
      _type: "customer",
      name: customerInfo.name,
      phone: customerInfo.phone,
      address: customerInfo.address,
      townCity: customerInfo.townCity,
      bookedCars: [],
    };

    const response = await client.create(customer);
    return response;
  } catch (error) {
    console.error("Error creating customer in Sanity:", error);
    throw new Error(`CreateCustomer failed: ${error}`);
  }
};

// Function to create a booking in Sanity
const CreateBooking = async (carData: any[], customer_id: string) => {
  try {
    console.log(
      "Creating booking with car data:",
      carData,
      "and client ID:",
      customer_id
    ); // Debug
    const booking = {
      _type: "booking",
      customer: {
        _type: "reference",
        _ref: customer_id,
      },
      items: carData.map((item) => {
        const carKey = item._id || `car_${Date.now()}`;
        return {
          _type: "bookedCar",
          _key: carKey,
          car_name: item.name,
          car_rent: item.rentPerDay,
          pickup_location: item.pickupLocation,
          dropoff_location: item.dropoffLocation,
          pickup_date: item.pickupDate,
          dropoff_date: item.dropoffDate,
          pickup_time: item.pickupTime,
          dropoff_time: item.dropoffTime,
        };
      }),
      order_date: new Date().toISOString(),
    };

    const response = await client.create(booking);
    return response;
  } catch (error) {
    console.error("Error creating booking in Sanity:", error);
    throw new Error(`CreateBooking failed: ${error}`);
  }
};

export default async function CheckOut(rentalData: any) {
  try {
    const customer = await CreateCustomer(rentalData.customerInfo);

    await CreateBooking(rentalData.carData, customer._id);

    console.log("Checkout completed successfully");
  } catch (error) {
    console.error("Error during checkout process:", error);
    throw error;
  }
}