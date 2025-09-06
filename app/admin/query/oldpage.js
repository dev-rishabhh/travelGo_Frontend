"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import './AdminPanel.css'
import { BASE_URL } from '@/apis/api';

const AdminQuery = () => {
    const router = useRouter()
  const [query, setquery] = useState()

  async function fetchQuery() {
    try {
      const response = await fetch(`${BASE_URL}/admin/query`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setquery(data)
      }
      else {
        return router.push("/")
      }
    } catch (err) {
      console.error("Error fetching user info:", err);
    }
  }
  useEffect(() => {
    fetchQuery();
  }, []);

  return (
    <div>
      {query &&
        <div className='admin-container'>
          {/* booking table */}
          <div className="table-container">
            <h2>All Queries</h2>
            <table>
              <thead>
                <tr>
                  <th>name</th>
                  <th>email</th>
                  <th>message</th>
                  {/* <th>responded</th> */}
                </tr>
              </thead>
              <tbody>
                {query.map(({ name, email, message }, idx) => (
                  <tr key={idx}>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{message}</td>
                    {/* <td>false</td> */}
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


export default AdminQuery;
