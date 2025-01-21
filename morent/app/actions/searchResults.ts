import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export default async function SearchResults(debouncedQuery?: string) {
  const query = debouncedQuery ? debouncedQuery : "";

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

    console.log("Search results:", cars); // Log results
    return cars;
  } catch (error) {
    console.error("Search error:", error); // Log errors
    return [];
  }
}
