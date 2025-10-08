"use client"
import './style.css'
import React, { useEffect, useState } from 'react';
import { CalendarDays, Users, Mail, DollarSign, MessageSquare, MapPin, User, User2Icon, Phone, IndianRupee } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { BASE_URL } from '@/apis/api';
import { Button } from '@/components/ui/button';

const BookingsList = () => {
  const router = useRouter()

  const [bookings, setbookings] = useState([])
  const [message, setmessage] = useState("")

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/bookings`, {
        credentials: "include"
      });
      // console.log(response);

      if (response.status === 401) {
        router.push("/login");
      }
      else if (response.status === 404) {
        setmessage("No bookings found")
      }
      else {
        setmessage("")
        const data = await response.json();
        setbookings(data)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="py-16 ">
      <main className="flex-grow">
        {/* Header */}
        <section className="relative bg-blue-300 text-white py-24">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Your Bookings
              {/* <span className="block text-blue-200">Wanderlust & Wonder</span> */}
            </h1>
            <p className="text-xl text-red-50 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              For over two decades, we've been crafting extraordinary journeys that inspire,
              educate, and create lasting memories for travelers from around the globe.
            </p>
          </div>
        </section>

        {/* Bookings Grid */}
        {bookings?.length === 0 ? (
          <div className="text-center py-2">
            <CalendarDays size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookings found</h3>
            <p className="text-gray-500 mb-2">Start planning your next adventure!</p>
            <Link href="/tours">
              <Button className="bg-blue-600 hover:bg-blue-700">Browse Packages</Button>
            </Link>
          </div>
        ) : (
          <div className="p-4">
            {bookings?.map((booking, index) => (
              <div
                key={booking._id}
                className="transition-all duration-300 border-0  animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s`, boxShadow: '0 5px 18px rgba(102, 126, 234, 0.3)' }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="text-center text-2xl mb-2 font-bold ">
                        {booking.tourId.name}
                      </div>
                      <span className={`bg-green-100 text-green-800 border-green-200 text-sm font-medium px-2 py-1 rounded-sm`}>
                        Confirmed
                      </span>
                    </div>
                    {/* <div className="text-right">
                      <div className="text-2xl font-bold flex gap-1 items-center"><IndianRupee/> {booking.amount}</div>
                      <div className="text-blue-400 text-sm">Total Amount</div>
                    </div> */}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Customer Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className='px-2 '>
                        <User2Icon color='blue' />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{booking.name}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Mail size={14} />
                          {booking.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="text-blue-600" size={18} />
                      <span className="font-medium text-gray-700">Contact</span>
                    </div>
                    <p className="text-gray-900 font-semibold">
                      {booking.phone}
                    </p>
                  </div>

                  {/* Travel Dates */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CalendarDays className="text-blue-600" size={18} />
                      <span className="font-medium text-gray-700">Travel Period</span>
                    </div>
                    <p className="text-gray-900 font-semibold">
                      {(booking.start_date.split("T")[0])} to  {(booking.end_date.split("T")[0])}
                    </p>
                  </div>

                  {/* Travelers */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="text-blue-600" size={18} />
                      <span className="font-medium text-gray-700">Travelers</span>
                    </div>
                    <p className="text-gray-900 font-semibold">
                      {booking.adults} Adult{booking.adults !== 1 ? 's' : ''}
                      {booking.children > 0 && `, ${booking.children} Child${booking.children !== 1 ? 'ren' : ''}`}
                    </p>
                  </div>

                  {/* Address*/}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="text-blue-600" size={18} />
                      <span className="font-medium text-gray-700">Address</span>
                    </div>
                    <p className="text-gray-900 font-semibold">
                      {booking.address}
                      {booking.zipCode}
                      {booking.city}
                      {booking.country}
                    </p>
                  </div>

                  {/* Special Requests */}
                  {/* {booking.specialRequests && ( */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="text-blue-600" size={18} />
                      <span className="font-medium text-gray-700">Special Requests</span>
                    </div>
                    <p className="text-gray-900 text-sm leading-relaxed">
                      {booking.specialRequests}
                    </p>
                  </div>
                  {/* )} */}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <Button
                      variant='destructive'
                      size="sm"
                      onClick={() =>
                        router.push("/contact")
                      }
                    >
                      Request  Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BookingsList;
