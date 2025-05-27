import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { fetchPlaces } from "./pickNdrop-form";
import CheckOut from "../actions/checkout";
import ReactDatePicker from "react-datepicker";
import Image from "next/image";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

export default function BookingForm() {
  const [carBooked, setCarBooked] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    townCity: "",
  });
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState<any[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<any[]>([]);
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState<string>("");
  const [dropoffDate, setDropoffDate] = useState<Date | null>(null);
  const [dropoffTime, setDropoffTime] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    cardHolder: "",
    cvc: "",
  });

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleLocationChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setLocation: React.Dispatch<React.SetStateAction<string>>,
    setSuggestions: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    const location = e.target.value;
    setLocation(location);
    if (location.length > 2) {
      const places = await fetchPlaces(location);
      setSuggestions(places);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (
    suggestion: any,
    setLocation: React.Dispatch<React.SetStateAction<string>>,
    setSuggestions: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    setLocation(suggestion.label);
    setSuggestions([]);
  };

  const searchParams = useSearchParams();
  const carName = searchParams.get("carName");
  const rentPerDay = searchParams.get("rentPerDay");
  const imageUrl = searchParams.get("imageUrl");
  const totalPrice = searchParams.get("totalPrice");

  const carData = [
    {
      name: carName,
      rentPerDay,
      imageUrl,
      totalPrice,
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleRentNow = async () => {
    if (
      !customerInfo.name ||
      !customerInfo.phone ||
      !customerInfo.address ||
      !customerInfo.townCity
    ) {
      alert("Please complete all customer information fields.");
      return;
    }

    if (!pickupDate || !dropoffDate || !pickupTime || !dropoffTime) {
      alert("Please complete all rental date and time fields.");
      return;
    }

    if (!pickupLocation || !dropoffLocation) {
      alert("Please select both pickup and drop-off locations.");
      return;
    }

    if (paymentMethod === "creditCard") {
      if (
        !paymentDetails.cardNumber ||
        !paymentDetails.expirationDate ||
        !paymentDetails.cardHolder ||
        !paymentDetails.cvc
      ) {
        alert("Please provide valid payment details for the Credit Card.");
        return;
      }
    }

    if (paymentMethod === "paypal") {
      return;
    }

    if (paymentMethod === "bitcoin") {
      return;
    }

    try {
      const rentalData = {
        carData: carData.map((car) => ({
          ...car,
          pickupLocation,
          dropoffLocation,
          pickupDate: pickupDate.toISOString(),
          dropoffDate: dropoffDate.toISOString(),
          pickupTime,
          dropoffTime,
        })),
        customerInfo,
        paymentDetails,
        paymentMethod,
      };

      await CheckOut(rentalData);
      setCarBooked(true);
    } catch (error) {
      console.log("Error during checkout:", error);
      alert("An error occurred while processing your booking.");
    }
  };

  return (
    <div
      className="flex flex-col items-start mx-auto my-8 sm:w-full lg:w-[45rem]
        space-y-8"
    >
      {/*Step 1*/}
      <div
        className="bg-white p-6 mx-auto rounded-lg
            w-80 md:w-full lg:min-w-[45rem]"
      >
        <div className="flex items-start justify-between">
          <div className="flex flex-col text-left">
            <p className="text-xl font-bold text-[#1A202C] text-left lg:mt-0">
              Billing Info
            </p>
            <p className="mt-2 font-medium text-sm text-[#90A3BF] text-left">
              Please enter your billing info
            </p>
          </div>
          <p className="font-medium text-sm text-[#90A3BF] text-right lg:mt-8">
            Step 1 of 4
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-4 mt-8">
          <div className="flex flex-col text-left space-y-4">
            <p className="text-base font-semibold text-[#1A202C]">Name</p>

            <div
              className="rounded-lg w-full md:min-w-[20rem] lg:min-w-[20rem] h-14 bg-[#F6F7F9] my-8
                             flex items-stretch justify-between relative"
            >
              <input
                type="text"
                name="name"
                value={customerInfo.name}
                onChange={handleInputChange}
                className="absolute bg-transparent w-56 md:w-full lg:w-80 h-14
                    placeholder:text-sm placeholder:text-[#90A3BF] placeholder:font-medium 
                    ml-7 border-0 border-transparent focus-visible:outline-none focus-visible:ring-0"
                placeholder="Your name"
              />
            </div>
          </div>

          <div className="flex flex-col text-left space-y-4">
            <p className="text-base font-semibold text-[#1A202C]">
              Phone Number
            </p>

            <div
              className="rounded-lg w-full lg:min-w-[20rem] h-14 bg-[#F6F7F9] my-8
                             flex items-stretch justify-between relative"
            >
              <input
                type="text"
                name="phone"
                value={customerInfo.phone}
                onChange={handleInputChange}
                className="absolute bg-transparent lg:w-80 w-56 md:w-full h-14
                    placeholder:text-sm placeholder:text-[#90A3BF] placeholder:font-medium 
                    ml-7 border-0 border-transparent focus-visible:outline-none focus-visible:ring-0"
                placeholder="Phone number"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-4 mt-8">
          <div className="flex flex-col text-left space-y-4">
            <p className="text-base font-semibold text-[#1A202C]">Address</p>

            <div
              className="rounded-lg w-full md:min-w-[20rem] lg:min-w-[20rem] h-14 bg-[#F6F7F9] my-8
                             flex items-stretch justify-between relative"
            >
              <input
                name="address"
                value={customerInfo.address}
                onChange={handleInputChange}
                type="text"
                className="absolute bg-transparent lg:w-80 w-56 md:w-full h-14
                    placeholder:text-sm placeholder:text-[#90A3BF] placeholder:font-medium 
                    ml-7 border-0 border-transparent focus-visible:outline-none focus-visible:ring-0"
                placeholder="Address"
              />
            </div>
          </div>

          <div className="flex flex-col text-left space-y-4">
            <p className="text-base font-semibold text-[#1A202C]">Town/City</p>

            <div
              className="rounded-lg w-full md:min-w-[20rem] lg:min-w-[20rem] h-14 bg-[#F6F7F9] my-8
                             flex items-stretch justify-between relative"
            >
              <input
                name="townCity"
                value={customerInfo.townCity}
                onChange={handleInputChange}
                type="text"
                className="absolute bg-transparent lg:w-80 w-56 md:w-full h-14
                     placeholder:text-sm placeholder:text-[#90A3BF] placeholder:font-medium 
                     ml-7 border-0 border-transparent focus-visible:outline-none focus-visible:ring-0"
                placeholder="Town or city"
              />
            </div>
          </div>
        </div>
      </div>

      {/*Step 2*/}
      <div
        className="bg-white p-6 mt-8 mx-auto rounded-lg
             w-80 md:w-full lg:min-w-[45rem]"
      >
        <div className=" flex items-start justify-between">
          <div className="flex flex-col">
            <p className="text-xl font-bold text-[#1A202C] text-left">
              Rental Info
            </p>
            <p className="mt-2 font-medium text-sm text-[#90A3BF] text-left">
              Please select your rental date
            </p>
          </div>
          <p className="font-medium text-sm text-[#90A3BF] text-right lg:mt-8">
            Step 2 of 4
          </p>
        </div>

        <div className="flex space-x-2 items-center mt-8 text-left justify-start">
          <div className="rounded-full h-2 w-2 bg-[#3563E9] ring-4 ring-[#3563E9] ring-opacity-30"></div>
          <h3 className="text-base font-medium text-[#1A202C]">Pick-Up</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-4 mt-8">
          <div className="flex flex-col text-left space-y-4">
            <p className="text-base font-semibold text-[#1A202C]">Locations</p>

            <div
              className="rounded-lg w-full lg:min-w-[20rem] h-14 bg-[#F6F7F9] my-8
                            flex items-center justify-start relative pl-5"
            >
              <input
                value={pickupLocation}
                onChange={(e) =>
                  handleLocationChange(
                    e,
                    setPickupLocation,
                    setPickupSuggestions
                  )
                }
                placeholder="Select your location"
                className="absolute bg-transparent w-[15rem] md:w-auto lg:min-w-[18rem] h-14
                              text-sm text-[#90A3BF] selection:font-medium border-0 border-transparent 
                               focus-visible:outline-none focus-visible:ring-0"
              />
              {pickupSuggestions.length > 0 && (
                <ul
                role="listbox"
                className="absolute lg:top-16 lg:left-0 bg-[#F6F7F9] shadow-md 
                rounded-2xl w-full max-h-40 overflow-y-auto z-30 md:top-16 md:left-0
                top-16 left-0"
                >
                  {pickupSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      role="option"
                      tabIndex={0}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() =>
                        handleSuggestionClick(
                          suggestion,
                          setPickupLocation,
                          setPickupSuggestions
                        )
                      }
                      onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault(); // Prevent scrolling
                        handleSuggestionClick(
                          suggestion,
                          setPickupLocation,
                          setPickupSuggestions
                        );
                      }
                    }}
                    >
                      {suggestion.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex flex-col text-left space-y-4">
            <p className="text-base font-semibold text-[#1A202C]">Date</p>

            <div
              className="rounded-lg w-full lg:min-w-[20rem] h-14 bg-[#F6F7F9] my-8
                     flex items-center justify-start relative pl-5"
            >
              <ReactDatePicker
                selected={pickupDate}
                onChange={(date) => setPickupDate(date)}
                dateFormat="MM/dd/yyyy"
                className="bg-transparent w-[15rem] md:w-auto lg:min-w-[18rem]
                     text-sm text-[#90A3BF] placeholder:text-[#90A3BF] font-medium border-0
                     focus:outline-none focus:ring-0"
                placeholderText="Select your date"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-4 mt-8">
          <div className="flex flex-col text-left space-y-4">
            <p className="text-base font-semibold text-[#1A202C]">Time</p>

            <div
              className="rounded-lg w-full lg:min-w-[20rem] h-14 bg-[#F6F7F9] my-8
                            flex items-center justify-start relative pl-5"
            >
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="absolute bg-transparent w-[15rem] md:w-auto lg:min-w-[18rem] h-14
                               text-sm text-[#90A3BF] selection:font-medium border-0 border-transparent 
                               focus-visible:outline-none focus-visible:ring-0"
              />
            </div>
          </div>
        </div>

        <div className="flex space-x-2 items-center mt-8 text-left justify-start">
          <div className="rounded-full h-2 w-2 bg-[#3563E9] ring-4 ring-[#5CAFFC] ring-opacity-30"></div>
          <h3 className="text-base font-medium text-[#1A202C]">Drop-Off</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-4 mt-8">
          <div className="flex flex-col text-left space-y-4">
            <p className="text-base font-semibold text-[#1A202C]">Locations</p>

            <div
              className="rounded-lg w-full lg:min-w-[20rem] h-14 bg-[#F6F7F9] my-8
                             flex items-center justify-start relative pl-5"
            >
              <input
                value={dropoffLocation}
                onChange={(e) =>
                  handleLocationChange(
                    e,
                    setDropoffLocation,
                    setDropoffSuggestions
                  )
                }
                placeholder="Select your location"
                className="absolute bg-transparent w-[15rem] md:w-auto lg:min-w-[18rem] h-14
                               text-sm text-[#90A3BF] selection:font-medium border-0 border-transparent 
                               focus-visible:outline-none focus-visible:ring-0"
              />
              {dropoffSuggestions.length > 0 && (
                <ul
                role="listbox"
                className="absolute lg:top-16 lg:left-0 bg-[#F6F7F9] shadow-md 
                rounded-2xl w-full max-h-40 overflow-y-auto z-30 md:top-16 md:left-0
                top-16 left-0"
                >
                  {dropoffSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      role="option"
                      tabIndex={0}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() =>
                        handleSuggestionClick(
                          suggestion,
                          setDropoffLocation,
                          setDropoffSuggestions
                        )
                      }
                      onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSuggestionClick(
                          suggestion,
                          setDropoffLocation,
                          setDropoffSuggestions
                        );
                      }
                    }}
                    >
                      {suggestion.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex flex-col text-left space-y-4">
            <p className="text-base font-semibold text-[#1A202C]">Date</p>

            <div
              className="rounded-lg w-full lg:min-w-[20rem] h-14 bg-[#F6F7F9] my-8
                            flex items-center justify-start relative pl-5"
            >
              <ReactDatePicker
                selected={dropoffDate}
                onChange={(date) => setDropoffDate(date)}
                dateFormat="MM/dd/yyyy"
                className=" bg-transparent w-[15rem] md:w-auto lg:min-w-[18rem]
                               text-sm text-[#90A3BF] selection:font-medium border-0 border-transparent
                               focus-visible:outline-none focus-visible:ring-0"
                placeholderText="Select your date"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-4 mt-8">
          <div className="flex flex-col text-left space-y-4">
            <p className="text-base font-semibold text-[#1A202C]">Time</p>

            <div
              className="rounded-lg w-full lg:min-w-[20rem] h-14 bg-[#F6F7F9] my-8
                  flex items-center justify-start relative pl-5"
            >
              <input
                type="time"
                value={dropoffTime}
                onChange={(e) => setDropoffTime(e.target.value)}
                className="absolute bg-transparent w-[15rem] md:w-auto lg:min-w-[18rem] h-14
                       text-sm text-[#90A3BF] selection:font-medium 
                  border-0 border-transparent focus-visible:outline-none focus-visible:ring-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/*Step 3*/}
      <div
        className="bg-white p-6 mt-8 mx-auto rounded-lg 
             w-80 md:w-full lg:min-w-[45rem]"
      >
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <p className="text-xl font-bold text-[#1A202C] text-left">
              Payment Method
            </p>
            <p className="mt-2 font-medium text-sm text-[#90A3BF] text-left">
              Please enter your payment method
            </p>
          </div>
          <p className="font-medium text-sm text-[#90A3BF] text-right lg:mt-8">
            Step 3 of 4
          </p>
        </div>

        <div className="bg-[#F6F7F9] p-6 rounded-lg mt-8 lg:w-full md:w-full w-[17rem]">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2 items-center text-left justify-start">
              <input
                type="radio"
                name="paymentMethod"
                className="h-5 w-5 rounded-full"
                onChange={() => handlePaymentMethodChange("creditCard")}
                checked={paymentMethod === "creditCard"}
              />
              <h3 className="text-base font-medium text-[#1A202C]">
                Credit Card
              </h3>
            </div>
            <div className="flex space-x-3">
              <Image src="/images/visa.png" width={48} height={16} alt="Visa" />
              <Image
                src="/images/mc.png"
                width={32}
                height={20}
                alt="Master-Card"
              />
            </div>
          </div>
          {paymentMethod === "creditCard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-4 mt-8">
              <div className="flex flex-col text-left space-y-4">
                <p className="text-base font-semibold text-[#1A202C]">
                  Card Number
                </p>

                <div
                  className="rounded-lg w-full lg:min-w-[19rem] h-14 bg-white my-8
     flex items-center justify-between relative"
                >
                  <input
                    type="text"
                    className="absolute bg-transparent w-[15rem] md:w-full lg:w-72 h-14
       placeholder:text-sm placeholder:text-[#90A3BF] placeholder:font-medium 
       ml-7 border-0 border-transparent focus-visible:outline-none focus-visible:ring-0"
                    placeholder="Card number"
                    name="cardNumber"
                    value={paymentDetails.cardNumber}
                    onChange={handlePaymentInputChange}
                  />
                </div>
              </div>

              <div className="flex flex-col text-left space-y-4">
                <p className="text-base font-semibold text-[#1A202C]">
                  Expration Date
                </p>

                <div
                  className="rounded-lg w-full lg:min-w-[19rem] h-14 bg-white my-8
     flex items-center justify-between relative"
                >
                  <input
                    type="text"
                    name="expirationDate"
                    value={paymentDetails.expirationDate}
                    onChange={handlePaymentInputChange}
                    className="absolute bg-transparent w-[15rem] md:w-full lg:w-72 h-14
       placeholder:text-sm placeholder:text-[#90A3BF] placeholder:font-medium 
       ml-7 border-0 border-transparent focus-visible:outline-none focus-visible:ring-0"
                    placeholder="DD/MM/YY"
                  />
                </div>
              </div>
            </div>
          )}
          {paymentMethod === "creditCard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-4 mt-8">
              <div className="flex flex-col text-left space-y-4">
                <p className="text-base font-semibold text-[#1A202C]">
                  Card Holder
                </p>

                <div
                  className="rounded-lg w-full lg:min-w-[19rem] h-14 bg-white my-8
                   flex items-center justify-between relative"
                >
                  <input
                    type="text"
                    name="cardHolder"
                    value={paymentDetails.cardHolder}
                    onChange={handlePaymentInputChange}
                    className="absolute bg-transparent w-[15rem] md:w-full lg:w-72 h-14
                      placeholder:text-sm placeholder:text-[#90A3BF] placeholder:font-medium 
                      ml-7 border-0 border-transparent focus-visible:outline-none focus-visible:ring-0"
                    placeholder="Card holder"
                  />
                </div>
              </div>

              <div className="flex flex-col text-left space-y-4">
                <p className="text-base font-semibold text-[#1A202C]">CVC</p>

                <div
                  className="rounded-lg w-full lg:min-w-[19rem] h-14 bg-white my-8
     flex items-center justify-between relative"
                >
                  <input
                    type="text"
                    name="cvc"
                    value={paymentDetails.cvc}
                    onChange={handlePaymentInputChange}
                    className="absolute bg-transparent w-[15rem] md:w-full lg:w-72 h-14
       placeholder:text-sm placeholder:text-[#90A3BF] placeholder:font-medium 
       ml-7 border-0 border-transparent focus-visible:outline-none focus-visible:ring-0"
                    placeholder="CVC"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-6 mt-6">
          <div
            className="flex items-center justify-between bg-[#F6F7F9] rounded-lg
                            h-14 w-full"
          >
            <div className="flex items-center justify-center lg:ml-10 ml-5">
              <input
                type="radio"
                name="paymentMethod"
                className="h-6 w-6 rounded-full"
                onChange={() => handlePaymentMethodChange("paypal")}
                checked={paymentMethod === "paypal"}
              />
              <p className="text-sm text-[#1F2544] font-semibold lg:ml-5 ml-2">
                Paypal
              </p>
            </div>
            <Image
              src="/images/PayPal.png"
              height={24}
              width={100}
              alt="Paypal"
              className="lg:mr-10 mr-5"
            />
          </div>

          <div
            className="flex items-center justify-between bg-[#F6F7F9] rounded-lg
                            h-14 w-full"
          >
            <div className="flex items-center justify-center lg:ml-10 ml-5">
              <input
                type="radio"
                name="paymentMethod"
                className="h-6 w-6 rounded-full"
                onChange={() => handlePaymentMethodChange("bitcoin")}
                checked={paymentMethod === "bitcoin"}
              />
              <p className="text-sm text-[#1F2544] font-semibold lg:ml-5 ml-2">
                Bitcoin
              </p>
            </div>
            <Image
              src="/images/Bitcoin.png"
              height={20}
              width={94}
              alt="Bitcoin"
              className="lg:mr-10 mr-5"
            />
          </div>
        </div>
      </div>

      {/*Step 4*/}
      <div
        className="bg-white p-6 mx-auto rounded-lg 
             w-80 md:w-full lg:min-w-[45rem]"
      >
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <p className="text-xl font-bold text-[#1A202C] text-left">
              Confirmation
            </p>
            <p className="mt-2 font-medium text-sm text-[#90A3BF] text-left">
              We are getting to the end. Just few clicks and your rental is
              ready!
            </p>
          </div>
          <p className="font-medium text-sm text-[#90A3BF] text-right lg:mt-8">
            Step 4 of 4
          </p>
        </div>

        <div className="flex flex-col space-y-6 mt-8">
          <div
            className="flex items-center justify-start bg-[#F6F7F9] rounded-lg
                lg:h-14 h-16 w-full"
          >
            <Checkbox className="h-6 w-6 lg:ml-10 ml-6" required />
            <p
              className="lg:text-sm text-[11px] text-[#1F2544] font-semibold 
                lg:ml-5 ml-2"
            >
              I agree with sending an Marketing and newsletter emails. No spam,
              promissed!
            </p>
          </div>

          <div
            className="flex items-center justify-start bg-[#F6F7F9] rounded-lg
                lg:h-14 h-16 w-full"
          >
            <Checkbox className="h-6 w-6 lg:ml-10 ml-6" required />
            <p
              className="lg:text-sm text-[11px] text-[#1F2544] font-semibold 
                lg:ml-5 ml-2"
            >
              I agree with our terms and conditions and privacy policy.
            </p>
          </div>
        </div>
        <Link href="#">
          <button
            onClick={handleRentNow}
            className="mt-8 text-base font-medium text-center gap-2
                     text-white bg-[#3563E9] rounded-lg h-14 w-36 hover:bg-blue-800"
          >
            Rent Now
          </button>
        </Link>

        <div className="flex flex-col space-y-4 my-8">
          <Image
            src="/images/ic-security-safety.png"
            height={32}
            width={32}
            alt="safety-icon"
          />
          <p className="text-base text-[#1A202C] font-semibold">
            All your data are safe
          </p>
          <p className="text-sm text-[#90A3BF]">
            We are using the most advanced security to provide you the best
            experience ever.
          </p>
        </div>
      </div>
      {carBooked && (
        <div>
          <div
            className="w-full min-h-screen bg-black bg-opacity-50 flex lg:top-32 
          items-center justify-center absolute left-0 lg:z-20 z-20 top-0 "
          >
            <div
              className="bg-white p-6 rounded-lg shadow-md text-center lg:w-1/3 w-full
              flex items-center justify-center lg:mx-0 mx-5 md:w-2/3"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  Car Booked Successfully!
                  <MdCheckCircle className="ml-2 text-green-500 h-8 w-8" />
                </h2>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg text-base
                  hover:bg-blue-700"
                  onClick={() => setCarBooked(!carBooked)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}