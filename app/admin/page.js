"use client"
import { useEffect, useState } from 'react';
import { Users, Calendar, Phone, User } from 'lucide-react';
import { useRouter } from "next/navigation";
import { BASE_URL } from '@/apis/api';
import { Button } from '@/components/ui/button';

const AdminPage = () => {
  const router = useRouter()

  const [bookings, setbookings] = useState([])
  const [selectedBooking, setSelectedBooking] = useState()
  const [isclicked, setIsClicked] = useState(false)
  

  const stats = [
    {
      name: 'Total Bookings',
      value: bookings.length.toString(),
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'Confirmed',
      value: bookings.length.toString(),
      icon: Calendar,
      color: 'bg-green-500'
    },
    {
      name: 'Total Revenue',
      value: `INR ${bookings.reduce((sum, b) => sum + b.amount, 0).toFixed(2)}`,
      icon: User,
      color: 'bg-purple-500'
    }
  ];

  async function fetchUser() {
    try {
      const response = await fetch(`${BASE_URL}/admin`, {
        credentials: "include",
      });
      
      if (!response.ok) {
        return router.push("/")
      }

      const data = await response.json();
      setbookings(data)
      
    } catch (err) {
      console.error("Error fetching user info:", err);
    }
  }

  const handleClick = (booking) => {
    setSelectedBooking(booking)
    setIsClicked(true)
  }
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="px-4 m-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Bookings Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all bookings including their details and status.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`${stat.color} rounded-md p-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">{stat.name}</dt>
                    <dd className="text-lg font-medium text-gray-900">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bookings Table */}
      {!isclicked ? (<div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Booking ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Tour ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings?.map((booking,idx) => (
                    <tr
                      key={booking._id}
                      onClick={() => handleClick(booking)}
                      className="hover:bg-gray-50 transition-colors cursor-pointer duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{idx+1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                            <div className="text-sm text-gray-500">Email: {booking.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.tourId.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 }`}>
                          confirmed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        INR {booking.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <div className='px-6 py-4 '>
          <h2 className='text-center text-4xl font-bold p-4'> Tour Details</h2>
          <div className='border-[1px] border-gray-300 rounded-lg'>
            <div className='grid grid-cols-1 sm:grid-cols-2 px-3 py-2 gap-3'>
              <div className='py-2 border-[1px] border-gray-300 rounded-lg px-3'>
                <h4 className='text-gray-600'>Name</h4>
                <p>{selectedBooking.name}</p>
              </div>
              <div className='py-2 border-[1px] border-gray-300 rounded-lg px-3'>
                <h4 className='text-gray-600'>Email</h4>
                <p>{selectedBooking.email}</p>
              </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 px-3 py-2 gap-3'>
              <div className='py-2 border-[1px] border-gray-300 rounded-lg px-3'>
                <h4 className='text-gray-600'>Adults</h4>
                <p>{selectedBooking.adults} Adult{selectedBooking.adults !== 1 ? 's' : ''}</p>
              </div>
              <div className='py-2 border-[1px] border-gray-300 rounded-lg px-3'>
                <h4 className='text-gray-600'>Children</h4>
                <p>  {selectedBooking.children > 0 && ` ${selectedBooking.children} Child${selectedBooking.children !== 1 ? 'ren' : ''}`}</p>
              </div>
            </div>
            <div className='m-2 px-3 py-2 border-[1px] border-gray-300 rounded-lg'>
              <h4 className='text-gray-600'>Tour Name</h4>
              <p>{selectedBooking.tourId.name}</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 px-3 py-2 gap-3'>
              <div className='py-2 border-[1px] border-gray-300 rounded-lg px-3 '>
                <h4 className='text-gray-600'>Start Date</h4>
                <p>{selectedBooking.start_date.split("T")[0]}</p>
              </div>
              <div className='py-2 border-[1px] border-gray-300 rounded-lg px-3'>
                <h4 className='text-gray-600'>End Date</h4>
                <p>{selectedBooking.end_date.split("T")[0]}</p>
              </div>
            </div>
            <div className='m-2 px-3 py-2 border-[1px] border-gray-300 rounded-lg'>
              <h4 className='text-gray-600'>Phone</h4>
              <p>{selectedBooking.phone}</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 px-3 py-2 gap-3'>
              <div className='py-2 border-[1px] border-gray-300 rounded-lg px-3'>
                <h4 className='text-gray-600'>Amount</h4>
                <p>{selectedBooking.amount}</p>

              </div>
              <div className='py-2 border-[1px] border-gray-300 rounded-lg px-3'>
                <h4 className='text-gray-600'>City</h4>
                <p>{selectedBooking.city}</p>
              </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 px-3 py-2 gap-3 '>
              <div className='py-2 border-[1px] border-gray-300 rounded-lg px-3'>
                <h4 className='text-gray-600'>Zip Code</h4>
                <p>{selectedBooking.zipCode}</p>
              </div>
              <div className='py-2 border-[1px] border-gray-300 rounded-lg px-3'>
                <h4 className='text-gray-600'>Country</h4>
                <p>{selectedBooking.country}</p>
              </div>
            </div>
            <div className='m-2 px-3 py-2 border-[1px] border-gray-300 rounded-lg'>
              <h4 className='text-gray-600'>Address</h4>
              <p>{selectedBooking.address}</p>
            </div>
            <div className='m-2 px-3 py-2 border-[1px] border-gray-300 rounded-lg'>
              <h4 className='text-gray-600'>Special Request</h4>
              <p>{selectedBooking.specialRequests}</p>
            </div>
          </div>
          <Button
            varient="primary"
            className='px-3 py-2 my-2'
            onClick={() => setIsClicked(false)}
          >
            Okay
          </Button>
        </div>
      )
      }
    </div>
  );
};

export default AdminPage