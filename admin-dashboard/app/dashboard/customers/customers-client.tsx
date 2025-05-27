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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";

function CustomerDetails({ customer }: Readonly<{ customer: any }>) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-sm dark:text-gray-200">Name</h4>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            {customer.name}
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm dark:text-gray-200">Phone</h4>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            {customer.phone}
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm dark:text-gray-200">
            Total Rentals
          </h4>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            {customer.rentals}
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm dark:text-gray-200">
            Total Spent
          </h4>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            {customer.totalSpent}
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm dark:text-gray-200">
            Payment Methods
          </h4>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            {customer.paymentMethods?.join(", ") || "Credit Card"}
          </p>
        </div>
      </div>
    </div>
  );
}

interface CustomersClientProps {
  customers: any[];
}

export function CustomersClient({ customers }: CustomersClientProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const filteredCustomers = customers.filter((customer) => {
    const customerStatus = customer.status || "completed";

    const matchesSearch = customer.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      customerStatus.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#1A202C] dark:text-gray-200">
        Customers
      </h1>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 dark:bg-secondary dark:text-gray-200 bg-white dark:bg-gray-700"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] dark:bg-gray-700 dark:text-gray-200 bg-white">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-700">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg bg-white dark:bg-secondary">
        <Table className="dark:bg-gray-800">
          <TableHeader>
            <TableRow>
              <TableHead className="dark:text-gray-400">Name</TableHead>
              <TableHead className="dark:text-gray-400">Phone</TableHead>
              <TableHead className="dark:text-gray-400">
                Total Rentals
              </TableHead>
              <TableHead className="dark:text-gray-400">Total Spent</TableHead>
              <TableHead className="dark:text-gray-400">Status</TableHead>
              <TableHead className="dark:text-gray-400">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer._id}>
                <TableCell className="dark:text-gray-300">
                  {customer.name}
                </TableCell>
                <TableCell className="dark:text-gray-300">
                  {customer.phone}
                </TableCell>
                <TableCell className="dark:text-gray-300">
                  {customer.rentals}
                </TableCell>
                <TableCell className="dark:text-gray-300">
                  {customer.totalSpent}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      customer.status === "active"
                        ? "bg-green-500"
                        : customer.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-slate-400"
                    }
                  >
                    {customer.status || "completed"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => setSelectedCustomer(customer)}
                    variant="default"
                    size="icon"
                    className="bg-blue-500 hover:bg-blue-700 w-16 h-7"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!selectedCustomer}
        onOpenChange={() => setSelectedCustomer(null)}
      >
        <DialogContent className="dark:bg-secondary">
          <DialogHeader>
            <DialogTitle className="dark:text-gray-200">
              Customer Details
            </DialogTitle>
          </DialogHeader>
          {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}