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

const About = () => {
  const stats = [
    { number: "50,000+", label: "Happy Travelers", icon: Users },
    { number: "500+", label: "Destinations", icon: Globe },
    { number: "15+", label: "Years Experience", icon: Clock },
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
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543", "+1 (800) HIGHBEE"],
      description: "Available 24/7 for emergencies",
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [
        "info@highbeesholidays.com",
        "support@highbeesholidays.com",
        "bookings@highbeesholidays.com",
      ],
      description: "We respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Physical Address",
      details: [
        "123 Travel Street",
        "Adventure City, AC 12345",
        "United States",
      ],
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
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              About High Bees Holidays
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-4xl mx-auto mb-6">
              We're passionate about creating extraordinary travel experiences
              that inspire, delight, and transform lives. Your journey is our
              mission.
            </p>
            <div className="flex items-center justify-center space-x-2 text-primary-500">
              <MapPin className="w-5 h-5" />
              <span className="text-base font-medium">
                Est. 2008 • Trusted by 50,000+ Travelers
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-primary-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
              Contact Information
            </h2>
            <p className="text-base text-gray-500 max-w-3xl mx-auto">
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
                  className="bg-white rounded-2xl shadow-lg p-5 text-center hover:shadow-xl transition-shadow"
                >
                  <div className="bg-primary-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <div className="space-y-1 mb-3">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">{info.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
              Our Values
            </h2>
            <p className="text-base text-gray-500 max-w-3xl mx-auto">
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
                  className="text-center p-5 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow"
                >
                  <div className="bg-primary-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
              Meet Our Team
            </h2>
            <p className="text-base text-gray-500 max-w-3xl mx-auto">
              Our passionate team of travel experts brings decades of combined
              experience to help you explore the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-500 font-medium mb-2 text-sm">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-xs mb-3">{member.bio}</p>
                  <div className="space-y-1">
                    {member.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-primary-50 text-primary-600 text-xs px-2 py-1 rounded-full mr-1"
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
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-primary-100 mb-6 max-w-2xl mx-auto">
            Let our experienced team help you plan your next unforgettable
            adventure. Your dream destination is just a conversation away.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-white text-primary-600 hover:bg-gray-100 font-medium px-6 py-2.5 rounded-lg transition-colors">
              Plan Your Trip
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-primary-600 font-medium px-6 py-2.5 rounded-lg transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
