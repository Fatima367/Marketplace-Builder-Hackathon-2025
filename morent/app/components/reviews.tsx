"use client";
import React, { useState, useEffect } from "react";
import { SignedIn, useUser } from "@clerk/nextjs";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

export default function Reviews({ slug }: any) {
  const [reviews, setReviews] = useState([]); // Ensure reviews is initialized as an array
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [username, setUsername] = useState("");
  const [occupation, setOccupation] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [showAll, setShowAll] = useState(false); //Show all reviews toggle
  const { user } = useUser(); // signed-in user's information

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews?slug=${slug}`);
        const data = await response.json();

        // Ensure data is an array before setting the state
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          console.error("Expected an array but received:", data);
          setReviews([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setReviews([]);
      }
    };
    fetchReviews();
  }, [slug]);

  const uploadImageToSanity = async (imageUrl: string) => {
    try {
      const response = profileImage;
      const imageBuffer = Buffer.from(profileImage, "binary");

      const uploadedImage = await client.assets.upload("image", imageBuffer, {
        filename: imageUrl.split("/").pop(), // Use the file name from the URL
      });

      return uploadedImage._id;
    } catch (error) {
      console.error("Error uploading image to Sanity:", error);
      throw error;
    }
  };

  const handleReviewSubmit = async () => {
    if (!reviewText || rating === 0) return;

    const newReview = {
      username: user ? user.firstName : username,
      occupation: occupation,
      profileImage: profileImage,
      text: reviewText,
      rating,
      date: new Date().toISOString(),
      carSlug: slug,
    };

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        const data = await response.json();
        setReviews([data, ...reviews]);
        setUsername("");
        setReviewText("");
        setRating(0);
        setOccupation("");
        setProfileImage(null);
      } else {
        console.log("Failed to post review:", response.statusText);
      }
    } catch (error) {
      console.log("Error posting review:", error);
    }
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    } else {
      setProfileImage(null);
    }
  };

  return (
    <div className="bg-white lg:h-auto rounded-lg p-6 h-auto lg:mt-0 mt-6 relative flex-shrink-0 lg:flex-shrink w-80 md:w-full lg:w-[100%]">
      <div className="space-x-3 flex">
        <p className="text-xl font-semibold text-[#1A202C]">Reviews</p>
        <button className="px-5 space-x-2 rounded text-white bg-[#3563E9] text-sm font-bold">
          {reviews.length || 0}{" "}
          {/* Display number of reviews or fallback to 0 */}
        </button>
      </div>

      {reviews.length === 0 ? (
        <div className="mt-4 text-center">
          <p className="text-gray-500">No reviews yet</p>
          <button
            onClick={() => setShowAll(true)}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add a Review
          </button>
        </div>
      ) : (
        reviews.slice(0, showAll ? reviews.length : 2).map((review: any) => (
          <div
            key={review._id}
            className="flex mt-6 items-start relative shadow-sm rounded-2xl"
          >
            <Image
              src={review.profileImage || "/images/profileiconloggedout.png"}
              height={56}
              width={56}
              alt="Profile-Image"
              className="lg:w-14 lg:h-14 h-[46px] w-[46px]"
            />
            <div className="flex flex-col lg:ml-4 ml-[14px]">
              <div className="flex items-stretch justify-between">
                <div className="flex flex-col space-y-2 text-left">
                  <p className="lg:text-xl text-lg font-bold text-[#1A202C]">
                    {review.username}
                  </p>
                  <p className="text-sm text-[#90A3BF] font-medium">
                    {review.occupation}
                  </p>
                </div>

                <div className="flex flex-col space-y-2 text-right lg:right-2 absolute right-0">
                  <p className="lg:text-sm text-[13px] text-[#90A3BF] font-medium">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`${
                          i < review.rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        } text-xl`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 mb-2">
                <p className="text-left lg:text-base text-[#596780] text-sm relative">
                  {review.text}
                </p>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Show All Reviews */}
      {reviews.length > 0 && (
        <div className="flex items-center justify-center mx-auto mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-6 rounded px-5 space-x-2 h-11 text-base font-medium text-[#90A3BF] flex items-center justify-center"
          >
            {showAll ? "Show Less" : "Show All"}
            {showAll ? (
              <ChevronUp className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2" />
            )}
          </button>
        </div>
      )}

      {/* Review Form for Signed-In Users */}
      {showAll && (
        <SignedIn>
          <div className="mt-6">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write a review..."
              className="w-full h-24 p-3 border rounded-lg"
              required
            />
            <input
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              placeholder="Your Occupation (Job Title)"
              className="w-full p-3 border rounded-lg mt-3"
            />
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full p-3 border rounded-lg mt-3"
            />
            <div className="flex items-center mt-3">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`cursor-pointer text-xl ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
                  onClick={() => setRating(i + 1)}
                >
                  ★
                </span>
              ))}
            </div>
            <button
              onClick={handleReviewSubmit}
              className="mt-3 px-6 py-2 bg-blue-500 text-white rounded-lg"
            >
              Submit Review
            </button>
          </div>
        </SignedIn>
      )}

      {/* Review Form for SignedOut Users */}
      {!user && showAll && (
        <div className="mt-6">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="text"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            placeholder="Your Occupation (Job Title)"
            className="w-full p-3 border rounded-lg mt-3"
          />
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write a review..."
            className="w-full h-24 p-3 border rounded-lg mt-3"
            required
          />
          {/* Profile Image Upload */}
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full p-3 border rounded-lg mt-3"
          />
          <div className="flex items-center mt-3">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`cursor-pointer text-xl ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
                onClick={() => setRating(i + 1)}
              >
                ★
              </span>
            ))}
          </div>
          <button
            onClick={handleReviewSubmit}
            className="mt-3 px-6 py-2 bg-blue-500 text-white rounded-lg"
          >
            Submit Review
          </button>
        </div>
      )}
    </div>
  );
}