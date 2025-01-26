export default {
  name: "customer",
  type: "document",
  title: "Customers",
  fields: [
    { name: "name", type: "string", title: "Name" },
    { name: "phone", type: "string", title: "Phone" },
    { name: "address", type: "string", title: "Address" },
    { name: "townCity", type: "string", title: "Town/City" },
    {
      name: "bookedCars",
      title: "Booked Cars",
      type: "array",
      of: [{ type: "reference", to: [{ type: "bookedCar" }] }],
      description: "Array of cars that the customer has booked.",
    },
  ],
};