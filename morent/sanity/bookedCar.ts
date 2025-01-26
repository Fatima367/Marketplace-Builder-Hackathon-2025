export default {
  name: "bookedCar",
  title: "Booked Car",
  type: "document",
  fields: [
    {
      name: "car_name",
      title: "Car Name",
      type: "string",
      description: "The name of the car being booked.",
    },
    {
      name: "car_rent",
      title: "Car Rent",
      type: "string",
      description: "Rental price per day or the cost of the car.",
    },
    {
      name: "pickup_location",
      title: "Pickup Location",
      type: "string",
      description: "The location where the car will be picked up.",
    },
    {
      name: "dropoff_location",
      title: "Drop-off Location",
      type: "string",
      description: "The location where the car will be returned.",
    },
    {
      name: "pickup_date",
      title: "Pickup Date",
      type: "datetime",
      description: "The date and time when the car will be picked up.",
    },
    {
      name: "dropoff_date",
      title: "Drop-off Date",
      type: "datetime",
      description: "The date and time when the car will be returned.",
    },
    {
      name: "pickup_time",
      title: "Pickup Time",
      type: "string",
      description: "Time of car pickup.",
    },
    {
      name: "dropoff_time",
      title: "Drop-off Time",
      type: "string",
      description: "Time of car drop-off.",
    },
    {
      name: "customer",
      title: "Customer",
      type: "reference",
      to: [{ type: "customer" }],
      description: "Reference to the customer who booked the car.",
    },
    {
      name: "order_date",
      title: "Order Date",
      type: "datetime",
      description: "The date when the booking was made.",
    },
  ],
};