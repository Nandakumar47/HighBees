import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CardSkeleton } from "./common/SkeletonLoader/SkeletonLoader";
import { useLoading } from "../hooks/useLoading";
import { useToast } from "./common/Toast/Toast";
import { getErrorMessage } from "../utils/apiErrorHandler";
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
  const { showError } = useToast();

  useEffect(() => {
    const loadDestinations = async () => {
      try {
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
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        showError(errorMessage);
      }
    };

    loadDestinations();
  }, [withLoading, showError]);
  const handleReload = async () => {
    try {
      await withLoading(async () => {
        const allDestinations = await getDestinations();
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
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
    }
  };
  const getDestinations = async ({ offset = 0, limit = 6 } = {}): Promise<
    ApiDestination[]
  > => {
    try {
      const response = await axios.get("/api/destinations", {
        params: { offset, limit },
      });
      return response.data.data.destinations;
    } catch (error) {
      console.error("Error fetching destinations:", error);
      return [];
    }
  };
  return (
    <section className="pt-6 sm:pt-10 lg:py-16 bg-gray-50">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with improved hierarchy */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Featured Destinations
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Discover our handpicked selection of extraordinary destinations that
            offer unforgettable experiences and lasting memories.
          </p>
        </div>

        {/* Destinations Grid with better spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
              <div className="flex flex-col items-center justify-center text-center py-20 px-8 bg-white rounded-3xl border border-gray-200 shadow-sm">
                <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600 ring-1 ring-primary-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8"
                    aria-hidden="true"
                  >
                    <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7Zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5Z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  No featured destinations available
                </h3>
                <p className="text-gray-600 max-w-lg leading-relaxed mb-8">
                  We're curating our next set of stunning getaways. In the
                  meantime, explore all destinations or try reloading.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="button"
                    onClick={handleReload}
                    className="inline-flex items-center justify-center rounded-lg bg-primary-600 text-white px-6 py-3 font-medium shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                  >
                    Reload
                  </button>
                  <Link
                    to="/destinations"
                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 px-6 py-3 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                  >
                    Browse all destinations
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* View All Button - De-emphasized secondary action */}
        <div className="text-center mt-16">
          <Link
            to="/destinations"
            className="inline-flex items-center px-8 py-3 text-base font-medium text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 rounded-lg transition-all duration-200"
          >
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
