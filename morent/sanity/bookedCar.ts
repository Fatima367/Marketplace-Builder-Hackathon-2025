export default {
  name: "bookedCar",
  title: "Booked Car",
  type: "document",
  fields: [
    {
      name: "car_name",
      title: "Car Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "car_rent",
      title: "Car Rent",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "total_rent",
      title: "Total Rent",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "pickup_location",
      title: "Pickup Location",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "dropoff_location",
      title: "Drop-off Location",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "pickup_date",
      title: "Pickup Date",
      type: "datetime", // Changed from date to datetime
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "dropoff_date",
      title: "Drop-off Date",
      type: "datetime", // Changed from date to datetime
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "pickup_time",
      title: "Pickup Time",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "dropoff_time",
      title: "Drop-off Time",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "customer",
      type: "reference",
      to: [{ type: "customer" }],
      title: "Customer",
    },
  ],
};