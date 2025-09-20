import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Select from "../components/common/Input/Select";
import { useLoading } from "../hooks/useLoading";
import { CardSkeleton } from "../components/common/SkeletonLoader/SkeletonLoader";
import axios from "axios";
import { Destination } from "../types";
import DestinationCard from "../components/common/DestinationCard";
import Input from "../components/common/Input/Input";
const countries = [
  { id: "all", name: "All countries" },
  { id: "india", name: "India" },
  { id: "africa", name: "Africa" },
  { id: "europe", name: "Europe" },
  { id: "americas", name: "Americas" },
  { id: "oceania", name: "Oceania" },
];

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
  const getDestinations = async (
    offset?: number,
    limit?: number
  ): Promise<ApiDestination[]> => {
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Explore Destinations
          </h1>
          <p className="text-base md:text-lg text-gray-500 max-w-3xl mx-auto">
            Discover amazing places around the world and start planning your
            next adventure
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <Input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
            />

            {/* country Filter */}
            <Select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              placeholder="All countries"
            >
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="text-xs text-gray-400">
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
            <div className="text-gray-300 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No destinations found
            </h3>
            <p className="text-gray-500 text-sm">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;
