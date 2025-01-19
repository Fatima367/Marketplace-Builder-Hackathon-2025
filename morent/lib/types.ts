// Define the car data interface to match your schema
export default interface Car {
  id: string;
  name: string;
  type: string;
  image_url: string; // This should be a URL for now
  transmission: string;
  seating_capacity: string;
  fuel_capacity: string;
  price_per_day: string;
  originalPrice: string;
  tags: [];
}

export type CarListProps = {
  cars: Car[];
  carCardsNo: number; // The number of cars to show (this can be passed as a prop)
};
