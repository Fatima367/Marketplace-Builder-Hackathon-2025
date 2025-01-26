export default {
  name: "booking",
  type: "document",
  title: "Bookings",
  fields: [
    {
      name: "order_date",
      type: "datetime",
      title: "Order Date",
    },
    {
      name: "customer",
      type: "reference",
      to: [{ type: "customer" }],
      title: "Customer",
    },
    {
      name: "items",
      title: "Booked Cars",
      type: "array",
      of: [{ type: "reference", to: [{ type: "bookedCar" }] }],
      description: "Array of cars that have been booked.",
    },
  ],
};