import React from 'react';
import { Heart, Users, Mountain, Compass, Star, Camera, Waves, TreePine } from 'lucide-react';

const TripTypes = () => {
  const tripTypes = [
    {
      id: 1,
      title: 'Romantic Getaways',
      description: 'Perfect for couples seeking intimate and unforgettable experiences',
      icon: Heart,
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Private dinners', 'Couples spa treatments', 'Sunset experiences', 'Luxury accommodations'],
      destinations: ['Santorini', 'Maldives', 'Paris', 'Bali'],
      priceRange: '$1,500 - $3,000',
      duration: '3-7 days',
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 2,
      title: 'Family Adventures',
      description: 'Fun-filled trips designed for families with children of all ages',
      icon: Users,
      image: 'https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Kid-friendly activities', 'Family accommodations', 'Educational experiences', 'Safety-first approach'],
      destinations: ['Disney World', 'Costa Rica', 'Japan', 'Iceland'],
      priceRange: '$800 - $2,000',
      duration: '5-14 days',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 3,
      title: 'Adventure Expeditions',
      description: 'Thrilling journeys for adrenaline seekers and outdoor enthusiasts',
      icon: Mountain,
      image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Extreme sports', 'Trekking & hiking', 'Professional guides', 'Safety equipment included'],
      destinations: ['Nepal', 'Patagonia', 'New Zealand', 'Peru'],
      priceRange: '$1,200 - $4,000',
      duration: '7-21 days',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 4,
      title: 'Cultural Immersion',
      description: 'Deep dive into local cultures, traditions, and authentic experiences',
      icon: Compass,
      image: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Local guides', 'Traditional experiences', 'Historic sites', 'Authentic cuisine'],
      destinations: ['India', 'Morocco', 'Egypt', 'Vietnam'],
      priceRange: '$900 - $2,500',
      duration: '8-15 days',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 5,
      title: 'Luxury Escapes',
      description: 'Premium experiences with world-class service and accommodations',
      icon: Star,
      image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['5-star hotels', 'Private transfers', 'Exclusive experiences', 'Personal concierge'],
      destinations: ['Dubai', 'Swiss Alps', 'French Riviera', 'Seychelles'],
      priceRange: '$3,000 - $10,000',
      duration: '4-10 days',
      color: 'from-gold-500 to-yellow-600'
    },
    {
      id: 6,
      title: 'Photography Tours',
      description: 'Capture stunning landscapes and moments with expert photography guides',
      icon: Camera,
      image: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Photography workshops', 'Golden hour sessions', 'Expert guidance', 'Small groups'],
      destinations: ['Iceland', 'Kenya', 'Japan', 'Norway'],
      priceRange: '$1,500 - $3,500',
      duration: '7-14 days',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 7,
      title: 'Beach & Island',
      description: 'Relax and unwind on pristine beaches and tropical islands',
      icon: Waves,
      image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Beach resorts', 'Water activities', 'Island hopping', 'Relaxation focus'],
      destinations: ['Caribbean', 'Hawaii', 'Thailand', 'Greece'],
      priceRange: '$1,000 - $3,000',
      duration: '5-10 days',
      color: 'from-teal-500 to-blue-600'
    },
    {
      id: 8,
      title: 'Eco & Wildlife',
      description: 'Sustainable travel focused on nature conservation and wildlife protection',
      icon: TreePine,
      image: 'https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Eco-lodges', 'Wildlife viewing', 'Conservation focus', 'Sustainable practices'],
      destinations: ['Galapagos', 'Borneo', 'Amazon', 'Antarctica'],
      priceRange: '$2,000 - $5,000',
      duration: '7-16 days',
      color: 'from-green-600 to-lime-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trip Types & Experiences
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the perfect travel experience tailored to your interests, preferences, and dreams
          </p>
        </div>

        {/* Trip Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tripTypes.map((tripType) => {
            const Icon = tripType.icon;
            return (
              <div
                key={tripType.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Header with Image and Overlay */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={tripType.image}
                    alt={tripType.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${tripType.color} opacity-75`} />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{tripType.title}</h3>
                      <p className="text-lg opacity-90 px-4">{tripType.description}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {tripType.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary-500 rounded-full" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Popular Destinations */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Popular Destinations:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tripType.destinations.map((destination, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors cursor-pointer"
                        >
                          {destination}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <span className="text-gray-500">Price Range:</span>
                      <div className="font-semibold text-gray-900">{tripType.priceRange}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Duration:</span>
                      <div className="font-semibold text-gray-900">{tripType.duration}</div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-lg transition-colors">
                      View Packages
                    </button>
                    <button className="px-6 border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-semibold py-3 rounded-lg transition-all duration-200">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Can't Find Your Perfect Trip?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Our travel experts can create a custom itinerary tailored specifically to your interests, budget, and timeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-500 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors">
              Custom Trip Planning
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-500 font-semibold px-8 py-3 rounded-lg transition-all duration-200">
              Speak with Expert
            </button>
          </div>
        </div>

        {/* Travel Tips */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choosing the Right Trip Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-primary-500" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Consider Your Interests</h4>
              <p className="text-gray-600 text-sm">
                Think about what activities and experiences excite you most when choosing your trip type.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary-500" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Travel Companions</h4>
              <p className="text-gray-600 text-sm">
                Consider who you're traveling with - solo, couple, family, or friends - to choose the best fit.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-primary-500" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Budget & Timeline</h4>
              <p className="text-gray-600 text-sm">
                Match your available time and budget to find the perfect trip type for your needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripTypes;