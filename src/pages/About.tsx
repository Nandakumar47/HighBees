import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Award,
  Globe,
  Heart,
  Shield,
  Star,
} from "lucide-react";
import { CONTACT_INFO } from "../utils/constants";
import { useRouteNavigation } from "../hooks/useRouteNavigation";

const About = () => {
  const { navigateToContact, navigateToEnquiry } = useRouteNavigation();
  const stats = [
    { number: "100+", label: "Happy Travelers", icon: Users },
    { number: "30+", label: "Destinations", icon: Globe },
    // { number: "15+", label: "Years Experience", icon: Clock },
    { number: "4.9/5", label: "Customer Rating", icon: Star },
  ];

  const values = [
    {
      icon: Heart,
      title: "Passionate Service",
      description:
        "We are passionate about travel and dedicated to creating unforgettable experiences for every client.",
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description:
        "Your safety and security are our top priorities. We maintain the highest standards in all our services.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for excellence in every detail, from planning to execution of your perfect journey.",
    },
    {
      icon: Globe,
      title: "Global Expertise",
      description:
        "Our worldwide network and local expertise ensure authentic and seamless travel experiences.",
    },
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [CONTACT_INFO.phone],
      description: "Available 24/7 for emergencies",
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [CONTACT_INFO.email],
      description: "We respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Physical Address",
      details: [CONTACT_INFO.address],
      description: "Visit us by appointment",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 8:00 PM",
        "Saturday: 10:00 AM - 6:00 PM",
        "Sunday: 12:00 PM - 5:00 PM",
      ],
      description: "Eastern Standard Time",
    },
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "With over 20 years in the travel industry, Sarah founded High Bees Holidays to make luxury travel accessible to everyone.",
      specialties: ["Luxury Travel", "Asia Pacific", "Executive Leadership"],
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Operations",
      image:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Michael ensures every trip runs smoothly with his expertise in logistics and customer service excellence.",
      specialties: [
        "Operations Management",
        "Customer Service",
        "Process Optimization",
      ],
    },
    {
      name: "Emma Thompson",
      role: "Senior Travel Advisor",
      image:
        "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Emma specializes in European destinations and has personally visited over 100 cities across the continent.",
      specialties: ["European Travel", "Cultural Tours", "Adventure Planning"],
    },
    {
      name: "David Park",
      role: "Adventure Specialist",
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "David designs thrilling adventure tours and has led expeditions to some of the world's most remote locations.",
      specialties: [
        "Adventure Travel",
        "Mountain Expeditions",
        "Wildlife Safaris",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section with improved hierarchy */}
      <section className="relative py-16 lg:py-20 bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              About High Bees Holidays
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed font-light">
              We're passionate about creating extraordinary travel experiences
              that inspire, delight, and transform lives. Your journey is our
              mission.
            </p>
            <div className="flex items-center justify-center space-x-3 text-primary-500">
              <MapPin className="w-6 h-6" />
              <span className="text-lg font-semibold">Est. 2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with improved hierarchy */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-primary-100 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-7 h-7 text-primary-500" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-base font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Information Section with improved hierarchy */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Contact Information
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              Get in touch with us through any of these channels. We're here to
              help you plan your perfect journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-primary-100 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-7 h-7 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {info.title}
                  </h3>
                  <div className="space-y-2 mb-6">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-700 text-base">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">{info.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values with improved hierarchy */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Our Values
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              These core values guide everything we do and shape every
              experience we create for our travelers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="text-center p-8 bg-gray-50 rounded-3xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-primary-100 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-7 h-7 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section with improved hierarchy */}
      {/* <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Meet Our Team
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              Our passionate team of travel experts brings decades of combined
              experience to help you explore the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary-500 font-semibold mb-4 text-base">
                    {member.role}
                  </p>
                  <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="space-y-2">
                    {member.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-primary-50 text-primary-600 text-sm px-3 py-1.5 rounded-full mr-2 mb-2"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section with improved hierarchy */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-primary-500 to-primary-700">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg sm:text-xl text-primary-100 mb-10 max-w-4xl mx-auto leading-relaxed font-light">
            Let our experienced team help you plan your next unforgettable
            adventure. Your dream destination is just a conversation away.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onSelect={() => navigateToEnquiry()}
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-base hover:shadow-lg"
            >
              Plan Your Trip
            </button>
            <button
              onClick={navigateToContact}
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-base hover:shadow-lg"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
