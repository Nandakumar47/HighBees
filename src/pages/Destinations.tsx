import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Calendar, Users, Filter, Grid, List, MessageCircle } from 'lucide-react';
import { getAllDestinations } from '../data/destinationsData';
import { useLoading } from '../hooks/useLoading';
import { CardSkeleton } from '../components/common/SkeletonLoader/SkeletonLoader';
import { CONTACT_INFO } from '../utils/constants';

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [destinations, setDestinations] = useState([]);
  const { isLoading, withLoading } = useLoading(true);

  // WhatsApp inquiry for region
  const handleRegionWhatsAppInquiry = (regionName: string) => {
    const message = `Hi! I'm interested in learning more about travel destinations in ${regionName}. Please provide detailed information about:

• Popular attractions
• Recommended duration of stay
• Best time to visit
• Accommodation options
• Estimated costs
• Available tour packages

Looking forward to your expert guidance!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const continents = [
    { id: 'all', name: 'All Continents' },
    { id: 'asia', name: 'Asia' },
    { id: 'africa', name: 'Africa' },
    { id: 'europe', name: 'Europe' },
    { id: 'americas', name: 'Americas' },
    { id: 'oceania', name: 'Oceania' }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: 'budget', name: 'Under $1,000' },
    { id: 'mid', name: '$1,000 - $2,000' },
    { id: 'luxury', name: 'Over $2,000' }
  ];

  useEffect(() => {
    const loadDestinations = async () => {
      await withLoading(async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Get destinations from centralized data
        const allDestinations = getAllDestinations();
        
        // Convert to the format expected by the component
        const destinationsData = allDestinations.map(dest => {
          const price = dest.itineraries[0]?.price || 999;
          let priceRange = 'mid';
          if (price < 1000) priceRange = 'budget';
          else if (price > 2000) priceRange = 'luxury';
          
          return {
            id: dest.id,
            name: dest.name,
            country: dest.country,
            continent: dest.continent.toLowerCase(),
            slug: dest.id,
            image: dest.heroImage,
            price: price,
            priceRange: priceRange,
            rating: dest.reviews[0]?.rating || 4.8,
            reviews: dest.reviews.length * 100 + Math.floor(Math.random() * 900) + 100,
            duration: dest.itineraries[0]?.duration || '7 days',
            travelers: '2-8 people',
            description: dest.description,
            highlights: dest.highlights.slice(0, 4)
          };
        });
        
        setDestinations(destinationsData);
      });
    };

    loadDestinations();
  }, [withLoading]);

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesContinent = selectedContinent === 'all' || destination.continent === selectedContinent;
    const matchesPriceRange = selectedPriceRange === 'all' || destination.priceRange === selectedPriceRange;
    
    return matchesSearch && matchesContinent && matchesPriceRange;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Destinations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover amazing places around the world and start planning your next adventure
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Continent Filter */}
            <select
              value={selectedContinent}
              onChange={(e) => setSelectedContinent(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {continents.map(continent => (
                <option key={continent.id} value={continent.id}>
                  {continent.name}
                </option>
              ))}
            </select>

            {/* Price Range Filter */}
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {priceRanges.map(range => (
                <option key={range.id} value={range.id}>
                  {range.name}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredDestinations.length} of {destinations.length} destinations
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : (
          /* Destinations Grid/List */
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}`}>
            {filteredDestinations.map((destination) => (
              <Link
                key={destination.id}
                to={`/destinations/${destination.slug}`}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden block ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-1/3' : 'h-56'}`}>
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-gray-900">${destination.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
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

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.highlights.slice(0, 3).map((highlight, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-lg transition-colors">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No destinations found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;