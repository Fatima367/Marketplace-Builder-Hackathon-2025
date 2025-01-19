export const car = {
  name: "car",
  title: "Car",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Car Name",
      type: "string",
    },
    {
      name: "category",
      title: "Car Category",
      type: "string",
      description: "Type of the car (e.g., Sport, Sedan, SUV, etc.)",
    },
    {
      name: "image",
      title: "Car Image",
      type: "image",
      options: {
        hotspot: true /* hotspot for better image cropping */,
      },
    },
    {
      name: "mode",
      title: "Transmission Mode",
      type: "string",
      description: "Type of transmission (e.g., Manual, Automatic)",
    },
    {
      name: "capacity",
      title: "Seating Capacity",
      type: "string",
      description: "Number of seats (e.g., 2 People)",
    },
    {
      name: "fuel",
      title: "Fuel Capacity",
      type: "string",
      description: "Fuel capacity or battery capacity (e.g., 90L)",
    },
    {
      name: "rentPerDay",
      title: "Rent Per Day",
      type: "string",
      description: "Rental price per day",
    },
    {
      name: "originalPrice",
      type: "string",
      title: "Original Price",
      description: "Original price before discount (if applicable)",
    },
    {
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Tags for categorization (e.g., popular, recommended)",
    },
  ],
};
