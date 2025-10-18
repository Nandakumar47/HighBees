import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  MapPin,
  Calendar,
  DollarSign,
  Star,
  Clock,
  Plane,
  CreditCard,
  Globe,
  Thermometer,
  Camera,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  ArrowRight,
} from "lucide-react";
import { Destination } from "../data/destinationsData";
import PageLoader from "../components/PageLoader";
import Enquiry from "./Enquiry";
import BackButton from "../components/common/BackButton/BackButton";
import { useLoading } from "../hooks/useLoading";
import { ROUTES } from "../utils/constants";
import axios from "axios";

const DestinationDetail = () => {
  const location = useLocation();
  const { id: destinationId } = location.state || {};
  const [destination, setDestination] = useState<Destination | null>(null);
  const [selectedItinerary, setSelectedItinerary] = useState<string>("");
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<number>(0);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { isLoading: pageLoading, withLoading } = useLoading(true);

  // Smooth scroll to top of tab content when tab changes
  const scrollToTabContent = () => {
    const tabContentElement = document.getElementById("tab-content-area");
    if (tabContentElement) {
      tabContentElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Handle tab change with smooth scroll
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Small delay to ensure tab content is rendered before scrolling
    setTimeout(() => {
      scrollToTabContent();
    }, 100);
  };


  useEffect(() => {
    const loadDestination = async () => {
      await withLoading(async () => {
        if (destinationId) {
          const destinationDetails = await getDestinationById(destinationId);
          setDestination(destinationDetails);
          if (destinationDetails && destinationDetails.itineraries.length > 0) {
            setSelectedItinerary(destinationDetails.itineraries[0].id);
          }
        }
      });
    };

    loadDestination();
  }, [destinationId, withLoading]);
  const getDestinationById = async (destinationId: number) => {
    try {
      const response = await axios.get(`/api/destination/${destinationId}`);
      return response.data.data.destination;
    } catch (error) {
      console.error("Error fetching destinations:", error);
      return {};
    }
  };

  if (pageLoading) {
    return <PageLoader message="Loading destination details..." />;
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Destination Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The destination you're looking for doesn't exist.
          </p>
          <BackButton
            to={ROUTES.DESTINATIONS}
            label="Browse All Destinations"
            variant="prominent"
          />
        </div>
      </div>
    );
  }

  const selectedItineraryData = destination.itineraries.find(
    (it) => it.id === selectedItinerary
  );

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Navigation Bar with Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Left side - Back button and breadcrumb */}
            <div className="flex items-center space-x-4">
              <BackButton
                to={ROUTES.DESTINATIONS}
                label="Destinations"
                variant="ghost"
                size="sm"
              />
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-900 font-medium">
                  {destination.name}
                </span>
              </div>
            </div>

            {/* Right side - Quick actions */}
            <div className="flex items-center space-x-3">
              {/* WhatsApp button removed - using global floating button instead */}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with improved hierarchy */}
      <section className="relative h-[75vh] overflow-hidden">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            {/* Primary heading with better hierarchy */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight animate-slide-up">
              {destination.name}
            </h1>
            <p
              className="text-xl sm:text-2xl md:text-3xl mb-4 animate-slide-up font-light"
              style={{ animationDelay: "0.2s" }}
            >
              {destination.country}
            </p>
            <p
              className="text-lg sm:text-xl md:text-2xl mb-12 max-w-4xl mx-auto animate-slide-up text-gray-100 leading-relaxed font-light"
              style={{ animationDelay: "0.4s" }}
            >
              {destination.description}
            </p>
            <div
              className="flex flex-wrap justify-center gap-6 animate-slide-up"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                <span className="text-sm font-medium">
                  Best Time: {destination.bestTimeToVisit.months}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                <span className="text-sm font-medium">
                  From {destination.budgetRange.budget}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs with improved hierarchy */}
      <section className="sticky top-36 bg-white border-b border-gray-200 z-30">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex space-x-10 overflow-x-auto">
            {[
              { id: "overview", label: "Overview" },
              { id: "itineraries", label: "Itineraries" },
              { id: "gallery", label: "Gallery" },
              { id: "reviews", label: "Reviews" },
              { id: "enquiry", label: "Make Enquiry" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`py-4 px-3 border-b-2 font-medium text-base whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div
        id="tab-content-area"
        className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-16"
      >
        {/* Overview Tab with improved hierarchy */}
        {activeTab === "overview" && (
          <div className="space-y-16">
            {/* Key Information with better spacing */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                  Destination Highlights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                  {destination.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-base leading-relaxed">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Attractions Map Placeholder with improved hierarchy */}
                <div className="bg-gray-50 rounded-2xl p-8 text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Interactive Map
                  </h3>
                  <p className="text-gray-600 text-base mb-6">
                    Explore key attractions and points of interest
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.attractions.map((attraction, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl p-5 text-left shadow-sm"
                      >
                        <h4 className="font-semibold text-gray-900 text-base mb-2">
                          {attraction.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {attraction.type}
                        </p>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {attraction.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {/* Essential Information with improved hierarchy */}
                <div className="bg-gray-50 rounded-2xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Essential Information
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <Calendar className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 text-base mb-1">
                          Best Time to Visit
                        </p>
                        <p className="text-sm text-gray-700 mb-1">
                          {destination.bestTimeToVisit.months}
                        </p>
                        <p className="text-sm text-gray-500">
                          {destination.bestTimeToVisit.weather}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Plane className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 text-base mb-1">
                          Visa Requirements
                        </p>
                        <p className="text-sm text-gray-700">
                          {destination.visaRequirements.details}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <CreditCard className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 text-base mb-1">
                          Currency
                        </p>
                        <p className="text-sm text-gray-700 mb-1">
                          {destination.currency.name} (
                          {destination.currency.code})
                        </p>
                        <p className="text-sm text-gray-500">
                          {destination.currency.exchangeRate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Globe className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 text-base mb-1">
                          Language
                        </p>
                        <p className="text-sm text-gray-700 mb-1">
                          {destination.language.primary}
                        </p>
                        {destination.language.others && (
                          <p className="text-sm text-gray-500">
                            Also: {destination.language.others.join(", ")}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Thermometer className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 text-base mb-1">
                          Climate
                        </p>
                        <p className="text-sm text-gray-700 mb-1">
                          {destination.weather.climate}
                        </p>
                        <p className="text-sm text-gray-500">
                          Temp: {destination.bestTimeToVisit.temperature}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Budget Guide with improved hierarchy */}
                <div className="bg-primary-50 rounded-2xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Budget Guide
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-base font-medium">
                        Budget
                      </span>
                      <span className="font-semibold text-green-600 text-base">
                        {destination.budgetRange.budget}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-base font-medium">
                        Mid-range
                      </span>
                      <span className="font-semibold text-blue-600 text-base">
                        {destination.budgetRange.midRange}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-base font-medium">
                        Luxury
                      </span>
                      <span className="font-semibold text-purple-600 text-base">
                        {destination.budgetRange.luxury}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Itineraries Tab with improved hierarchy */}
        {activeTab === "itineraries" && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Sample Itineraries
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                Choose from our carefully crafted itineraries or let us
                customize one just for you
              </p>
            </div>

            {/* Itinerary Selection with better spacing */}
            <div className="flex flex-wrap justify-center gap-4">
              {destination.itineraries.map((itinerary) => (
                <button
                  key={itinerary.id}
                  onClick={() => setSelectedItinerary(itinerary.id)}
                  className={`px-6 py-3 rounded-xl font-medium text-base transition-all duration-300 ${
                    selectedItinerary === itinerary.id
                      ? "bg-primary-600 text-white shadow-lg"
                      : "bg-white border border-gray-300 text-gray-700 hover:border-primary-300 hover:shadow-md"
                  }`}
                >
                  {itinerary.title}
                </button>
              ))}
            </div>

            {/* Selected Itinerary Details with improved hierarchy */}
            {selectedItineraryData && (
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-primary-500 to-primary-700 text-white p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">
                        {selectedItineraryData.title}
                      </h3>
                      <div className="flex items-center space-x-6 text-primary-100">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-5 h-5" />
                          <span className="text-base font-medium">
                            {selectedItineraryData.duration}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-5 h-5" />
                          <span className="text-base font-medium">
                            From ${selectedItineraryData.price}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="mt-6 md:mt-0 bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl transition-colors text-base">
                      Customize This Trip
                    </button>
                  </div>
                </div>

                <div className="p-8">
                  {/* Highlights with better hierarchy */}
                  <div className="mb-10">
                    <h4 className="text-xl font-semibold text-gray-900 mb-6">
                      Trip Highlights
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedItineraryData.highlights.map(
                        (highlight, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                            <span className="text-gray-700 text-base leading-relaxed">
                              {highlight}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Day by Day with improved hierarchy */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-8">
                      Day-by-Day Itinerary
                    </h4>
                    <div className="space-y-8">
                      {selectedItineraryData.dayByDay.map((day, index) => (
                        <div key={index} className="flex space-x-6">
                          <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 font-bold text-base">
                              {day.day}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900 mb-3 text-lg">
                              {day.title}
                            </h5>
                            <ul className="space-y-2">
                              {day.activities.map((activity, actIndex) => (
                                <li
                                  key={actIndex}
                                  className="text-gray-600 text-base flex items-start space-x-3"
                                >
                                  <ArrowRight className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                                  <span className="leading-relaxed">
                                    {activity}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Customization Options with improved hierarchy */}
            <div className="bg-gray-50 rounded-3xl p-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Customization Options
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 text-base">
                    Accommodations
                  </h4>
                  <ul className="space-y-3">
                    {destination.customizationOptions.accommodations.map(
                      (option, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 flex items-center space-x-3"
                        >
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="leading-relaxed">{option}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 text-base">
                    Transportation
                  </h4>
                  <ul className="space-y-3">
                    {destination.customizationOptions.transportation.map(
                      (option, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 flex items-center space-x-3"
                        >
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="leading-relaxed">{option}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 text-base">
                    Activities
                  </h4>
                  <ul className="space-y-3">
                    {destination.customizationOptions.activities.map(
                      (option, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 flex items-center space-x-3"
                        >
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="leading-relaxed">{option}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 text-base">
                    Special Requirements
                  </h4>
                  <ul className="space-y-3">
                    {destination.customizationOptions.specialRequirements.map(
                      (option, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 flex items-center space-x-3"
                        >
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="leading-relaxed">{option}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Tab with improved hierarchy */}
        {activeTab === "gallery" && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Photo Gallery
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                Explore the beauty of {destination.name}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destination.gallery.map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-square"
                  onClick={() => {
                    setSelectedGalleryImage(index);
                    setIsGalleryModalOpen(true);
                  }}
                >
                  <img
                    src={image}
                    alt={`${destination.name} ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <Camera className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Tab with improved hierarchy */}
        {activeTab === "reviews" && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Traveler Reviews
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                See what our customers say about {destination.name}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {destination.reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl shadow-lg p-8"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-base">
                        {review.name}
                      </h4>
                      <p className="text-sm text-gray-600">{review.tripType}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-3">
                      {review.date}
                    </span>
                  </div>

                  <p className="text-gray-700 leading-relaxed text-base">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enquiry Tab with improved hierarchy */}
        {activeTab === "enquiry" && (
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Make Enquiry for {destination.name}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                Tell us about your trip and we'll tailor a plan for you
              </p>
            </div>

            <Enquiry
              embedded
              initialDestination={
                destination.name !== destination.country
                  ? `${destination.name}, ${destination.country}`
                  : destination.name
              }
              hideDestinationField
              title={`Make Enquiry`}
            />
          </div>
        )}
      </div>


      {/* Gallery Modal */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-6xl w-full">
            <button
              onClick={() => setIsGalleryModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>

            <img
              src={destination.gallery[selectedGalleryImage]}
              alt={`${destination.name} ${selectedGalleryImage + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain"
            />

            <button
              onClick={() =>
                setSelectedGalleryImage((prev) =>
                  prev === 0 ? destination.gallery.length - 1 : prev - 1
                )
              }
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={() =>
                setSelectedGalleryImage((prev) =>
                  prev === destination.gallery.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {destination.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedGalleryImage(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === selectedGalleryImage
                      ? "bg-white"
                      : "bg-white bg-opacity-50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationDetail;
