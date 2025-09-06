"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import { BASE_URL } from '@/apis/api';


const ImageGallery = () => {
    const router = useRouter()
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setuploading] = useState(false);
  const [image, setImage] = useState(null);
  const [error, seterror] = useState("")

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


  const handleChange = (e) => {
    seterror("")
    setImage(e.target.files[0])

  }

  const handleUpload = async (e) => {
    if (!image) return seterror("Please select an image to upload")
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
         seterror("Something went wrong , please try again")
        setuploading(false)
      } else {
        setImage(null)
        setuploading(false)
        fetchData()
      }
    } catch (err) {
    seterror("Something went wrong , please try again")
      setuploading(false)
    }
  };

  if (loading) return <div className='text-center p-8'>Loading...</div>;
  if (uploading) return <div className='text-center p-8'>Uploading...</div>;

  return (
    <div className="px-4 m-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Image Gallery</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your uploaded images. Upload new images or delete existing ones.
          </p>
          {error && <p className='absolute text-red-500 py-2'>{error}</p>}
        </div>
      </div>

      {/* Upload Section */}
      <div className="mt-8">
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 `}
        >
          <div className="text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Select images to upload
                </span>
                <span className="mt-1 block text-sm text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </span>
              </label>

              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                multiple
                accept="image/*"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={handleUpload}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Images
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Images Grid */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">
            All Images ({images.length})
          </h2>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No images</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by uploading your first image.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images?.map((image) => (
              <div key={image._id} className="group relative  rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-48 object-cover"
                  />
                </div>

                {/* Overlay with delete button */}
                <div className="absolute bottom-0 right-2 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(image._id)}
                    className=" inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white  hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>

                {/* Image Info */}
                {/* <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 truncate" title={image.name}>
                    {image.name}
                  </h3>
                  <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                    <span>{image.uploadDate}</span>
                    <span>{image.size}</span>
                  </div>
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;