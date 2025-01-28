export default {
  name: "booking",
  type: "document",
  title: "Bookings",
  fields: [
    {
      name: "order_date",
      type: "datetime",
      title: "Order Date",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "customer",
      type: "reference",
      to: [{ type: "customer" }],
      title: "Customer",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "bookedCars",
      title: "Booked Cars",
      type: "array",
      of: [{ type: "reference", to: [{ type: "bookedCar" }] }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "total_amount",
      type: "string",
      title: "Total Amount",
    },
  ],
};