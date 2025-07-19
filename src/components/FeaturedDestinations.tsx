import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Calendar, Users, ArrowRight } from 'lucide-react';
import { CardSkeleton } from './common/SkeletonLoader/SkeletonLoader';
import { useLoading } from '../hooks/useLoading';
import { getAllDestinations } from '../data/destinationsData';

const FeaturedDestinations = () => {
  const { isLoading, withLoading } = useLoading(true);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const loadDestinations = async () => {
      await withLoading(async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Get destinations from centralized data
        const allDestinations = getAllDestinations();
        
        // Convert to the format expected by the component
        const destinationsData = allDestinations.map(dest => ({
          id: dest.id,
          name: dest.name,
          country: dest.country,
          slug: dest.id,
          image: dest.heroImage,
          price: dest.itineraries[0]?.price || 999,
          rating: dest.reviews[0]?.rating || 4.8,
          reviews: dest.reviews.length * 100 + Math.floor(Math.random() * 900) + 100, // Generate realistic review count
          duration: dest.itineraries[0]?.duration || '7 days',
          travelers: '2-8 people',
          description: dest.description,
          highlight: dest.highlights[0] || 'Amazing Experience'
        }));
        
        setDestinations(destinationsData);
      });
    };

    loadDestinations();
  }, [withLoading]);

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured Destinations
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our handpicked selection of extraordinary destinations that offer unforgettable experiences and lasting memories.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : (
            destinations.slice(0, 6).map((destination) => (
              <Link
                key={destination.id}
                to={`/destinations/${destination.slug}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden block"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-48 md:h-56">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-gray-900">{destination.highlight}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-gold-500 text-white px-3 py-1 rounded-full">
                    <span className="text-sm font-bold">From ${destination.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{destination.country}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                      <span className="text-sm text-gray-500">({destination.reviews})</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors">
                    {destination.name}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {destination.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{destination.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{destination.travelers}</span>
                    </div>
                  </div>

                  <div className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 group-hover:shadow-lg">
                    <span>Explore Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            to="/destinations"
            className="bg-white border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 inline-block"
          >
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;