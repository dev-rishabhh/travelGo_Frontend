"use client"
import { useEffect, useState } from "react";
import TourCard from "../../components/Tourcard";
import './style.css'
import { BASE_URL } from "@/apis/api";
import { Button } from "@/components/ui/button";
export const metadata = {
  title:
  {
    template: "Tpur Packlages |Explore Temples, Culture & Heritage| Holiday Vibes",
  },
  description: "Discover  Ayodhya, Varanasi, Lucknow, Delhi, Jaipur with our tour pacakges. Plan perfect journey across spiritual ceneters of India",
  keywords:"same day ayodhya tour, jaipur tour pacakges, varanasi tour packages, ayodhya tour packages,ayodhya tour package,best time visit ayodhya,ayodhya package"
};

export default function Tours() {
  const [Tours, setTours] = useState()
  const [filteredApartments, setFilteredApartments] = useState(Tours);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRange, setPriceRange] = useState('10000');

  async function getData() {
    const response = await fetch(`${BASE_URL}/tours`)
    const data = await response.json()
    setTours(data)
    setFilteredApartments(data);
  }
  
  useEffect(() => {
    getData()
  }, [])

  function handleFilter(category, price) {
    if (Tours) {
      let result = Tours;

      if (category !== "all") {
        result = result.filter((tour) => tour.category === category);
      }
      // console.log(result);

      result = result.filter((tour) => tour.price < parseInt(price))

      setFilteredApartments(result);
    }
  }


  useEffect(() => {
    handleFilter(categoryFilter, priceRange)
  }, [categoryFilter, priceRange]);




  return (
    <div className="py-16">
      <main className="flex-grow">
        {/* Header Section */}
        <section className="relative bg-blue-300 text-white py-24">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Tours
              {/* <span className="block text-blue-200">Wanderlust & Wonder</span> */}
            </h1>
            <p className="text-xl text-red-50 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              For over two decades, we've been crafting extraordinary journeys that inspire,
              educate, and create lasting memories for travelers from around the globe.
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="filter-section">
          <div className="container grid-3 fade-in">
            <div>
              <label className="label">Category</label>
              <select
                name="category"
                className="border-[1px] border-gray-200 py-1 px-4 rounded-sm"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                required>
                <option value="" disabled>Select Category</option>
                <option value="all">All</option>
                <option value="spiritual">Spiritual</option>
                <option value="family">Family</option>
                <option value="alone">Alone</option>
                <option value="friends">Friends</option>
              </select>
            </div>

            <div>
              <label className="label">
                Price
              </label>

              <div className="relative">
                <input
                  type="range"
                  value={priceRange}
                  min="5000"
                  max="20000"
                  step="3000"
                  className="w-full h-2 bg-blue-300 rounded-lg appearance-none cursor-pointer"
                  onChange={(e) => setPriceRange(e.target.value)}
                />
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">Min (5000)</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">Max (20000)</span>
              </div>

            </div>
          </div>
        </section>

        {/* Apartments Grid */}
        <section className="section">
          <div className="filter-footer fade-in delay-200 p-2">
            <p className="text-muted">
              Results
            </p>
          </div>
          <div className="container">

            <div className=" grid gap-6  md:grid-cols-2 lg:grid-cols-3  ">
              {filteredApartments?.map((tour, index) => (
                <div
                  key={tour._id}
                  className="fade-in"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>

            {filteredApartments?.length === 0 && <div className="no-results text-center fade-in">
              <h3 className="no-results-title">No match</h3>
              {/* <p className="text-muted mb-6">Reset</p> */}
              <Button
                variant="primary"
                onClick={() => {
                  setCategoryFilter("all");
                  setPriceRange(20000)
                }}
              >
              Reset Filters
              </Button>
            </div>}

          </div>
        </section>
      </main>
    </div>
  );
}
