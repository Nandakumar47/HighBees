import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text: "WanderLux made our honeymoon in Santorini absolutely magical. Every detail was perfectly planned, from the romantic sunset dinner to the private yacht tour. The customer service was exceptional throughout our entire journey.",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
      trip: "Santorini Honeymoon Package",
      date: "October 2023",
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Toronto, Canada",
      rating: 5,
      text: "The Japan cultural tour exceeded all my expectations. The guides were knowledgeable, the accommodations were top-notch, and experiencing the traditional tea ceremony was unforgettable. Highly recommend WanderLux!",
      image:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
      trip: "Japan Cultural Experience",
      date: "September 2023",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      location: "Madrid, Spain",
      rating: 5,
      text: "Our family safari in Kenya was the adventure of a lifetime. Seeing the Great Migration up close was breathtaking. The kids loved every moment, and the accommodations were comfortable for the whole family.",
      image:
        "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150",
      trip: "Kenya Family Safari",
      date: "August 2023",
    },
    {
      id: 4,
      name: "David Thompson",
      location: "London, UK",
      rating: 5,
      text: "The Northern Lights tour in Iceland was absolutely spectacular. WanderLux arranged everything perfectly - from the glacier hiking to the Aurora hunting. Professional guides and stunning locations made this trip unforgettable.",
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
      trip: "Iceland Northern Lights",
      date: "November 2023",
    },
    {
      id: 5,
      name: "Lisa Park",
      location: "Seoul, South Korea",
      rating: 5,
      text: "My solo trip to Peru was incredible thanks to WanderLux. The Machu Picchu trek was challenging but rewarding, and I felt safe and supported throughout. The local guides shared amazing stories about Inca history.",
      image:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150",
      trip: "Peru Machu Picchu Trek",
      date: "July 2023",
    },
    {
      id: 6,
      name: "Robert Anderson",
      location: "Sydney, Australia",
      rating: 5,
      text: "The Maldives luxury package was pure paradise. The overwater villa was stunning, the coral reefs were pristine for snorkeling, and the spa treatments were world-class. WanderLux delivered excellence in every aspect.",
      image:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
      trip: "Maldives Luxury Resort",
      date: "December 2023",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentReview = testimonials[currentTestimonial];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            What Our Travelers Say
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-3xl mx-auto">
            Read authentic reviews from our satisfied customers who have
            experienced unforgettable journeys with WanderLux.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 text-primary-100">
              <Quote className="w-16 h-16" />
            </div>

            {/* Rating Stars */}
            <div className="flex items-center justify-center mb-6">
              {[...Array(currentReview.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-base md:text-lg text-gray-700 text-center mb-6 leading-relaxed">
              "{currentReview.text}"
            </blockquote>

            {/* Customer Info */}
            <div className="flex items-center justify-center space-x-4">
              <img
                src={currentReview.image}
                alt={currentReview.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-primary-100"
              />
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 text-base">
                  {currentReview.name}
                </h4>
                <p className="text-gray-500 text-sm">
                  {currentReview.location}
                </p>
                <p className="text-xs text-primary-500 font-medium">
                  {currentReview.trip}
                </p>
                <p className="text-xs text-gray-400">{currentReview.date}</p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:shadow-xl rounded-full p-3 transition-all duration-200 hover:scale-105"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:shadow-xl rounded-full p-3 transition-all duration-200 hover:scale-105"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentTestimonial
                    ? "bg-primary-500 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "50,000+", label: "Happy Travelers" },
            { number: "500+", label: "Destinations" },
            { number: "4.9/5", label: "Average Rating" },
            { number: "15+", label: "Years Experience" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-500 mb-1">
                {stat.number}
              </div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
