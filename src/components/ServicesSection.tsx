import React from "react";
import {
  Plane,
  Car,
  Calendar,
  Settings,
  Shield,
  Headphones,
  MapPin,
  Camera,
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Best Flight Deals",
      description:
        "Access to exclusive flight deals and partnerships with major airlines worldwide for the best prices.",
      icon: Plane,
      features: [
        "Competitive pricing",
        "Flexible booking",
        "Multiple airlines",
        "24/7 support",
      ],
    },
    {
      id: 2,
      title: "Premium Transportation",
      description:
        "Luxury ground transportation including private transfers, car rentals, and chauffeur services.",
      icon: Car,
      features: [
        "Private transfers",
        "Luxury vehicles",
        "Professional drivers",
        "Airport pickup",
      ],
    },
    {
      id: 3,
      title: "Local Events & Tours",
      description:
        "Curated local experiences, cultural events, and guided tours with expert local guides.",
      icon: Calendar,
      features: [
        "Cultural experiences",
        "Local guides",
        "Exclusive access",
        "Group discounts",
      ],
    },
    {
      id: 4,
      title: "Custom Itineraries",
      description:
        "Personalized travel planning tailored to your preferences, budget, and travel style.",
      icon: Settings,
      features: [
        "Personalized planning",
        "Flexible itineraries",
        "Budget optimization",
        "Expert advice",
      ],
    },
    {
      id: 5,
      title: "Travel Insurance",
      description:
        "Comprehensive travel protection covering medical emergencies, trip cancellations, and more.",
      icon: Shield,
      features: [
        "Medical coverage",
        "Trip protection",
        "Baggage insurance",
        "Emergency assistance",
      ],
    },
    {
      id: 6,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support for any travel emergencies or assistance needed.",
      icon: Headphones,
      features: [
        "24/7 availability",
        "Emergency hotline",
        "Multilingual support",
        "Instant assistance",
      ],
    },
    {
      id: 7,
      title: "Destination Expertise",
      description:
        "In-depth knowledge of destinations worldwide with insider tips and hidden gems.",
      icon: MapPin,
      features: [
        "Local insights",
        "Hidden gems",
        "Cultural tips",
        "Safety guidance",
      ],
    },
    {
      id: 8,
      title: "Photography Services",
      description:
        "Professional travel photography services to capture your memorable moments.",
      icon: Camera,
      features: [
        "Professional photos",
        "Memorable moments",
        "Digital delivery",
        "Multiple locations",
      ],
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            What We Offer
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-3xl mx-auto">
            Comprehensive travel services designed to make your journey
            seamless, memorable, and extraordinary from start to finish.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Icon */}
                <div className="bg-primary-100 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-8 h-8 text-primary-500 group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-500 mb-4 leading-relaxed text-sm">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-1.5">
                  {service.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 text-xs text-gray-400"
                    >
                      <div className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover Effect Button */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
              Ready to Experience Our Premium Services?
            </h3>
            <p className="text-base text-gray-500 mb-6 max-w-2xl mx-auto">
              Let our expert team handle every detail of your journey while you
              focus on creating unforgettable memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors">
                Start Planning
              </button>
              <button className="border border-primary-300 text-primary-600 hover:bg-primary-50 font-medium px-6 py-2.5 rounded-lg transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
