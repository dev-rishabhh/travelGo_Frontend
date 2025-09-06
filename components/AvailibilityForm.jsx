"use client"
import React, { useState } from 'react';
import DateInput from './ui/dateInput';
import GuestSelector from './ui/guestSelector';
import './AvailibilityForm.css'
import { Button } from './ui/button';
import { Check, Search } from 'lucide-react';



function AvailabilityForm({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  adults,
  setAdults,
  children,
  setChildren,
  title = "Check Availability",
  size = 'medium',
  onSubmit,
  availibility = true,
  boxShadow = true,
  className = ''
}) {
  const [isFormSubmited, setisFormSubmited] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setisFormSubmited(true)
    setTimeout(() => {
      setisFormSubmited(false)
    }, 3000);
    // console.log('Form submitted:');
    // if (onSubmit) {
    //   onSubmit(formData);
    // }
  };


  return (
    <div className={`availability-form ${boxShadow ? ' box-shadow' : ''} ${className}`}>
      {!isFormSubmited ? (
        <>
          {title && (
            <h2 className={`availability-form__title`}>
              {title}
            </h2>
          )}

          <form onSubmit={handleSubmit} className="availability-form__form">
            <div className="availability-form__grid">
              <DateInput
                label="Check-in Date"
                value={startDate}
                onChange={(value) => setStartDate(value)}
                placeholder="Select date"
              />

              <DateInput
                label="Check-out Date"
                value={endDate}
                onChange={(value) => setEndDate(value)}
                placeholder="Select date"
                minDate={startDate}
              />
              <GuestSelector
                label="Adults"
                value={adults}
                onChange={(value) => setAdults(value)}
                min={1}
                max={10}
              />

              <GuestSelector
                label="Children"
                value={children}
                onChange={(value) => setChildren(value)}
                min={0}
                max={8}
              />
            </div>

            {availibility && <Button
              type="submit"
              className="availability-form__submit"

            >
              <Search className="w-4 h-4 mr-2" />
              Check Availability
            </Button>
            }
          </form>
        </>) : (
        <>
          <div className="glass-card p-8 text-center animate-fade-in">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Dates Available!</h2>
            <p className="text-muted-foreground mb-6">
              Dates are available, Book now
            </p>
            {/* <p className="font-medium mb-8">
              Booking Reference: <span className="text-primary">MRS-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
            </p> */}
            {/* <Button varient="primary">
              <Link href="/">Return to Homepage</Link>
            </Button> */}
          </div>
        </>)}
    </div>
  );
};

export default AvailabilityForm;