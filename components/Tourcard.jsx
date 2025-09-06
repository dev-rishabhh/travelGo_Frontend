"use client"
import React, { useState } from "react";
import Link from "next/link";
import { MapPin,IndianRupee, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import "./Tourcard.css";

export default function TourCard({ tour }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`apartment-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
                <Calendar className="icon" />
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
          {tour.features.length > 3 && (
            <div className="feature-item more-features">
              +{tour.features.length - 3} more 
            </div>
          )}
        </div>

        <div className="apartment-footer">
          <div>
            <span className="apartment-price flex items-center">
              <IndianRupee/>
              {tour.price}
              </span>
            {/* <span className="price-per-night">
              /night
            </span> */}
          </div>
          <Button variant="primary">
            <Link href="/booking" className="btn-link">
              Book Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
