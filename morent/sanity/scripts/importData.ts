import Car from "@/lib/types";
import sanityClient from "@sanity/client";
import axios from "axios";

//PROVIDED API URL
const CAR_API_URL =
  "https://sanity-nextjs-application.vercel.app/api/hackathon/template7";

// Initializing Sanity client
const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  token: process.env.SANITY_API_KEY,
  useCdn: false, //CDN disabled to always get the freshest data
});

// Fetching the car data from the API using async/await and try-catch
const fetchCarData = async (): Promise<Car[]> => {
  try {
    const response = await axios.get(CAR_API_URL); // Axios request
    return response.data; // Return car data
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw error; // Rethrow the error so it can be handled later
  }
};

// To upload an image to Sanity and get its reference
const uploadImageToSanity = async (imageUrl: string) => {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data, "binary");

    // Upload the image to Sanity
    const uploadedImage = await client.assets.upload("image", imageBuffer, {
      filename: imageUrl.split("/").pop(), // Use the file name from the URL
    });

    return uploadedImage._id; // Return the asset reference ID
  } catch (error) {
    console.error("Error uploading image to Sanity:", error);
    throw error;
  }
};

// Function to generate a slug based on name and _id
const generateSlug = (name: string, id: string) => {
  const slugifiedName = name.trim().replace(/\s+/g, "-").toLowerCase();
  return `${id}-${slugifiedName}`;
};

// Transform the data into the format expected by Sanity
const transformCarData = async (car: Car) => {
  const imageRef = await uploadImageToSanity(car.image_url); // Upload image and get the reference
  const carId = car.id ? String(car.id) : "unknown";

  const slug = generateSlug(car.name, carId); // Generate the slug

  return {
    _type: "car", // The document type in Sanity (Schema)
    name: car.name,
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: imageRef, // Use the reference of the uploaded image
      },
    },
    category: car.type,
    capacity: car.seating_capacity,
    fuel: car.fuel_capacity,
    rentPerDay: car.price_per_day,
    originalPrice: car.originalPrice || null,
    mode: car.transmission,
    tags: car.tags,
    slug: {
      _type: "slug", // Ensure the slug type matches the schema
      current: slug,
    },
    _id: carId, // Car _id from API as the Sanity document _id
  };
};

// Main function to sync data using async/await and try-catch
const syncCarsToSanity = async () => {
  try {
    console.log("Fetching car data from API...");
    const carData = await fetchCarData(); // Fetch data from the API
    const transformedData = await Promise.all(carData.map(transformCarData)); // Transform each car into Sanity format
    console.log(`Fetched ${carData.length} cars`);

    // Use async/await in a for loop to sync each car to Sanity
    for (const car of transformedData) {
      try {
        await client.createOrReplace(car); // Wait for each document to be created or replaced
      } catch (error) {
        console.error("Error writing car data to Sanity:", error);
      }
    }

    console.log("All car data has been synced to Sanity!");
  } catch (error) {
    console.error("Error syncing car data:", error);
  }
};

// Run the sync function
syncCarsToSanity();