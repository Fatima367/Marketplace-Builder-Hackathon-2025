import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { client } from "@/lib/sanity";
import { Car, CalendarRange } from "lucide-react";
import { BsCurrencyDollar } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";

async function getDashboardData() {
  const query = `{
    "totalCars": count(*[_type == "car"]),
    "bookings" : *[_type == "booking"] {
    total_amount,
    bookedCars[]->{car_name, pickup_date, dropoff_date},
    customer->{name}
  } | order(_createdAt desc)[0...5],
    "activeRentals": count(*[_type == "bookedCar"]),
    "totalCustomers": count(*[_type == "customer"]),
    "recentRentals": *[_type == "bookedCar"] | order(_createdAt desc)[0...5] {
      car_name,
      pickup_date,
      dropoff_date,
      car_rent,
      "customerName": customer->name
    },
    "popularCars": *[_type == "car"] | order(rentCount desc)[0...5] {
      name,
      category,
      rentPerDay,
      image
    }
  }`;

  const data = await client.fetch(query);

  const totalRevenue =
    data.bookings && data.bookings.length > 0
      ? data.bookings
          .reduce((total: number, booking: any) => {
            const amount = booking.total_amount
              ? parseFloat(booking.total_amount.replace("$", ""))
              : 0;
            return total + amount;
          }, 0)
          .toFixed(2)
      : "0.00";

  return {
    ...data,
    totalRevenue: `$${totalRevenue}`,
  };
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  const stats = [
    {
      name: "Total Cars",
      value: data.totalCars,
      icon: Car,
    },
    {
      name: "Active Rentals",
      value: data.activeRentals,
      icon: CalendarRange,
    },
    {
      name: "Total Customers",
      value: data.totalCustomers,
      icon: LuUsers,
    },
    {
      name: "Revenue",
      value: data.totalRevenue,
      icon: BsCurrencyDollar,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#90A3BF]">Dashboard Overview</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="dark:bg-gray-950">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium text-[#90A3BF]">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-6 w-6 text-[#90A3BF]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1A202C] dark:text-slate-200">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="dark:bg-gray-950">
          <CardHeader>
            <CardTitle className="dark:text-slate-300">
              Recent Rentals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentRentals.map((rental: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 border rounded-lg 
                  bg-[#fafafd] dark:bg-gray-800"
                >
                  <div>
                    <p className="font-medium">{rental.car_name}</p>
                    <p className="text-sm text-muted-foreground">
                      Rented by: {rental.customerName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{rental.car_rent}/day</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(rental.pickup_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-950">
          <CardHeader>
            <CardTitle className="dark:text-slate-300">Popular Cars</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.popularCars.map((car: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 border rounded-lg
                   bg-[#fafafd] dark:bg-gray-800"
                >
                  <div>
                    <p className="font-medium">{car.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {car.category}
                    </p>
                  </div>
                  <p className="font-medium">{car.rentPerDay}/day</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}