"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import './CreateTour.css'; // Import the CSS file
import { BASE_URL } from '@/apis/api';

const TourForm = () => {
    const router = useRouter()
    const [uploading, setuploading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        banner: null,
        destination: '',
        duration: '',
        price: '',
        category: '',
        description: '',
        features: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setForm(prev => ({
            ...prev,
            banner: e.target.files[0]
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setuploading(true)
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('banner', form.banner);
        formData.append('destination', form.destination);
        formData.append('duration', form.duration);
        formData.append('price', form.price);
        formData.append('category', form.category);
        formData.append('description', form.description);
        formData.append('features', form.features);

        try {
            const response = await fetch(`${BASE_URL}/admin/tour`, {
                method: "POST",
                body: formData,
                credentials: "include"
            });

            const data = await response.json();

            if (data.error) {
                return console.log(data.error);
            }

            setuploading(false)

            setForm({
                name: '',
                banner: null,
                destination: '',
                duration: '',
                price: '',
                category: '',
                description: "",
                features: '',
            })
            router.push("/admin")
        } catch (err) {
            console.error(err);
        }
    };
    if (uploading) return <div className='text-center p-16 text-2xl font-bold'>Uploading...</div>;
    return (
        <div>
            <h2 className='text-4xl font-bold text-center p-4'>Create Tour</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter Tour Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="file">File</label>
                <input
                    type="file"
                    name="banner"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                />
                <label htmlFor="destination">Destination</label>
                <input
                    type="text"
                    name="destination"
                    placeholder="Enter Destination"
                    value={form.destination}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    name="description"
                    placeholder="Enter Description"
                    value={form.description}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="duration">Duration</label>
                <input
                    type="number"
                    name="duration"
                    placeholder="Enter Duration (days)"
                    value={form.duration}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    name="price"
                    placeholder="Enter Price"
                    value={form.price}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="features">Features</label>
                <input
                    type="text"
                    name="features"
                    placeholder="Enter Features (comma seprated)"
                    value={form.features}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="category">Category</label>
                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required>
                    <option value="">Select Category</option>
                    <option value="spiritual">Spiritual</option>
                    <option value="family">Family</option>
                    <option value="alone">Alone</option>
                    <option value="friends">Friends</option>
                </select>
                <button
                className='px-[20px] py-[10px] bg-blue-400 border-none rounded-[5px] text-white cursor-pointer hover:bg-blue-600 '
                 type="submit">Submit</button>
            </form>
        </div>
    );
};

export default TourForm;
