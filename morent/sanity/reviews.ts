import { defineType } from "sanity";

const reviews = defineType({
  type: "object",
  name: "reviews",
  title: "Reviews",
  fields: [
    {
      name: "username",
      type: "string",
      title: "Username",
    },
    {
      name: "text",
      type: "string",
      title: "Comment Text",
    },
    {
      name: "date",
      type: "datetime",
      title: "Date Posted",
    },
    {
      name: "carSlug",
      type: "string",
      title: "Car Slug",
    },
  ],
});

export default reviews;