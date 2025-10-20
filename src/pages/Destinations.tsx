import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Select from "../components/common/Input/Select";
import { useLoading } from "../hooks/useLoading";
import { CardSkeleton } from "../components/common/SkeletonLoader/SkeletonLoader";
import { useToast } from "../components/common/Toast/Toast";
import { getErrorMessage } from "../utils/apiErrorHandler";
import axios from "axios";
import { Destination } from "../types";
import DestinationCard from "../components/common/DestinationCard";
import Input from "../components/common/Input/Input";

type DestinationsType = Array<Destination>;
interface ApiDestination {
  id: number;
  name: string;
  country?: string;
  hero_image: string;
  description: string;
}
const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [destinations, setDestinations] = useState<DestinationsType>([]);
  const [countryOptions, setCountryOptions] = useState<
    Array<{ id: string; name: string }>
  >([{ id: "all", name: "All countries" }]);
  const { isLoading, withLoading } = useLoading(true);
  const { showError } = useToast();

  useEffect(() => {
    const loadDestinations = async () => {
      try {
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

          // Build unique country list from fetched data for the filter dropdown
          const uniqueCountries = Array.from(
            new Set(
              destinationsData
                .map((d) => d.country)
                .filter((c): c is string => Boolean(c))
            )
          ).sort((a, b) => a.localeCompare(b));

          setCountryOptions([
            { id: "all", name: "All countries" },
            ...uniqueCountries.map((c) => ({ id: c.toLowerCase(), name: c })),
          ]);
        });
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        showError(errorMessage);
      }
    };

    loadDestinations();
  }, [withLoading, showError]);
  const getDestinations = async (
    offset?: number,
    limit?: number
  ): Promise<ApiDestination[]> => {
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
  const filteredDestinations = destinations.filter((destination) => {
    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch =
      destination.name.toLowerCase().includes(lowerSearch) ||
      destination.country.toLowerCase().includes(lowerSearch);

    const matchesCountry =
      selectedCountry === "all" ||
      destination.country.toLowerCase() === selectedCountry;

    return matchesSearch && matchesCountry;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Explore Destinations
          </h1>
          <p className="text-base md:text-lg text-gray-500 max-w-3xl mx-auto">
            Discover amazing places around the world and start planning your
            next adventure
          </p>
        </div>

        {/* Search and Filters with improved mobile layout */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 sm:mb-6">
            {/* Search */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={Search}
              />
            </div>

            {/* Country Filter */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                placeholder="All countries"
              >
                {countryOptions.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-gray-400">
            Showing {filteredDestinations.length} of {destinations.length}{" "}
            destinations
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : (
          /* Destinations Grid/List */
          <div
            className={
              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            }
          >
            {filteredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredDestinations.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <div className="text-gray-300 mb-4">
              <Search className="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-2">
              No destinations found
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;
