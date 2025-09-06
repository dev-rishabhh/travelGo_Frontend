"use client"
import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";
import './Contact.css'
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/apis/api";


export default function Contact() {
  const [formData, setFormData] = useState({
    name: "abc",
    email: "abc@gmail.com",
    phone: "12345678",
    subject: "testing",
    message: "i am testing this route"
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/queries`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });

      const data = await response.json();
      if (data.error) {
        // If there's an error, set the serverError message
        // setServerError(data.error);
      } else {
        console.log("Form submitted:", formData);
        setIsSubmitted(true);

        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: ""
          });
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      setServerError("Something went wrong. Please try again.");
    }

  };

  const faqs = [
    { key: "checkInOut", icon: <Clock />, question: "hiii, how are you?", answer: "I am fine, what about you" },
    { key: "parking", icon: <MapPin />, question: "hiii, how are you?", answer: "I am fine, what about you" },
    { key: "pets", icon: <MapPin />, question: "hiii, how are you?", answer: "I am fine, what about you" },
    { key: "breakfast", icon: <MapPin />, question: "hiii, how are you?", answer: "I am fine, what about you" },
    { key: "transfers", icon: <MapPin />, question: "hiii, how are you?", answer: "I am fine, what about you" },
    { key: "amenities", icon: <MapPin />, question: "hiii, how are you?", answer: "I am fine, what about you" },
  ];

  return (
    
    <div className="py-16">
      <main className="">
        {/* Header */}
        <section className="relative bg-blue-300 text-white py-24">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Contact
              {/* <span className="block text-blue-200">Wanderlust & Wonder</span> */}
            </h1>
            <p className="text-xl text-red-50 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              For over two decades, we've been crafting extraordinary journeys that inspire,
              educate, and create lasting memories for travelers from around the globe.
            </p>
          </div>
        </section>
        {/* Contact Info + Form */}
        <section className="contact-section px-4 py-2">
          <div className="contact-wrapper">
            <div className="contact-info">
              <h2>Get In Touch</h2>

              <div className="info-card">
                <div className="icon-circle"><MapPin /></div>
                <div>
                  <h3>Address</h3>
                  <address>
                    123 Seaside Boulevard
                    Costa Bella, 12345<br />
                    Italy
                  </address>
                </div>
              </div>

              <div className="info-card">
                <div className="icon-circle"><Phone /></div>
                <div>
                  <h3>Phone</h3>
                  <p>+39 123 4567 890</p>
                  <p>+39 098 7654 321 (Reservations)</p>
                </div>
              </div>

              <div className="info-card">
                <div className="icon-circle"><Mail /></div>
                <div>
                  <h3>Email</h3>
                  <p>info@maresereno.com</p>
                  <p>reservations@maresereno.com</p>
                </div>
              </div>

              <div className="info-card">
                <div className="icon-circle"><Clock /></div>
                <div>
                  <h3>Reception Hours</h3>
                  <p>
                    Monday - Sunday: 24 hours<br />
                  </p>
                </div>
              </div>

              {/* <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.03606358136!2d14.165818971864153!3d40.85529294646443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b0a3c328d896b%3A0x309e11f99628150!2sGulf%20of%20Naples!5e0!3m2!1sen!2sus!4v1628613152777!5m2!1sen!2sus"
                  title="Location Map"
                  allowFullScreen
                  loading="lazy"
                />
              </div> */}
            </div>

            <div className="contact-form">
              <h2>Send Us a Message</h2>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 234 567 8900"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Reservation Inquiry"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="How can we help you?"
                      required
                      rows="6"
                    />
                  </div>

                  <Button type="submit" varient="primary">
                    <Send className="icon-send" />
                    Send
                  </Button>
                </form>
              ) : (
                <div className="submission-message" aria-live="polite" role="alert">
                  <div className="success-icon">
                    <Check />
                  </div>
                  <h3>Message Sent</h3>
                  <p>Thank you</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq-section">
          <div className="faq-header">
            <h2>FAQs</h2>
            <p>Faq subtitle</p>
          </div>

          <div className="faq-grid">
            {faqs.map(({ key, icon, question, answer }) => (
              <div key={key} className="faq-card">
                <div className="faq-icon">{icon}</div>
                <h3>{question}</h3>
                <p>{answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
