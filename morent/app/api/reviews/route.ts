import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);
  const slug = pathname.split("/").pop(); // Extracts the slug from the URL path

  if (!slug) {
    return NextResponse.json(
      { error: "Car slug is required" },
      { status: 400 }
    );
  }

  try {
    const query = `*[_type == "reviews" && carSlug == $slug] | order(date asc)`;
    const reviews = await client.fetch(query, { slug });

    if (reviews.length === 0) {
      return NextResponse.json(
        { message: "No reviews found" },
        { status: 404 }
      );
    }

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  // Validate required fields
  if (!body.username || !body.text || !body.rating || !body.carSlug) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const newReview = {
    _type: "reviews",
    username: body.username,
    text: body.text,
    rating: body.rating,
    date: new Date().toISOString(),
    carSlug: body.carSlug,
    profileImage: body.profileImage || "/images/default-profile.png", // Fallback UI
    occupation: body.occupation || "Unknown", // Fallback UI
  };

  try {
    const createdReview = await client.create(newReview);
    return NextResponse.json(createdReview, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}