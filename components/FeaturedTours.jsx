"use client"
import { useEffect, useState } from "react";
import TourCard from "./Tourcard";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { BASE_URL } from "@/apis/api";


function FeaturedTours() {
  const [Tours, setTours] = useState()
   const router = useRouter()

  async function getData() {
    const response = await fetch(`${BASE_URL}/tours`)
    const data = await response.json()
    const filteredTours=data.filter((data)=>data.featured)
    // console.log(filteredTours);
    
    setTours(filteredTours)
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="p-4">
      <h4 className="text-center text-blue-500 p-2">OUR ACCOMMODATIONS</h4>
      <h2 className="text-center font-bold  text-4xl p-2">Featured Packages</h2>
      <p className="text-gray-500 text-center m-2 p-4">Discover our most accommodations featured at highest and the best services offerd by us</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-4 gap-3">
        {Tours?.map((tour, index) => (
          <div
            key={tour._id}
            className="fade-in"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <TourCard tour={tour} />
          </div>
        ))}
      </div>
      <div className="no-results text-center fade-in">
        <Button
          variant="primary"
          onClick={()=>router.push("/tours")}
        >
          View all Packages
        </Button>
      </div>
    </div>
  )
}

export default FeaturedTours