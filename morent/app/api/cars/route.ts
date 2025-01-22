import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import { NextResponse } from "next/server";

const POPULAR_CAR_QUERY = defineQuery(`*[ 
  _type == "car" && 
  "popular" in tags[] && defined(_id)
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
}|order(_createdAt)`);

const RECOMMENDATION_CAR_QUERY = defineQuery(`*[ 
  _type == "car" && 
  "recommended" in tags[] && defined(_id)
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
}|order(_createdAt)`);

export async function GET(req: Request, res: Response) {
  try {
    const popularCarList = await sanityFetch({ query: POPULAR_CAR_QUERY });

    const recommendedCarList = await sanityFetch({
      query: RECOMMENDATION_CAR_QUERY,
    });

    if (!popularCarList || !recommendedCarList) {
      return NextResponse.json({ message: "No cars found" }, { status: 404 });
    }

    // Return separate lists for popular and recommended cars
    return NextResponse.json(
      {
        message: "OK",
        popularCars: popularCarList,
        recommendedCars: recommendedCarList,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error, cars not found" },
      { status: 500 }
    );
  }
}