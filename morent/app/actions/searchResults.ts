import { client } from "@/sanity/lib/client"; 
import { groq } from "next-sanity";

// Fetch the cars based on the search query (debounced query)
export default function SearchResults(debouncedQuery?: string) {
  // If no query is provided, return all cars
  const query = debouncedQuery ? debouncedQuery : "";

  // GROQ query to fetch cars that match the search query
  return client.fetch(
    groq`*[
      _type == "car" &&
      name match $query
    ]{
      _id,
      name,
      rentPerDay,
      originalPrice,
      capacity,
      mode,
      fuel,
      category,
      slug,
      image {
        asset -> {
          _id,
          url
        }
      },
      _createdAt,
      _updatedAt
    }`,
    { query: `*${query}*` as any} // Use wildcards to search for cars that contain the query string
  );
}
