import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "Car slug is required" },
      { status: 400 }
    );
  }

  const query = `*[_type == "reviews" && carSlug == $slug] | order(date asc)`;
  const reviews = await client.fetch(query, { slug });

  return NextResponse.json(reviews);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.username || !body.text || !body.carSlug) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const newReview = {
    _type: "comment",
    username: body.username,
    text: body.text,
    carSlug: body.carSlug,
    date: new Date().toISOString(),
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