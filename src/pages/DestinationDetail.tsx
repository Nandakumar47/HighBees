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
  MessageCircle,
} from "lucide-react";
import { Destination } from "../data/destinationsData";
import PageLoader from "../components/PageLoader";
import Enquiry from "./Enquiry";
import BackButton from "../components/common/BackButton/BackButton";
import { useLoading } from "../hooks/useLoading";
import { ROUTES, CONTACT_INFO } from "../utils/constants";
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

  // WhatsApp business inquiry function
  const handleWhatsAppInquiry = () => {
    if (!destination) return;

    const regionName = destination.name;
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
    window.open(whatsappUrl, "_blank");
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
      const response = await axios.get(`/destination/${destinationId}`);
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
              <button
                onClick={handleWhatsAppInquiry}
                className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-3 animate-slide-up">
              {destination.name}
            </h1>
            <p
              className="text-lg md:text-xl mb-2 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              {destination.country}
            </p>
            <p
              className="text-base md:text-lg mb-8 max-w-2xl mx-auto animate-slide-up text-gray-200"
              style={{ animationDelay: "0.4s" }}
            >
              {destination.description}
            </p>
            <div
              className="flex flex-wrap justify-center gap-4 animate-slide-up"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <span className="text-xs font-medium">
                  Best Time: {destination.bestTimeToVisit.months}
                </span>
              </div>
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <span className="text-xs font-medium">
                  From {destination.budgetRange.budget}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-36 bg-white border-b border-gray-200 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
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
                className={`py-3 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300"
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
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-12">
            {/* Key Information */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Destination Highlights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {destination.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Attractions Map Placeholder */}
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                  <MapPin className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-base font-medium text-gray-900 mb-2">
                    Interactive Map
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Explore key attractions and points of interest
                  </p>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {destination.attractions.map((attraction, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg p-3 text-left"
                      >
                        <h4 className="font-medium text-gray-900 text-sm">
                          {attraction.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {attraction.type}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {attraction.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Essential Information */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Essential Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-4 h-4 text-primary-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          Best Time to Visit
                        </p>
                        <p className="text-xs text-gray-600">
                          {destination.bestTimeToVisit.months}
                        </p>
                        <p className="text-xs text-gray-500">
                          {destination.bestTimeToVisit.weather}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Plane className="w-4 h-4 text-primary-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          Visa Requirements
                        </p>
                        <p className="text-xs text-gray-600">
                          {destination.visaRequirements.details}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <CreditCard className="w-4 h-4 text-primary-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          Currency
                        </p>
                        <p className="text-xs text-gray-600">
                          {destination.currency.name} (
                          {destination.currency.code})
                        </p>
                        <p className="text-xs text-gray-500">
                          {destination.currency.exchangeRate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Globe className="w-4 h-4 text-primary-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          Language
                        </p>
                        <p className="text-xs text-gray-600">
                          {destination.language.primary}
                        </p>
                        {destination.language.others && (
                          <p className="text-xs text-gray-500">
                            Also: {destination.language.others.join(", ")}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Thermometer className="w-4 h-4 text-primary-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          Climate
                        </p>
                        <p className="text-xs text-gray-600">
                          {destination.weather.climate}
                        </p>
                        <p className="text-xs text-gray-500">
                          Temp: {destination.bestTimeToVisit.temperature}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Budget Guide */}
                <div className="bg-primary-50 rounded-lg p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Budget Guide
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Budget</span>
                      <span className="font-medium text-green-600 text-sm">
                        {destination.budgetRange.budget}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Mid-range</span>
                      <span className="font-medium text-blue-600 text-sm">
                        {destination.budgetRange.midRange}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Luxury</span>
                      <span className="font-medium text-purple-600 text-sm">
                        {destination.budgetRange.luxury}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Itineraries Tab */}
        {activeTab === "itineraries" && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Sample Itineraries
              </h2>
              <p className="text-base text-gray-500 max-w-3xl mx-auto">
                Choose from our carefully crafted itineraries or let us
                customize one just for you
              </p>
            </div>

            {/* Itinerary Selection */}
            <div className="flex flex-wrap justify-center gap-3">
              {destination.itineraries.map((itinerary) => (
                <button
                  key={itinerary.id}
                  onClick={() => setSelectedItinerary(itinerary.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    selectedItinerary === itinerary.id
                      ? "bg-primary-600 text-white"
                      : "bg-white border border-gray-300 text-gray-600 hover:border-primary-300"
                  }`}
                >
                  {itinerary.title}
                </button>
              ))}
            </div>

            {/* Selected Itinerary Details */}
            {selectedItineraryData && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-primary-500 to-primary-700 text-white p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {selectedItineraryData.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-primary-100">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">
                            {selectedItineraryData.duration}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span className="text-sm">
                            From ${selectedItineraryData.price}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="mt-4 md:mt-0 bg-white text-primary-600 hover:bg-gray-100 font-medium px-5 py-2.5 rounded-lg transition-colors text-sm">
                      Customize This Trip
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-base font-medium text-gray-900 mb-3">
                      Trip Highlights
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedItineraryData.highlights.map(
                        (highlight, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span className="text-gray-600 text-sm">
                              {highlight}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Day by Day */}
                  <div>
                    <h4 className="text-base font-medium text-gray-900 mb-4">
                      Day-by-Day Itinerary
                    </h4>
                    <div className="space-y-6">
                      {selectedItineraryData.dayByDay.map((day, index) => (
                        <div key={index} className="flex space-x-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 font-medium text-sm">
                              {day.day}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900 mb-1 text-sm">
                              {day.title}
                            </h5>
                            <ul className="space-y-1">
                              {day.activities.map((activity, actIndex) => (
                                <li
                                  key={actIndex}
                                  className="text-gray-500 text-xs flex items-start space-x-2"
                                >
                                  <ArrowRight className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                                  <span>{activity}</span>
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

            {/* Customization Options */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                Customization Options
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 text-sm">
                    Accommodations
                  </h4>
                  <ul className="space-y-1.5">
                    {destination.customizationOptions.accommodations.map(
                      (option, index) => (
                        <li
                          key={index}
                          className="text-xs text-gray-500 flex items-center space-x-2"
                        >
                          <Check className="w-3 h-3 text-green-500" />
                          <span>{option}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 text-sm">
                    Transportation
                  </h4>
                  <ul className="space-y-1.5">
                    {destination.customizationOptions.transportation.map(
                      (option, index) => (
                        <li
                          key={index}
                          className="text-xs text-gray-500 flex items-center space-x-2"
                        >
                          <Check className="w-3 h-3 text-green-500" />
                          <span>{option}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 text-sm">
                    Activities
                  </h4>
                  <ul className="space-y-1.5">
                    {destination.customizationOptions.activities.map(
                      (option, index) => (
                        <li
                          key={index}
                          className="text-xs text-gray-500 flex items-center space-x-2"
                        >
                          <Check className="w-3 h-3 text-green-500" />
                          <span>{option}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 text-sm">
                    Special Requirements
                  </h4>
                  <ul className="space-y-1.5">
                    {destination.customizationOptions.specialRequirements.map(
                      (option, index) => (
                        <li
                          key={index}
                          className="text-xs text-gray-500 flex items-center space-x-2"
                        >
                          <Check className="w-3 h-3 text-green-500" />
                          <span>{option}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Photo Gallery
              </h2>
              <p className="text-base text-gray-500">
                Explore the beauty of {destination.name}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {destination.gallery.map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
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
                    <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Traveler Reviews
              </h2>
              <p className="text-base text-gray-500">
                See what our customers say about {destination.name}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {destination.reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-lg shadow-lg p-5"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">
                        {review.name}
                      </h4>
                      <p className="text-xs text-gray-500">{review.tripType}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-2">
                      {review.date}
                    </span>
                  </div>

                  <p className="text-gray-600 leading-relaxed text-sm">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enquiry Tab */}
        {activeTab === "enquiry" && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Make Enquiry for {destination.name}
              </h2>
              <p className="text-base text-gray-500">
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

      {/* Floating WhatsApp Button for Mobile */}
      <div className="fixed bottom-20 right-5 z-40 sm:hidden">
        <button
          onClick={handleWhatsAppInquiry}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          aria-label="Contact us on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
        </button>
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
