import { client } from "@/lib/sanity";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Function to fetch rentals
async function getRentals() {
  const query = `*[_type == "bookedCar"] | order(_createdAt desc) {
    _id,
    car_name,
    car_rent,
    pickup_location,
    dropoff_location,
    pickup_date,
    dropoff_date,
    "customer": customer->name,
    _createdAt
  }`;

  return client.fetch(query);
}

export default async function RentalsPage() {
  const rentals = await getRentals();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Rentals</h1>

      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Car</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Pickup</TableHead>
              <TableHead>Dropoff</TableHead>
              <TableHead>Rent/Day</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rentals.map((rental: any) => (
              <TableRow key={rental._id}>
                <TableCell>{rental.car_name}</TableCell>
                <TableCell>{rental.customer}</TableCell>
                <TableCell>
                  <div>{rental.pickup_location}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(rental.pickup_date).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div>{rental.dropoff_location}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(rental.dropoff_date).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>{rental.car_rent}</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">Active</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}