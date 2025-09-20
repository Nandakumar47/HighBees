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
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with improved hierarchy */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            What We Offer
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Comprehensive travel services designed to make your journey
            seamless, memorable, and extraordinary from start to finish.
          </p>
        </div>

        {/* Services Grid with better spacing and hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Icon - Primary element */}
                <div className="bg-primary-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-8 group-hover:bg-primary-500 group-hover:scale-105 transition-all duration-300">
                  <Icon className="w-8 h-8 text-primary-500 group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Content with better hierarchy */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-primary-500 transition-colors leading-tight">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed text-base">
                  {service.description}
                </p>

                {/* Features List - De-emphasized */}
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-3 text-sm text-gray-500"
                    >
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover Effect Button - Secondary action */}
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg text-sm transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA with improved hierarchy */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-3xl p-12 md:p-16">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 leading-tight">
              Ready to Experience Our Premium Services?
            </h3>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Let our expert team handle every detail of your journey while you
              focus on creating unforgettable memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-8 py-4 rounded-lg transition-colors text-lg">
                Start Planning
              </button>
              <button className="border border-primary-300 text-primary-600 hover:bg-primary-50 font-medium px-8 py-4 rounded-lg transition-colors text-lg">
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
