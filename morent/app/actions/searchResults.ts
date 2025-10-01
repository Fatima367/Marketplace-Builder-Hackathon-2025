import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export default async function SearchResults(debouncedQuery?: string) {
  const query = debouncedQuery;

  try {
    const cars = await client.fetch(
      groq`*[ 
        _type == "car" &&
        name match $query
      ]{
        _id,
        name,
        rentPerDay,
        slug,
        image {
          asset -> {
            url
          }
        }
      }`,
      { query: `*${query}*` as any }
    );

    return cars;
  } catch (error) {
    console.log(error)
    return [];
  }
}
