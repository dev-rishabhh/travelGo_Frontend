"use client"
import React, { useEffect, useState, } from 'react';
import { useRouter } from "next/navigation";
import './Admin-Gallery.css'; //
import { BASE_URL } from '@/apis/api';

const AdminGallery = () => {
    const router = useRouter()
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setuploading] = useState(false);
    const [image, setImage] = useState(null);
    // const [url, setUrl] = useState('');

    async function fetchData() {
        try {
            const res = await fetch(`${BASE_URL}/admin/gallery`, {
                credentials: "include"
            })
            // console.log(res);
            const data = await res.json()

            // console.log(data);
            if (data.error) {
                return router.push("/")
            }

            setImages(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching images:', error);
            setLoading(false);

        }
    }


    useEffect(() => {
        fetchData()
    }, []);

    async function handleDelete(id) {
        try {
            const response = await fetch(`${BASE_URL}/admin/gallery/${id}`, {
                method: "DELETE",
                credentials: "include"
            });

            const data = await response.json();
            if (data.error) {
                console.log(data.error);
            } else {
                fetchData()
            }
        } catch (error) {
            console.log(error);
        }

    }

    const handleUpload = async (e) => {
        e.preventDefault();
        setuploading(true)
        const formData = new FormData();
        formData.append('image', image);
        try {
            const response = await fetch(`${BASE_URL}/admin/gallery`, {
                method: "POST",
                body: formData,
                credentials: "include"
            });

            const data = await response.json();

            if (data.error) {
                console.log(data.error);
            } else {
                setImage(null)
                setuploading(false)
                fetchData()
            }
        } catch (err) {
            console.error(err);
        }
    };
    if (loading) return <div>Loading...</div>;
    if (uploading) return <div>Uploading...</div>;

    return (
        <div className='gallery-container'>
            <div className='upload-btn-cont'>
                <form onSubmit={handleUpload}>
                    <input type="file" name='image' onChange={(e) => setImage(e.target.files[0])} />
                    <button type="submit">Upload</button>
                </form>
            </div>
            <h2>All Images</h2>
            <div className="card-grid">
                {images?.map(({ _id, url }, idx) => (
                    <div
                        key={idx}
                        className="image-card"
                        style={{ backgroundImage: `url(${url})` }}
                    >
                        <div
                            className="image-name"
                            onClick={() => handleDelete(_id)}
                        >Delete</div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default AdminGallery;
