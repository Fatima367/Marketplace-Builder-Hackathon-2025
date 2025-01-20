import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

const POPULAR_CAR_QUERY = defineQuery(`*[
  _type == "car"
  && "popular" in tags[] && defined(_id)
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
}|order(_createdAt desc)`);

const { data: popularCarList } = await sanityFetch({
  query: POPULAR_CAR_QUERY,
});

const popularCars = popularCarList;

const RECOMMENDATION_CAR_QUERY = defineQuery(`*[
  _type == "car"
  && "recommended" in tags[] && defined(_id)
]{
  _id,
  name,
  rentPerDay,
  originalPrice,
  capacity,
  mode,
  fuel,
  category,
  image {
    asset -> {
      _id,
      url
    }
  },
  _createdAt,
  _updatedAt
}|order(_createdAt desc)`);

const { data: recommendedCarList } = await sanityFetch({
  query: RECOMMENDATION_CAR_QUERY,
});

export const recommendedCars = recommendedCarList;

export default popularCars;