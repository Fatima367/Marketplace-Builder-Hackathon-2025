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
    {
      name: "rating",
      type: "number",
      title: "Rating",
      validation: (Rule) => Rule.required().min(1).max(5),
    },
    {
      name: "profileImage",
      type: "image",
      title: "Profile Image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "occupation",
      type: "string",
      title: "Occupation",
    },
  ],
});

export default reviews;