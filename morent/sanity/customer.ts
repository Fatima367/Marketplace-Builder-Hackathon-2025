export default {
  name: "customer",
  type: "document",
  title: "Customers",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "phone",
      type: "string",
      title: "Phone",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "address",
      type: "string",
      title: "Address",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "townCity",
      type: "string",
      title: "Town/City",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "bookings",
      title: "Bookings",
      type: "array",
      of: [{ type: "reference", to: [{ type: "booking" }] }],
    },
  ],
};