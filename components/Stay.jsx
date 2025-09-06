import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import AvailabilityForm from './AvailibilityForm'

function Stay() {

    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [adults, setAdults] = useState("2");
    const [children, setChildren] = useState("0");

    const benefits = [
        "Instant Booking", "Best Rates", "Flexiable Cancellation", "Secure Payments"
    ]

    return (
        <section className="relative bg-[rgba(253,239,239,1)] py-5 overflow-hidden">
            <div className=" relative z-10 px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-in">
                        <span className="text-sm text-blue-400 font-medium uppercase tracking-wider">
                            Book Your Stay
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                            Reserve Your Perfect Gateway
                        </h2>
                        <p className="text-gray-400 mb-6">
                            Take your perfect gateway to book oyr tour in a perfreed way so taht it would be
                            benificial for borth of us and we are undergoing cahge for  a  while so it will be good to
                            see you like that aftrt duch a long time
                        </p>
                        <ul className="space-y-3 mb-8">
                            {benefits.map((item, index) => (
                                <li key={index} className="flex items-center">
                                    <div className="h-5 w-5 rounded-full bg-gray-100 text-blue-400 flex items-center justify-center mr-3">
                                        <ArrowRight className="h-3 w-3" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <AvailabilityForm
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        adults={adults}
                        setAdults={setAdults}
                        children={children}
                        setChildren={setChildren}
                    />
                </div>
            </div>
        </section>
    )
}

export default Stay