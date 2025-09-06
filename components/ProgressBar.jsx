import React from 'react'
import { Check, } from "lucide-react";

function ProgressBar({currentStep}) {
  return (
    <div className="relative animate-fade-in [animation-delay:200ms]">
            <div className="flex justify-between items-center mb-8">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex flex-col items-center relative z-10">
                  <div
                    className={`
                      " px-4 py-2 text-white rounded-full flex items-center justify-center mb-2 transition-colors",
                      ${currentStep >= step
                        ? " bg-blue-400 "
                        : "bg-gray-400"
                      }`}
                  >
                    {currentStep > step ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span>{step}</span>
                    )}
                  </div>
                  <span
                    className={(
                      "text-sm font-medium",
                      currentStep >= step
                        ? "text-foreground "
                        : "text-muted-foreground"
                    )}
                  >
                    {step === 1 ? "Choose Room" : step === 2 ? "Guest Details": step === 3 ? "Confirmation" : "Payment"}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-100 z-0">
              <div
                className="h-full bg-blue-400 transition-all duration-300 "
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />
            </div>
          </div>
  )
}

export default ProgressBar