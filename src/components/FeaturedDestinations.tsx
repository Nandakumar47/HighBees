import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CardSkeleton } from "./common/SkeletonLoader/SkeletonLoader";
import { useLoading } from "../hooks/useLoading";
import axios from "axios";
import { Destination } from "../types";
import DestinationCard from "./common/DestinationCard";

type Destinations = Array<Destination>;
interface ApiDestination {
  id: number;
  name: string;
  country?: string;
  hero_image: string;
  description: string;
}
const FeaturedDestinations = () => {
  const { isLoading, withLoading } = useLoading(true);
  const [destinations, setDestinations] = useState<Destinations>([]);

  useEffect(() => {
    const loadDestinations = async () => {
      await withLoading(async () => {
        const allDestinations = await getDestinations();
        // Convert to the format expected by the component
        const destinationsData = allDestinations.map(
          (dest: ApiDestination) => ({
            id: dest.id,
            name: dest.name,
            country: dest.country || dest.name,
            slug: dest.name.toLowerCase(),
            image: dest.hero_image,
            description: dest.description,
          })
        );

        setDestinations(destinationsData);
      });
    };

    loadDestinations();
  }, [withLoading]);
  const handleReload = async () => {
    await withLoading(async () => {
      const allDestinations = await getDestinations();
      const destinationsData = allDestinations.map((dest: ApiDestination) => ({
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
  const getDestinations = async ({ offset = 0, limit = 6 } = {}): Promise<
    ApiDestination[]
  > => {
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
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Featured Destinations
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-3xl mx-auto">
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
          {!isLoading && destinations.length === 0 ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-600 ring-1 ring-primary-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-7 w-7"
                    aria-hidden="true"
                  >
                    <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7Zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5Z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                  No featured destinations available
                </h3>
                <p className="mt-2 text-gray-600 max-w-md">
                  We’re curating our next set of stunning getaways. In the
                  meantime, explore all destinations or try reloading.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={handleReload}
                    className="inline-flex items-center justify-center rounded-lg bg-primary-600 text-white px-5 py-2.5 font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                  >
                    Reload
                  </button>
                  <Link
                    to="/destinations"
                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 px-5 py-2.5 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                  >
                    Browse all destinations
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/destinations"
            className="inline-flex items-center px-6 py-2.5 text-base font-medium text-primary-600 hover:text-primary-700 border border-primary-300 hover:border-primary-400 bg-white hover:bg-primary-50 rounded-lg transition-all duration-200"
          >
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
