//Car Schema
const car = defineType({
  name: "car",
  type: "document",
  fields: [
    { name: "name", type: "string", title: "Name" },
    { name: "type", type: "string", title: "Type" },
    { name: "rent_per_day", type: "number", title: "Rent Per Day" },
    { name: "image", type: "image", title: "Image" },
    { name: "mode", type: "string", title: "Mode" },
    { name: "fuel", type: "string", title: "Fuel" },
    { name: "capacity", type: "string", title: "Capacity" },
  ],
});

//Client Schema
{
  /*
client.create({
 _type: "client"
 name: cleintDetails.name
 contactNo: clientDetails.contactNo
 email: clientDetails.email
 address: clientDetails.address
 cityTown: clientDetails.cityTown
 bookedCar: {
 _type: "refernce"
 _ref: cars._id
             }
})
*/
}

//Booking Schema
{
  /*
client.create(
{
_type:"booking",
customer:{
_type:"reference",
_ref:client_id
}
 car:carDetail.map((car)=>(
 {
  _type:"cars",
  _id : car._id,
  name:car.name,
  rent:car.rent_per_day,
 }
 )),
booking_date:new Date().toISOString()
bookingDetails: formData.map((item)=>
{
pickupLocation: item.pickup
dropoffLocation: item.dropoff
doDateTime: item.dropoffDateTime
puDateTime: item.pickupDateTime
})
})

*/
}
