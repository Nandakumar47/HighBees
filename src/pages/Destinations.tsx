import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useLoading } from "../hooks/useLoading";
import { CardSkeleton } from "../components/common/SkeletonLoader/SkeletonLoader";
import axios from "axios";
import { Destination } from "../types";
import DestinationCard from "../components/common/DestinationCard";
// const continents = [
//   { id: "all", name: "All Continents" },
//   { id: "asia", name: "Asia" },
//   { id: "africa", name: "Africa" },
//   { id: "europe", name: "Europe" },
//   { id: "americas", name: "Americas" },
//   { id: "oceania", name: "Oceania" },
// ];

// const priceRanges = [
//   { id: "all", name: "All Prices" },
//   { id: "budget", name: "Under $1,000" },
//   { id: "mid", name: "$1,000 - $2,000" },
//   { id: "luxury", name: "Over $2,000" },
// ];
type DestinationsType = Array<Destination>;
const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedContinent, setSelectedContinent] = useState("all");
  // const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [destinations, setDestinations] = useState<DestinationsType>([]);
  const { isLoading, withLoading } = useLoading(true);

  useEffect(() => {
    const loadDestinations = async () => {
      await withLoading(async () => {
        const allDestinations = await getDestinations();
        const destinationsData = allDestinations.map((dest) => ({
          id: dest.id,
          name: dest.name,
          country: dest.country || dest.name,
          slug: dest.name.toLowerCase(),
          image: dest.hero_image,
          description: dest.description,
        }));

        setDestinations(destinationsData);
      });
    };

    loadDestinations();
  }, [withLoading]);
  const getDestinations = async (offset?: number, limit?: number) => {
    try {
      const response = await axios.get("/destinations", {
        params: { offset, limit },
      });
      return response.data.data.destinations;
    } catch (error) {
      console.error("Error fetching destinations:", error);
      return [];
    }
  };
  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
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
            Discover amazing places around the world and start planning your
            next adventure
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-4 gap-4 mb-6">
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
            {/* <select
              value={selectedContinent}
              onChange={(e) => setSelectedContinent(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {continents.map((continent) => (
                <option key={continent.id} value={continent.id}>
                  {continent.name}
                </option>
              ))}
            </select> */}

            {/* Price Range Filter */}
            {/* <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {priceRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.name}
                </option>
              ))}
            </select> */}
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredDestinations.length} of {destinations.length}{" "}
            destinations
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
          <div
            className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}
          >
            {filteredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No destinations found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;
