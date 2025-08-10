import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CardSkeleton } from "./common/SkeletonLoader/SkeletonLoader";
import { useLoading } from "../hooks/useLoading";
import axios from "axios";
import { Destination } from "../types";
import DestinationCard from "./common/DestinationCard";

type Destinations = Array<Destination>;
const FeaturedDestinations = () => {
  const { isLoading, withLoading } = useLoading(true);
  const [destinations, setDestinations] = useState<Destinations>([]);

  useEffect(() => {
    const loadDestinations = async () => {
      await withLoading(async () => {
        const allDestinations = await getDestinations();
        // Convert to the format expected by the component
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
  const getDestinations = async ({ offset = 0, limit = 6 } = {}) => {
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
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured Destinations
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our handpicked selection of extraordinary destinations that
            offer unforgettable experiences and lasting memories.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? // Loading skeletons
              Array.from({ length: 6 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            : destinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
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
