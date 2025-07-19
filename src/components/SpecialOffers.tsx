import React from 'react';
import { Clock, Percent, Gift, ArrowRight, Calendar } from 'lucide-react';

const SpecialOffers = () => {
  const offers = [
    {
      id: 1,
      title: 'Early Bird Special',
      subtitle: 'Book 3 months in advance',
      discount: 30,
      description: 'Save up to 30% on select destinations when you book your dream vacation 3 months ahead.',
      image: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=600',
      validUntil: '2024-03-31',
      code: 'EARLY30',
      bgColor: 'from-blue-500 to-blue-600',
      icon: Clock
    },
    {
      id: 2,
      title: 'Honeymoon Package',
      subtitle: 'Romance & luxury combined',
      discount: 25,
      description: 'Celebrate your love with exclusive honeymoon packages featuring luxury accommodations and romantic experiences.',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
      validUntil: '2024-06-30',
      code: 'ROMANCE25',
      bgColor: 'from-pink-500 to-rose-600',
      icon: Gift
    },
    {
      id: 3,
      title: 'Group Adventure',
      subtitle: 'Travel with friends & family',
      discount: 20,
      description: 'Special rates for groups of 6 or more. Perfect for family reunions, friend getaways, or corporate retreats.',
      image: 'https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg?auto=compress&cs=tinysrgb&w=600',
      validUntil: '2024-05-15',
      code: 'GROUP20',
      bgColor: 'from-green-500 to-emerald-600',
      icon: Percent
    }
  ];

  const quickDeals = [
    {
      destination: 'Bali, Indonesia',
      originalPrice: 1299,
      salePrice: 899,
      saving: 400,
      image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '7 days',
      endDate: '2024-02-29'
    },
    {
      destination: 'Dubai, UAE',
      originalPrice: 1599,
      salePrice: 1199,
      saving: 400,
      image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '5 days',
      endDate: '2024-03-15'
    },
    {
      destination: 'Costa Rica',
      originalPrice: 1099,
      salePrice: 799,
      saving: 300,
      image: 'https://images.pexels.com/photos/1119783/pexels-photo-1119783.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '8 days',
      endDate: '2024-03-31'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Special Offers & Deals
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Don't miss out on these exclusive deals and limited-time offers to make your dream vacation more affordable.
          </p>
        </div>

        {/* Main Offers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <div
                key={offer.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${offer.bgColor} opacity-85`} />
                </div>

                {/* Content */}
                <div className="relative p-8 text-white h-full flex flex-col justify-between min-h-[400px]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="w-8 h-8" />
                      <div className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-bold">{offer.discount}% OFF</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                    <p className="text-lg mb-4 opacity-90">{offer.subtitle}</p>
                    <p className="text-sm mb-6 opacity-80">{offer.description}</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <span>Code: <strong>{offer.code}</strong></span>
                      <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
                    </div>
                    
                    <button className="w-full bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 border border-white border-opacity-30 text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200">
                      <span>Claim Offer</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Deals */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Flash Deals</h3>
            <div className="flex items-center space-x-2 text-red-500">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Limited Time</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickDeals.map((deal, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden group"
              >
                <div className="relative h-32">
                  <img
                    src={deal.image}
                    alt={deal.destination}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    Save ${deal.saving}
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-1">{deal.destination}</h4>
                  <p className="text-sm text-gray-600 mb-3">{deal.duration}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-green-600">${deal.salePrice}</span>
                      <span className="text-sm text-gray-500 line-through">${deal.originalPrice}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Ends {new Date(deal.endDate).toLocaleDateString()}</span>
                    </div>
                    <button className="text-primary-500 hover:text-primary-600 font-semibold">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;