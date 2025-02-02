"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RentalsClientProps {
  rentals: any[];
}

function getRentalStatus(pickupDate: string, dropoffDate: string) {
  const now = new Date();
  const pickup = new Date(pickupDate);
  const dropoff = new Date(dropoffDate);

  if (now < pickup) return "pending";
  if (now > dropoff) return "completed";
  return "active";
}

function RentalDetails({ rental }: { rental: any }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-sm dark:text-gray-200">
            Car Details
          </h4>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            {rental.car_name}
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm dark:text-gray-200">Customer</h4>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            {rental.customer}
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm dark:text-gray-200">Pickup</h4>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            {rental.pickup_location}
            <br />
            {new Date(rental.pickup_date).toLocaleString()}
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm dark:text-gray-200">Dropoff</h4>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            {rental.dropoff_location}
            <br />
            {new Date(rental.dropoff_date).toLocaleString()}
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm dark:text-gray-200">
            Payment Method
          </h4>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            {rental.payment_method || "Credit Card"}
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm dark:text-gray-200">
            Daily Rate
          </h4>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            {rental.car_rent}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RentalsClient({ rentals }: RentalsClientProps) {
  const [selectedRental, setSelectedRental] = useState<any>(null);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#1A202C] dark:text-gray-200">
        Rentals
      </h1>

      <div className="border rounded-lg bg-white dark:bg-secondary">
        <Table className="dark:bg-gray-800">
          <TableHeader>
            <TableRow>
              <TableHead className="dark:text-gray-400">Car</TableHead>
              <TableHead className="dark:text-gray-400">Customer</TableHead>
              <TableHead className="dark:text-gray-400">Pickup</TableHead>
              <TableHead className="dark:text-gray-400">Dropoff</TableHead>
              <TableHead className="dark:text-gray-400">Rent/Day</TableHead>
              <TableHead className="dark:text-gray-400">Status</TableHead>
              <TableHead className="dark:text-gray-400">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rentals.map((rental: any) => {
              const status = getRentalStatus(
                rental.pickup_date,
                rental.dropoff_date
              );
              return (
                <TableRow key={rental._id}>
                  <TableCell className="dark:text-gray-300">
                    {rental.car_name}
                  </TableCell>
                  <TableCell className="dark:text-gray-300">
                    {rental.customer}
                  </TableCell>
                  <TableCell>
                    <div className="dark:text-gray-300">
                      {rental.pickup_location}
                    </div>
                    <div className="text-sm text-muted-foreground dark:text-gray-400">
                      {new Date(rental.pickup_date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="dark:text-gray-300">
                      {rental.dropoff_location}
                    </div>
                    <div className="text-sm text-muted-foreground dark:text-gray-400">
                      {new Date(rental.dropoff_date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="dark:text-gray-300">
                    {rental.car_rent}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        status === "active"
                          ? "bg-green-500"
                          : status === "pending"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                      }
                    >
                      {status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => setSelectedRental(rental)}
                      variant="default"
                      size="icon"
                      className="bg-blue-500 hover:bg-blue-700 w-16 h-7"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!selectedRental}
        onOpenChange={() => setSelectedRental(null)}
      >
        <DialogContent className="dark:bg-secondary">
          <DialogHeader>
            <DialogTitle className="dark:text-gray-200">
              Rental Details
            </DialogTitle>
          </DialogHeader>
          {selectedRental && <RentalDetails rental={selectedRental} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}