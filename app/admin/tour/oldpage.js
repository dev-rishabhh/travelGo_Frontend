"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import './ImageCardGrid.css'; //
import './AdminPanel.css'
import { BASE_URL } from '@/apis/api';
import TourForm from './CreateTour';

function AdminTour() {
    const router = useRouter()
    const [tour, settour] = useState()
    const [form, setForm] = useState({
        id: "",
        name: '',
        destination: '',
        duration: '',
        price: '',
        category: ''
    });

    const [createTour, setcreateTour] = useState(false)
    const [updateTour, setupdateTour] = useState(false)

    async function fetchTour() {
        try {
            const response = await fetch(`${BASE_URL}/admin/tour`, {
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                settour(data)
            }
            else {
                return router.push("/")
            }
        } catch (err) {
            console.error("Error fetching user info:", err);
        }
    }

    useEffect(() => {
        fetchTour();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(filteredtour);
        const formData = new FormData();
        formData.append('id', form.id);
        formData.append('name', form.name);
        formData.append('destination', form.destination);
        formData.append('duration', form.duration);
        formData.append('price', form.price);
        formData.append('category', form.category);

        try {
            const response = await fetch(`${BASE_URL}/admin/tour`, {
                method: "PUT",
                body: formData,
                credentials: "include"
            });

            const data = await response.json();

            if (data.error) {
                return console.log(data.error);
            }
            setForm({
                id: "",
                name: '',
                destination: '',
                duration: '',
                price: '',
                category: ''
            })
            fetchTour()
            setupdateTour(false)
        } catch (err) {
            console.error(err);
        }
    }

    async function handleupdateTour(id) {
        const Tour = tour.filter((tour) => tour._id === id)
        const { name, destination, duration, price, category } = Tour[0]
        setForm({
            name, destination, duration, price, category, id
        })
        setupdateTour(true)
    }
    async function handleDeleteTour(id) {
        try {
            const response = await fetch(`${BASE_URL}/admin/tour/${id}`, {
                method: "DELETE",
                credentials: "include"
            });

            const data = await response.json();
            if (data.error) {
                console.log(data.error);
            } else {
                fetchTour()
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (createTour) return <TourForm />
    if (updateTour) return <div>
        <h2> Update Tour</h2>
        {/* {console.log(filteredtour)} */}
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Tour Name" value={form.name} onChange={handleChange} required />
            <input type="text" name="destination" placeholder="Destination" value={form.destination} onChange={handleChange} required />
            <input type="number" name="duration" placeholder="Duration (days)" value={form.duration} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
            <select name="category" value={form.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="spiritual">Spiritual</option>
                <option value="family">Family</option>
                <option value="alone">Alone</option>
                <option value="friends">Friends</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    </div>;


    return (
        <div className=''>
            <div className='upload-btn-cont'>
                <button onClick={() => setcreateTour(true)}>Create</button>
            </div>
            {tour &&
                <div className='admin-container'>
                    {/* booking table */}
                    <div className="table-container">
                        <h2>All Tours</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>duration</th>
                                    <th>price</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tour.map(({ _id, name, duration, price }, idx) => (
                                    <tr key={idx}>
                                        <td>{name}</td>
                                        <td>{duration}</td>
                                        <td>{price}</td>
                                        <td><button onClick={() => handleupdateTour(_id)}>Update</button></td>
                                        <td><button onClick={() => handleDeleteTour(_id)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}

export default AdminTour