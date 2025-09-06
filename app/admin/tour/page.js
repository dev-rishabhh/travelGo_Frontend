"use client"
import React, { useState, useEffect } from 'react';
import TourCard from '@/components/Tourcard';
import { MapPin, CalendarDaysIcon, IndianRupee } from "lucide-react";
import { Button } from '@/components/ui/button';
import { BASE_URL } from '@/apis/api';
import TourForm from './CreateTour';
import { useRouter } from 'next/navigation';
import UpdateTour from './UpdateTour';


const TourPage = () => {
    const [tour, settour] = useState()

    const [form, setForm] = useState({
        id:'',
        name: '',
        banner: null,
        destination: '',
        duration: '',
        price: '',
        category: '',
        description: '',
        features: '',
        featured:'',
    });

    const [createTour, setcreateTour] = useState(false)
    const [updateTour, setupdateTour] = useState(false)

    const router = useRouter()

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


    async function handleupdateTour(id) {
        const Tour = tour.filter((tour) => tour._id === id)
        const { name, destination, duration, price, category,description,features,featured } = Tour[0]
        setForm({
            id,name, destination, duration, price, category, description,features,featured,
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
    if (updateTour) return <UpdateTour form={form} setForm={setForm} setupdateTour={setupdateTour} fetchTour={fetchTour}/>


    return (
        <div className="px-4 m-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-6 sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-2xl font-semibold text-gray-900">Tours Dashboard</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all tour pacakges available including their details and status.
                    </p>
                </div>
                <div className='my-2 sm:my-0'>
                    <Button onClick={() => setcreateTour(true)} >Create</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tour?.map((tour, index) => (
                    <div
                        className={`apartment-card "}`}
                        key={index}
                    >
                        <div className="apartment-image-wrapper">
                            <img
                                src={tour.banner}
                                alt={tour.name}
                                className="apartment-image"
                            />
                            <div className="apartment-image-overlay">
                                <div>
                                    <h3 className="apartment-name">{tour.name}</h3>
                                    <div className="apartment-location">
                                        <MapPin className="icon" />
                                        <span>{tour.destination}</span>
                                    </div>
                                    <div className="apartment-info">
                                        <div className="info-item">
                                            <IndianRupee className="icon" />
                                            <span>
                                                {tour.price}
                                            </span>
                                        </div>

                                        <div className="info-item">
                                            <CalendarDaysIcon className="icon" />
                                            <span>{tour.duration} days</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="apartment-content">
                            <p className="apartment-description">{tour.description}</p>

                            <div className="apartment-features">
                                {tour.features.slice(0, 3).map((feature, index) => (
                                    <div key={index} className="feature-item">
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="apartment-footer">
                                <Button
                                    variant="destructive"
                                    onClick={() => handleDeleteTour(tour._id)}
                                >
                                    Delete
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={() => handleupdateTour(tour._id)}
                                >
                                    Update
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default TourPage
