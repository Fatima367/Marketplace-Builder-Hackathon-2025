import { type SchemaTypeDefinition } from "sanity";
import { car } from "../cars";
import reviews from "../reviews";
import customer from "../customer";
import booking from "../booking";
import bookedCar from "../bookedCar";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [car, reviews, customer, booking, bookedCar],
};
