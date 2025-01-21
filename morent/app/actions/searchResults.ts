import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export default async function SearchResults(debouncedQuery?: string) {
  if (!debouncedQuery || debouncedQuery.trim() === "") {
    // Return all cars when query is empty
    return await client.fetch(
      groq`*[_type == "car"]{
        _id,
        name,
        rentPerDay,
        slug,
        image {
          asset -> {
            url
          }
        }
      }`
    );
  }

  const query = `*${debouncedQuery}*`;
  return await client.fetch(
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
    { query } as any
  );
}
