import React, { useState } from 'react';
import { Clock, Percent, Gift, Calendar, MapPin, Star, Users, Tag } from 'lucide-react';
import { getAllDestinations } from '../data/destinationsData';

const SpecialOffers = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Offers' },
    { id: 'early-bird', name: 'Early Bird' },
    { id: 'last-minute', name: 'Last Minute' },
    { id: 'group', name: 'Group Deals' },
    { id: 'seasonal', name: 'Seasonal' }
  ];

  const featuredOffers = [
    {
      id: 1,
      title: 'Early Bird Special',
      subtitle: 'Book 3 months in advance',
      discount: 30,
      category: 'early-bird',
      description: 'Save up to 30% on select destinations when you book your dream vacation 3 months ahead.',
      image: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800',
      validUntil: '2024-03-31',
      code: 'EARLY30',
      destinations: ['Santorini', 'Maldives', 'Bali', 'Dubai'],
      terms: 'Valid for bookings made 90 days in advance. Cannot be combined with other offers.'
    },
    {
      id: 2,
      title: 'Flash Sale Weekend',
      subtitle: 'Limited time offer',
      discount: 40,
      category: 'last-minute',
      description: 'Incredible savings on last-minute bookings. Perfect for spontaneous adventures.',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      validUntil: '2024-02-29',
      code: 'FLASH40',
      destinations: ['Iceland', 'Costa Rica', 'Kenya', 'Japan'],
      terms: 'Valid for departures within 30 days. Subject to availability.'
    },
    {
      id: 3,
      title: 'Group Adventure',
      subtitle: 'Travel with friends & family',
      discount: 25,
      category: 'group',
      description: 'Special rates for groups of 6 or more. Perfect for family reunions and friend getaways.',
      image: 'https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg?auto=compress&cs=tinysrgb&w=800',
      validUntil: '2024-05-15',
      code: 'GROUP25',
      destinations: ['Peru', 'Greece', 'Morocco', 'Thailand'],
      terms: 'Minimum 6 travelers required. Group leader travels free with 10+ bookings.'
    }
  ];

  // Get destinations from centralized data for realistic deals
  const allDestinations = getAllDestinations();
  
  const deals = [
    ...allDestinations.slice(0, 6).map((dest, index) => {
      const originalPrice = (dest.itineraries[0]?.price || 999) + Math.floor(Math.random() * 500) + 200;
      const salePrice = Math.floor(originalPrice * (0.7 + Math.random() * 0.2)); // 20-30% discount
      const discount = Math.floor(((originalPrice - salePrice) / originalPrice) * 100);
      
      const categories = ['last-minute', 'early-bird', 'group', 'seasonal'];
      const category = categories[index % categories.length];
      
      const endDates = ['2024-02-29', '2024-03-15', '2024-03-31', '2024-04-15', '2024-05-30', '2024-04-30'];
      
      return {
        id: index + 1,
        destination: dest.name,
        country: dest.country,
        originalPrice,
        salePrice,
        discount,
        image: dest.heroImage,
        duration: dest.itineraries[0]?.duration || '7 days',
        rating: dest.reviews[0]?.rating || 4.5 + Math.random() * 0.4,
        reviews: Math.floor(Math.random() * 1000) + 500,
        endDate: endDates[index % endDates.length],
        category,
        highlights: dest.highlights.slice(0, 3)
      };
    })
  ];

  const filteredDeals = selectedCategory === 'all' ? deals : deals.filter(deal => deal.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Special Offers & Deals
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't miss out on these exclusive deals and limited-time offers to make your dream vacation more affordable
          </p>
        </div>

        {/* Featured Offers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Offers</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredOffers.map((offer) => (
              <div
                key={offer.id}
                className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 opacity-85" />
                </div>

                {/* Content */}
                <div className="relative p-8 text-white h-full flex flex-col justify-between min-h-[400px]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Gift className="w-8 h-8" />
                      <div className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-bold">{offer.discount}% OFF</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                    <p className="text-lg mb-4 opacity-90">{offer.subtitle}</p>
                    <p className="text-sm mb-6 opacity-80">{offer.description}</p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4" />
                        <span className="text-sm">Code: <strong>{offer.code}</strong></span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 border border-white border-opacity-30 text-white font-semibold py-3 rounded-lg transition-all duration-200">
                    Claim Offer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={deal.image}
                  alt={deal.destination}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full">
                  <span className="text-sm font-bold">{deal.discount}% OFF</span>
                </div>
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-red-500" />
                    <span className="text-xs font-semibold text-gray-900">
                      Until {new Date(deal.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{deal.country}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{deal.rating}</span>
                    <span className="text-sm text-gray-500">({deal.reviews})</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{deal.destination}</h3>

                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-green-600">${deal.salePrice}</span>
                  <span className="text-lg text-gray-500 line-through">${deal.originalPrice}</span>
                  <span className="text-sm text-green-600 font-medium">Save ${deal.originalPrice - deal.salePrice}</span>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{deal.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>2-8 people</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {deal.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-lg transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Never Miss a Deal</h3>
          <p className="text-lg mb-6 opacity-90">
            Subscribe to our newsletter and be the first to know about exclusive offers and flash sales
          </p>
          <button className="bg-white text-primary-500 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;