"use client"
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { BASE_URL } from "@/apis/api";


export default function Gallery() {
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filteredImages, setFilteredImages] = useState([]);
  
    async function getData() {
      fetch(`${BASE_URL}/galleries`)
        .then((response) => response.json())
        .then(data => {
          setFilteredImages(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching images:', error);
          setLoading(false);
        });
    }
    useEffect(() => {
      getData()
    }, []);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  
  // Handle lightbox navigation
  const navigateGallery = (direction) => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img._id === selectedImage);
    let newIndex;
    
    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex]._id);
  };
  
  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage === null) return;
      
      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowLeft") {
        navigateGallery("prev");
      } else if (e.key === "ArrowRight") {
        navigateGallery("next");
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, filteredImages]);

    if (loading) return <div className="text-gray-400 p-16 text-center font-bold">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 pt-4">
        {/* Header Section */}
        <section className="relative  overflow-hidden">
          <div className=" z-10 text-centers">
            {/* <div className="max-w-3xl mx-auto text-center animate-fade-in"> */}
               <h4 className="text-center text-blue-500 p-2">EXPLORE OUR CREATIVITY</h4>
              <h1 className="text-center font-bold  text-4xl p-2">
               Photo Gallery
              </h1>
            {/* </div> */}
          </div>
        </section>
        
        {/* Gallery Filters */}
        <section className="py-8  px-4 flex items-center justify-center">
          <div className="container">
            {/* <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in">
            </div> */}
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages?.map((image, index) => (
                <div 
                  key={image._id} 
                  className="relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer group animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setSelectedImage(image._id)}
                >
                  <img 
                    src={image.url} 
                    alt=" Gallery Image"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white">{image.name}</p>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in">
            <button 
              className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </button>
            
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-4 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => navigateGallery("prev")}
            >
              <span className="sr-only">Previous</span>
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="max-w-5xl max-h-[80vh] overflow-hidden">
              {filteredImages.find(img => img._id === selectedImage) && (
                <img 
                  src={filteredImages.find(img => img._id === selectedImage)?.url} 
                  alt="Gallery Image"
                  className="max-w-full max-h-[80vh] object-contain"
                />
              )}
            </div>
            
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-4 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => navigateGallery("next")}
            >
              <span className="sr-only">Next</span>
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}