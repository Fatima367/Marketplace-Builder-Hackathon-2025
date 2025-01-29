import { client } from "@/lib/sanity";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Function to fetch customers with their rental history
async function getCustomers() {
  const query = `*[_type == "customer"] {
    _id,
    name,
    email,
    phone,
    "rentals": count(*[_type == "bookedCar" && references(^._id)])
  }`;

  return client.fetch(query);
}

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Customers</h1>

      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Total Rentals</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer: any) => (
              <TableRow key={customer._id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.rentals}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}