"use client"
import React, { useState, useEffect } from 'react';
import './AdminPanel.css'
import { BASE_URL } from '@/apis/api';
import { useRouter } from "next/navigation";

const AdminPanel = () => {
  const router = useRouter()

  const [bookings, setbookings] = useState()

  async function fetchUser() {
    try {
      const response = await fetch(`${BASE_URL}/admin`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setbookings(data)
      }
      else {
        return router.push("/")
      }
    } catch (err) {
      console.error("Error fetching user info:", err);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      {bookings &&
        <div className='admin-container'>
          {/* booking table */}
          <div className="table-container">
            <h2>All Bookings</h2>
            <table>
              <thead>
                <tr>
                  <th>_id</th>
                  <th>userId</th>
                  <th>tourId</th>
                  <th>name</th>
                  <th>aadhar</th>
                  <th>phone</th>
                  <th>person</th>
                  <th>booking_date</th>
                  <th>tour_date</th>
                  <th>__v</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.userId}</td>
                    <td>{item.tourId}</td>
                    <td>{item.name}</td>
                    <td>{item.aadhar}</td>
                    <td>{item.phone}</td>
                    <td>{item.person}</td>
                    <td>{new Date(item.booking_date).toLocaleString()}</td>
                    <td>{new Date(item.tour_date).toLocaleDateString()}</td>
                    <td>{item.__v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  );
};


export default AdminPanel;
