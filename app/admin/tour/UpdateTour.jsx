"use client"
import { BASE_URL } from '@/apis/api';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

function UpdateTour({ form, setForm, setupdateTour, fetchTour }) {
   const [uploading, setuploading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        setuploading(true)

        const formData = new FormData();
        formData.append('id', form.id);
        formData.append('name', form.name);
        formData.append('destination', form.destination);
        formData.append('duration', form.duration);
        formData.append('price', form.price);
        formData.append('category', form.category);
        formData.append('description', form.description);
        formData.append('features', form.features);
        formData.append('featured', form.featured);

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
            setuploading(false)
            setForm({
                id: "",
                name: '',
                destination: '',
                duration: '',
                price: '',
                category: '',
                description: '',
                features: '',
                featured: ''
            })
            fetchTour()
            setupdateTour(false)
        } catch (err) {
            console.error(err);
        }
    }
    if(uploading) return <div className='text-center p-16 text-2xl font-bold'>Updating...</div>

    return (
        <div>
            <h2 className='text-center text-4xl font-bold p-4'> Update Tour</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" className='text-gray-600'>Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Tour Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                 <label htmlFor="destination" className='text-gray-600'>Destination</label>
                <input
                    type="text"
                    name="destination"
                    placeholder="Destination"
                    value={form.destination}
                    onChange={handleChange}
                    required
                />
                 <label htmlFor="duartion" className='text-gray-600'>Duartion</label>
                <input
                    type="number"
                    name="duration"
                    placeholder="Duration (days)"
                    value={form.duration}
                    onChange={handleChange}
                    required
                />
                 <label htmlFor="price" className='text-gray-600'>Price</label>
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    required
                     />
                      <label htmlFor="description" className='text-gray-600'>Description</label>
                <input
                    type="text"
                    name="descriptionn"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    required 
                    />
                     <label htmlFor="features" className='text-gray-600'>Features</label>
                <input
                    type="text"
                    name="features"
                    placeholder="Features"
                    value={form.features}
                    onChange={handleChange}
                    required
                />
                 <label htmlFor="featured" className='text-gray-600'>Featured</label>
                <select name="featured" value={form.featured} onChange={handleChange} required>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                 <label htmlFor="category" className='text-gray-600'>Category</label>
                <select name="category" value={form.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    <option value="spiritual">Spiritual</option>
                    <option value="family">Family</option>
                    <option value="alone">Alone</option>
                    <option value="friends">Friends</option>
                </select>
                <Button type="submit" variant='primary'>Submit</Button>
            </form>
        </div>
    );
}

export default UpdateTour