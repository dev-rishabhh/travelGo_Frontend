"use client"
import { useEffect, useState } from "react";
import { Check, ChevronRight, Calendar, IndianRupee, MapPin } from "lucide-react";
import { Button } from "../../components/ui/button";
import AvailabilityForm from "@/components/AvailibilityForm";
import ProgressBar from "@/components/ProgressBar";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/apis/api";
import Link from "next/link";

// import { loadStripe } from '@stripe/stripe-js';


export default function BookingPage() {

   const router = useRouter()

  const [Tours, setTours] = useState(null)
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [selectedApartment, setSelectedApartment] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    specialRequests: "",
    // amount: "",
    // paymentMethod: "credit-card",
    // cardName: "",
    // cardNumber: "",
    // cardExpiry: "",
    // cardCvc: "",
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  //Fetching  Tour Data
  async function getData() {
    const response = await fetch(`${BASE_URL}/tours`)
    const data = await response.json()
    setTours(data)
  }


  useEffect(() => {
    getData()
  }, [])


  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // handle payment
  async function handleConfirmation() {

    // Payment gateway Integration
    // console.log("Payment sucessful");
    // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    // const response = await fetch(`${BASE_URL}/bookings/create-checkout-session`, {
    //   method: "POST",
    //   body: JSON.stringify({ selectedApartment }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   credentials: "include"
    // });
    // const session = await response.json();

    // save to database
    const allformData = new FormData();
    // formData.amount=selectedApartment.price
    allformData.append('formData', formData);
    const slectedApartmentId = selectedApartment._id

    // In a real app, this would send the booking data to a server

    try {
      const response = await fetch(`${BASE_URL}/bookings`, {
        method: "POST",
        body: JSON.stringify({ formData, startDate, endDate, adults, children, slectedApartmentId }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });

      const data = await response.json();

      if (data.status===401) {
        return router.push("/login")
      }
      if (data.error) {
        console.log(data.error);
        // Show error below the email field (e.g., "Email already exists")
        // setServerError(data.error);
      } else {
        setCurrentStep(4);
        console.log("Booking submitted:", {
          apartment: selectedApartment,
          dates: { startDate, endDate },
          guests: { adults, children },
          customerInfo: formData
        });
        
        // Reset form after booking is confirmed
        setTimeout(() => {
          setCurrentStep(1);
          setSelectedApartment([]);
          setStartDate(new Date().toISOString().split('T')[0]);
          setEndDate(new Date().toISOString().split('T')[0]);
          setAdults("2");
          setChildren("0");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            zipCode: "",
            country: "",
            specialRequests: "",
            // amount: "",
            // paymentMethod: "credit-card",
            // cardName: "",
            // cardNumber: "",
            // cardExpiry: "",
            // cardCvc: "",
          });
        }, 5000);
      }
    } catch (error) {
      console.error("Error:", error);
      // setServerError("Something went wrong. Please try again.");
    }

    // const result = stripe.redirectToCheckout({
    //   sessionId: session.id
    // });

    // if (result.error) {
    //   console.log(result.error);
    // }
  }

  return (
    <div className="min-h-screen flex flex-col  ">

      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="relative bg-blue-300 text-white py-24">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Book Your Stay
              {/* <span className="block text-blue-200">Wanderlust & Wonder</span> */}
            </h1>
            <p className="text-xl text-red-50 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              For over two decades, we've been crafting extraordinary journeys that inspire,
              educate, and create lasting memories for travelers from around the globe.
            </p>
          </div>
        </section>
        {/* Booking Steps */}
        <section className="container p-8 m-auto">
          <ProgressBar currentStep={currentStep} />

          {/* Step 1: Choose Room */}
          {currentStep === 1 && (
            <div className="animate-fade-in [animation-delay:300ms]">
              <div className="max-w-4xl mx-auto">
                {/* Date and Guests Selection */}
                <div className="glass-card p-6 mb-8">
                  <AvailabilityForm
                    title="Select Dates and Guest"
                    availibility={false}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    adults={adults}
                    setAdults={setAdults}
                    children={children}
                    setChildren={setChildren}
                  />
                </div>

                {/* Apartments Selection */}
                <h2 className="text-xl font-semibold mb-4">Select Your Desired Package</h2>
                <div className="space-y-6">
                  {Tours?.map((apartment) => (
                    <div
                      key={apartment._id}
                      className={
                        `rounded-xl border-[1px] hover:border-blue-400 border-gray-200  md:flex-row flex flex-col overflow-hidden ",
                         ${selectedApartment?._id === apartment._id
                          ? "shadow-md"
                          : "border-border hover:border-primary/50"
                        }`}>
                      <div className="md:w-1/3 h-48 md:h-auto relative">
                        <img
                          src={apartment.banner}
                          alt={apartment.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{apartment.name}</h3>
                          <div className="flex items-center gap-1 text-muted-foreground mb-2">
                            <MapPin size={"16px"} />
                            <p className="">{apartment.destination}</p>
                          </div>
                          <p className="text-muted-foreground mb-4">{apartment.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {apartment.features.map((feature, idx) =>
                              <div key={idx} className="text-sm bg-gray-200 px-3 py-1 rounded-full">
                                {feature}
                              </div>
                            )}
                          </div>
                          <div className=" flex gap-2   text-sm px-3 py-1 rounded-full">
                            <Calendar size={"16px"} />
                            {apartment.duration} Days
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div>
                            <span className="text-xl flex font-bold">
                              <IndianRupee />
                              {apartment.price}</span>
                          </div>
                          <Button
                            variant={selectedApartment._id === apartment._id ? "default" : "outline"}
                            onClick={() => setSelectedApartment(apartment)}

                          >
                            {selectedApartment?._id === apartment._id ? (
                              <>
                                <Check className="mr-2 h-4 w-4" />
                                Selected
                              </>
                            ) : (
                              "Select"
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-8">
                  <Button
                    className="btn-primary"
                    disabled={selectedApartment.length === 0}
                    onClick={() => setCurrentStep(2)}
                  >
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Guest Details */}
          {currentStep === 2 && (
            <div className="animate-fade-in [animation-delay:300ms]">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Guest Information Form */}
                  <div className="md:col-span-2">
                    <h2 className="text-xl font-semibold mb-4">Guest Information</h2>
                    <form className="space-y-6">
                      <div className="glass-card p-6 space-y-6 shadow rounded-2xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-[8px]">
                            <label htmlFor="firstName">First Name</label>
                            <input
                              className="py-2 px-4 outline-blue-500 border-gray-500 border-[1px] rounded-sm bg-gray-100"
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-[8px]">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                              id="lastName"
                              name="lastName"
                              className="py-2 px-4 outline-blue-500 border-gray-500 border-[1px] rounded-sm bg-gray-100"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-[8px]">
                            <label htmlFor="email">Email</label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              className="py-2 px-4 outline-blue-500 border-gray-500 border-[1px] rounded-sm bg-gray-100"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-[8px]">
                            <label htmlFor="phone">Phone</label>
                            <input
                              id="phone"
                              name="phone"
                              className="py-2 px-4 outline-blue-500 border-gray-500 border-[1px] rounded-sm bg-gray-100"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1">
                          <label htmlFor="address">Address</label>
                          <input
                            id="address"
                            className="py-2 px-4 outline-blue-500 border-gray-500 border-[1px] rounded-sm bg-gray-100"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-[8px]">
                            <label htmlFor="city">City</label>
                            <input
                              className="py-2 px-4 outline-blue-500 border-gray-500 border-[1px] rounded-sm bg-gray-100"
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-[8px]">
                            <label htmlFor="country">Country</label>
                            <input
                              id="country"
                              className="py-2 px-4 outline-blue-500 border-gray-500 border-[1px] rounded-sm bg-gray-100"
                              name="country"
                              value={formData.country}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="specialRequests">Special Requests</label>
                          <textarea
                            id="specialRequests"
                            name="specialRequests"
                            value={formData.specialRequests}
                            onChange={handleInputChange}
                            className="w-full h-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Any special requests or notes for your stay"
                          />
                        </div>
                      </div>

                    </form>
                  </div>

                  {/* Booking Summary */}
                  <div className="md:col-span-1">
                    <h2 className="text-xl text-center font-semibold mb-4">Booking Summary</h2>
                    <div className="shadow p-6 sticky top-24">
                      {selectedApartment && (
                        <>
                          <div className="pb-4 border-b">
                            <h3 className="font-medium mb-1">{selectedApartment.name}</h3>
                            <p className="text-sm text-muted-foreground">{selectedApartment.location}</p>
                          </div>

                          <div className="py-4 border-b space-y-2">
                            <div className="flex justify-between items-center">
                              <span>Check-in</span>
                              <span className="font-medium">
                                {startDate ? startDate : "Not selected"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Check-out</span>
                              <span className="font-medium">
                                {endDate ? endDate : "Not selected"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Guests</span>
                              <span className="font-medium">
                                {adults} {parseInt(adults) === 1 ? "Adult" : "Adults"}
                                {parseInt(children) > 0 && `, ${children} ${parseInt(children) === 1 ? "Child" : "Children"}`}
                              </span>
                            </div>
                          </div>

                          <div className="py-4 border-b space-y-2">
                            <div className="flex justify-between items-center">
                              <span>
                                Price
                              </span>
                              <span className="font-medium flex items-center"><IndianRupee size={"14px"} />{selectedApartment.price}</span>
                            </div>
                          </div>

                          <div className="pt-4">
                            <div className="flex justify-between items-center font-bold">
                              <span>Total</span>
                              <div className="flex items-center">
                                <IndianRupee size={"14px"} />
                                {selectedApartment.price}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    className="btn-primary"
                    onClick={() => setCurrentStep(3)}
                  >
                    Review <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="animate-fade-in [animation-delay:300ms]">
              <div className="max-w-4xl mx-auto">
                <>
                  <h2 className="text-xl font-semibold mb-6">Review Booking Details</h2>

                  <div className="glass-card p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Apartment Details */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">Package Details</h3>
                        {selectedApartment && (
                          <div className="space-y-4">
                            <div className="rounded-lg overflow-hidden">
                              <img
                                src={selectedApartment.banner}
                                alt={selectedApartment.name}
                                className="w-full h-48 object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold">{selectedApartment.name}</h4>
                              <p className="text-sm text-muted-foreground">{selectedApartment.location}</p>
                            </div>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>Check-in:</span>
                                <span className="font-medium">
                                  {startDate ? startDate : "Not selected"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Check-out:</span>
                                <span className="font-medium">
                                  {endDate ? endDate : "Not selected"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Guests:</span>
                                <span className="font-medium">
                                  {adults} {parseInt(adults) === 1 ? "Adult" : "Adults"}
                                  {parseInt(children) > 0 && `, ${children} ${parseInt(children) === 1 ? "Child" : "Children"}`}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Guest Details */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">Guest Details</h3>
                        <div className="space-y-4">
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Name:</span>
                              <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Email:</span>
                              <span className="font-medium">{formData.email}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Phone:</span>
                              <span className="font-medium">{formData.phone}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Address:</span>
                              <span className="font-medium">{formData.address}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>City:</span>
                              <span className="font-medium">{formData.city}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Country:</span>
                              <span className="font-medium">{formData.country}</span>
                            </div>
                          </div>

                          {formData.specialRequests && (
                            <div>
                              <h4 className="font-medium mb-1">Special Requests:</h4>
                              <p className="text-sm text-muted-foreground">{formData.specialRequests}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="glass-card p-6 mb-8">
                    <h3 className="text-lg font-medium mb-4">Price Summary</h3>
                    <div className="space-y-2">
                      {selectedApartment && (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="">
                              Tour Package Price
                            </span>
                            <div className="flex items-center">
                              <IndianRupee size={"14px"} />
                              {selectedApartment.price}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="">
                              Additional Charges
                            </span>
                            <div className="flex items-center">
                              <IndianRupee size={"14px"} />
                              0
                            </div>
                          </div>
                          <div className="flex justify-between items-center pt-4 border-t mt-4">
                            <span className="font-semibold">Total</span>
                            <div className="flex items-center">
                              <IndianRupee size={"14px"} />
                              {selectedApartment.price}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="mb-8">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="terms"
                        className="mt-1 mr-3"
                      />
                      <label htmlFor="terms" className="text-sm text-muted-foreground">
                        I agree to the
                        <Link href="terms-and-conditions " className="text-primary underline px-2">Terms and Conditions</Link>
                        and
                        <Link href="privacy-policy" className="text-primary underline px-2 ">Privacy Policy</Link>.
                        I understand that my booking is subject to the property's cancellation policy.
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                    >
                      Back
                    </Button>
                    <Button
                      className="btn-primary"
                      onClick={()=>{
                        handleConfirmation()
                      }

                      }
                    >
                      Confirm <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>

                  </div>
                </>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation  */}
          {
            currentStep === 4 && (
              <div className="p-14">
                <div className="glass-card p-8 text-center animate-fade-in">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Booking Request Confirmed!</h2>
                  <p className="text-muted-foreground mb-6">
                    Your reservation has been successfully confirmed.
                  </p>
                  <p className="font-medium mb-8">
                    Booking Reference: <span className="text-primary">MRS-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
                  </p>
                  <Button varient="primary">
                    <Link href="/">Return to Homepage</Link>
                  </Button>
                </div>
              </div>
            )
          }

        </section>
      </main>
    </div>
  )
}