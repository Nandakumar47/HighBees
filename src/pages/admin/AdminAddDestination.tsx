import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LogOut, ArrowLeft, Plus, X, Trash2 } from "lucide-react";
import Input from "../../components/common/Input/Input";
import { useToast } from "../../components/common/Toast/Toast";
import { useLoading } from "../../hooks/useLoading";
import { destinationService } from "../../services/destinationService";
import { CreateDestinationData } from "../../services/types/destination.types";
import { getErrorMessage } from "../../utils/apiErrorHandler";
import PageLoader from "../../components/PageLoader";

const AdminAddDestination = () => {
  const { logout } = useAuth();
  const { showToast } = useToast();
  const { isLoading, withLoading } = useLoading(false);
  const navigate = useNavigate();

  // Basic Information
  const [formData, setFormData] = useState<CreateDestinationData>({
    name: "",
    country: "",
    continent: "",
    heroImage: "",
    gallery: [],
    description: "",
    highlights: [],
    bestTimeToVisit: {
      months: "",
      weather: "",
      temperature: "",
    },
    visaRequirements: {
      required: false,
      details: "",
      processingTime: "",
    },
    currency: {
      code: "",
      name: "",
      exchangeRate: "",
    },
    language: {
      primary: "",
      others: [],
    },
    weather: {
      climate: "",
      rainySeasons: "",
      drySeasons: "",
    },
    budgetRange: {
      budget: "",
      midRange: "",
      luxury: "",
    },
    itineraries: [],
    attractions: [],
    reviews: [],
    customizationOptions: {
      accommodations: [],
      transportation: [],
      activities: [],
      specialRequirements: [],
    },
    enquiries: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [highlightInput, setHighlightInput] = useState("");
  const [galleryInput, setGalleryInput] = useState("");
  const [languageOtherInput, setLanguageOtherInput] = useState("");
  const [accommodationInput, setAccommodationInput] = useState("");
  const [transportationInput, setTransportationInput] = useState("");
  const [activityInput, setActivityInput] = useState("");
  const [specialRequirementInput, setSpecialRequirementInput] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof CreateDestinationData],
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const addToArray = (
    arrayName: keyof CreateDestinationData,
    value: string
  ) => {
    if (!value.trim()) return;

    setFormData((prev) => {
      const currentArray = prev[arrayName] as string[];
      return {
        ...prev,
        [arrayName]: [...currentArray, value.trim()],
      };
    });

    // Clear input based on array type
    switch (arrayName) {
      case "highlights":
        setHighlightInput("");
        break;
      case "gallery":
        setGalleryInput("");
        break;
      case "language":
        setLanguageOtherInput("");
        break;
      default:
        break;
    }
  };

  const removeFromArray = (
    arrayName: keyof CreateDestinationData,
    index: number
  ) => {
    setFormData((prev) => {
      const currentArray = prev[arrayName] as string[];
      return {
        ...prev,
        [arrayName]: currentArray.filter((_, i) => i !== index),
      };
    });
  };

  const addCustomizationOption = (
    category: keyof typeof formData.customizationOptions,
    value: string
  ) => {
    if (!value.trim()) return;

    setFormData((prev) => ({
      ...prev,
      customizationOptions: {
        ...prev.customizationOptions,
        [category]: [
          ...prev.customizationOptions[category],
          value.trim(),
        ],
      },
    }));

    // Clear input
    switch (category) {
      case "accommodations":
        setAccommodationInput("");
        break;
      case "transportation":
        setTransportationInput("");
        break;
      case "activities":
        setActivityInput("");
        break;
      case "specialRequirements":
        setSpecialRequirementInput("");
        break;
    }
  };

  const removeCustomizationOption = (
    category: keyof typeof formData.customizationOptions,
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      customizationOptions: {
        ...prev.customizationOptions,
        [category]: prev.customizationOptions[category].filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  // Itinerary Management
  const [currentItinerary, setCurrentItinerary] = useState({
    id: "",
    title: "",
    duration: "",
    price: "",
    highlights: [] as string[],
    dayByDay: [] as Array<{
      id: number;
      day: number;
      title: string;
      activities: string[];
    }>,
  });
  const [itineraryHighlightInput, setItineraryHighlightInput] = useState("");
  const [currentDay, setCurrentDay] = useState({
    day: "",
    title: "",
    activities: [] as string[],
  });
  const [dayActivityInput, setDayActivityInput] = useState("");

  const addItinerary = () => {
    if (!currentItinerary.title || !currentItinerary.duration || !currentItinerary.price) {
      showToast("Please fill in itinerary title, duration, and price", "error");
      return;
    }

    const newItinerary = {
      id: currentItinerary.id || `itinerary-${Date.now()}`,
      title: currentItinerary.title,
      duration: currentItinerary.duration,
      price: parseFloat(currentItinerary.price),
      highlights: currentItinerary.highlights,
      dayByDay: currentItinerary.dayByDay,
    };

    setFormData((prev) => ({
      ...prev,
      itineraries: [...prev.itineraries, newItinerary],
    }));

    setCurrentItinerary({
      id: "",
      title: "",
      duration: "",
      price: "",
      highlights: [],
      dayByDay: [],
    });
    setCurrentDay({ day: "", title: "", activities: [] });
  };

  const addDayToItinerary = () => {
    if (!currentDay.day || !currentDay.title) {
      showToast("Please fill in day number and title", "error");
      return;
    }

    const newDay = {
      id: currentItinerary.dayByDay.length + 1,
      day: parseInt(currentDay.day),
      title: currentDay.title,
      activities: currentDay.activities,
    };

    setCurrentItinerary((prev) => ({
      ...prev,
      dayByDay: [...prev.dayByDay, newDay],
    }));

    setCurrentDay({ day: "", title: "", activities: [] });
    setDayActivityInput("");
  };

  // Attraction Management
  const [currentAttraction, setCurrentAttraction] = useState({
    name: "",
    type: "",
    latitude: "",
    longitude: "",
    description: "",
  });

  const addAttraction = () => {
    if (
      !currentAttraction.name ||
      !currentAttraction.type ||
      !currentAttraction.latitude ||
      !currentAttraction.longitude ||
      !currentAttraction.description
    ) {
      showToast("Please fill in all attraction fields", "error");
      return;
    }

    const newAttraction = {
      name: currentAttraction.name,
      type: currentAttraction.type,
      coordinates: [
        parseFloat(currentAttraction.latitude),
        parseFloat(currentAttraction.longitude),
      ] as [number, number],
      description: currentAttraction.description,
    };

    setFormData((prev) => ({
      ...prev,
      attractions: [...prev.attractions, newAttraction],
    }));

    setCurrentAttraction({
      name: "",
      type: "",
      latitude: "",
      longitude: "",
      description: "",
    });
  };

  // Review Management
  const [currentReview, setCurrentReview] = useState({
    name: "",
    rating: "",
    date: "",
    comment: "",
    avatar: "",
    tripType: "",
  });

  const addReview = () => {
    if (
      !currentReview.name ||
      !currentReview.rating ||
      !currentReview.date ||
      !currentReview.comment
    ) {
      showToast("Please fill in review name, rating, date, and comment", "error");
      return;
    }

    const newReview = {
      id: `review-${Date.now()}`,
      name: currentReview.name,
      rating: parseInt(currentReview.rating),
      date: currentReview.date,
      comment: currentReview.comment,
      avatar: currentReview.avatar || "",
      tripType: currentReview.tripType || "",
    };

    setFormData((prev) => ({
      ...prev,
      reviews: [...prev.reviews, newReview],
    }));

    setCurrentReview({
      name: "",
      rating: "",
      date: "",
      comment: "",
      avatar: "",
      tripType: "",
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.continent.trim()) newErrors.continent = "Continent is required";
    if (!formData.heroImage.trim()) newErrors.heroImage = "Hero image is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.bestTimeToVisit.months) newErrors["bestTimeToVisit.months"] = "Best time months is required";
    if (!formData.currency.code) newErrors["currency.code"] = "Currency code is required";
    if (!formData.language.primary) newErrors["language.primary"] = "Primary language is required";
    if (!formData.weather.climate) newErrors["weather.climate"] = "Climate is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    await withLoading(async () => {
      try {
        await destinationService.createDestination(formData);
        showToast("Destination added successfully!", "success");
        navigate("/admin/dashboard");
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        showToast(errorMessage, "error");
      }
    });
  };

  if (isLoading) {
    return <PageLoader message="Adding destination..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                to="/admin/dashboard"
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                Add New Destination
              </h1>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="Destination Name *"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  required
                />
              </div>
              <div>
                <Input
                  label="Country *"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  error={errors.country}
                  required
                />
              </div>
              <div>
                <Input
                  label="Continent *"
                  name="continent"
                  value={formData.continent}
                  onChange={handleInputChange}
                  error={errors.continent}
                  required
                />
              </div>
              <div>
                <Input
                  label="Hero Image URL *"
                  name="heroImage"
                  value={formData.heroImage}
                  onChange={handleInputChange}
                  error={errors.heroImage}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Gallery</h2>
            <div className="flex gap-2 mb-4">
              <Input
                label="Add Gallery Image URL"
                value={galleryInput}
                onChange={(e) => setGalleryInput(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <button
                type="button"
                onClick={() => addToArray("gallery", galleryInput)}
                className="mt-6 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.gallery.map((url, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded"
                >
                  <span className="text-sm text-gray-700 truncate max-w-xs">
                    {url}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFromArray("gallery", index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Highlights</h2>
            <div className="flex gap-2 mb-4">
              <Input
                label="Add Highlight"
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                placeholder="e.g., Beautiful tropical beaches"
              />
              <button
                type="button"
                onClick={() => addToArray("highlights", highlightInput)}
                className="mt-6 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <ul className="list-disc list-inside space-y-2">
              {formData.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{highlight}</span>
                  <button
                    type="button"
                    onClick={() => removeFromArray("highlights", index)}
                    className="text-red-600 hover:text-red-800 ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Best Time to Visit */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Best Time to Visit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Months *"
                name="bestTimeToVisit.months"
                value={formData.bestTimeToVisit.months}
                onChange={handleInputChange}
                error={errors["bestTimeToVisit.months"]}
                required
              />
              <Input
                label="Weather"
                name="bestTimeToVisit.weather"
                value={formData.bestTimeToVisit.weather}
                onChange={handleInputChange}
              />
              <Input
                label="Temperature"
                name="bestTimeToVisit.temperature"
                value={formData.bestTimeToVisit.temperature}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Visa Requirements */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Visa Requirements
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="visaRequirements.required"
                  checked={formData.visaRequirements.required}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">
                  Visa Required
                </label>
              </div>
              <Input
                label="Details"
                name="visaRequirements.details"
                value={formData.visaRequirements.details}
                onChange={handleInputChange}
              />
              <Input
                label="Processing Time"
                name="visaRequirements.processingTime"
                value={formData.visaRequirements.processingTime || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Currency */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Currency</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Currency Code *"
                name="currency.code"
                value={formData.currency.code}
                onChange={handleInputChange}
                error={errors["currency.code"]}
                placeholder="e.g., USD"
                required
              />
              <Input
                label="Currency Name"
                name="currency.name"
                value={formData.currency.name}
                onChange={handleInputChange}
              />
              <Input
                label="Exchange Rate"
                name="currency.exchangeRate"
                value={formData.currency.exchangeRate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Language */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Language</h2>
            <div className="space-y-4">
              <Input
                label="Primary Language *"
                name="language.primary"
                value={formData.language.primary}
                onChange={handleInputChange}
                error={errors["language.primary"]}
                required
              />
              <div className="flex gap-2">
                <Input
                  label="Other Languages"
                  value={languageOtherInput}
                  onChange={(e) => setLanguageOtherInput(e.target.value)}
                  placeholder="e.g., English (tourist areas)"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (languageOtherInput.trim()) {
                      setFormData((prev) => ({
                        ...prev,
                        language: {
                          ...prev.language,
                          others: [
                            ...(prev.language.others || []),
                            languageOtherInput.trim(),
                          ],
                        },
                      }));
                      setLanguageOtherInput("");
                    }
                  }}
                  className="mt-6 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.language.others?.map((lang, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded"
                  >
                    <span>{lang}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          language: {
                            ...prev.language,
                            others: prev.language.others?.filter(
                              (_, i) => i !== index
                            ) || [],
                          },
                        }));
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weather */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Weather</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Climate *"
                name="weather.climate"
                value={formData.weather.climate}
                onChange={handleInputChange}
                error={errors["weather.climate"]}
                required
              />
              <Input
                label="Rainy Seasons"
                name="weather.rainySeasons"
                value={formData.weather.rainySeasons || ""}
                onChange={handleInputChange}
              />
              <Input
                label="Dry Seasons"
                name="weather.drySeasons"
                value={formData.weather.drySeasons || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Budget Range */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Budget Range
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Budget"
                name="budgetRange.budget"
                value={formData.budgetRange.budget}
                onChange={handleInputChange}
                placeholder="e.g., $25-50/day"
              />
              <Input
                label="Mid Range"
                name="budgetRange.midRange"
                value={formData.budgetRange.midRange}
                onChange={handleInputChange}
                placeholder="e.g., $50-100/day"
              />
              <Input
                label="Luxury"
                name="budgetRange.luxury"
                value={formData.budgetRange.luxury}
                onChange={handleInputChange}
                placeholder="e.g., $100-300/day"
              />
            </div>
          </div>

          {/* Itineraries */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Itineraries</h2>
            
            {/* Current Itinerary Form */}
            <div className="border-b pb-4 mb-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Itinerary Title"
                  value={currentItinerary.title}
                  onChange={(e) =>
                    setCurrentItinerary({ ...currentItinerary, title: e.target.value })
                  }
                />
                <Input
                  label="Duration"
                  value={currentItinerary.duration}
                  onChange={(e) =>
                    setCurrentItinerary({ ...currentItinerary, duration: e.target.value })
                  }
                  placeholder="e.g., 10 days"
                />
                <Input
                  label="Price"
                  type="number"
                  value={currentItinerary.price}
                  onChange={(e) =>
                    setCurrentItinerary({ ...currentItinerary, price: e.target.value })
                  }
                  placeholder="e.g., 899"
                />
              </div>

              {/* Itinerary Highlights */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Itinerary Highlights
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={itineraryHighlightInput}
                    onChange={(e) => setItineraryHighlightInput(e.target.value)}
                    placeholder="Add highlight"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (itineraryHighlightInput.trim()) {
                        setCurrentItinerary({
                          ...currentItinerary,
                          highlights: [
                            ...currentItinerary.highlights,
                            itineraryHighlightInput.trim(),
                          ],
                        });
                        setItineraryHighlightInput("");
                      }
                    }}
                    className="mt-6 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <ul className="list-disc list-inside space-y-1">
                  {currentItinerary.highlights.map((h, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <span>{h}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentItinerary({
                            ...currentItinerary,
                            highlights: currentItinerary.highlights.filter(
                              (_, idx) => idx !== i
                            ),
                          });
                        }}
                        className="text-red-600 hover:text-red-800 ml-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Day by Day */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Day by Day</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    label="Day Number"
                    type="number"
                    value={currentDay.day}
                    onChange={(e) =>
                      setCurrentDay({ ...currentDay, day: e.target.value })
                    }
                  />
                  <Input
                    label="Day Title"
                    value={currentDay.title}
                    onChange={(e) =>
                      setCurrentDay({ ...currentDay, title: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-2 mb-2">
                  <Input
                    label="Activity"
                    value={dayActivityInput}
                    onChange={(e) => setDayActivityInput(e.target.value)}
                    placeholder="Add activity"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (dayActivityInput.trim()) {
                        setCurrentDay({
                          ...currentDay,
                          activities: [
                            ...currentDay.activities,
                            dayActivityInput.trim(),
                          ],
                        });
                        setDayActivityInput("");
                      }
                    }}
                    className="mt-6 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  {currentDay.activities.map((a, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <span>{a}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentDay({
                            ...currentDay,
                            activities: currentDay.activities.filter(
                              (_, idx) => idx !== i
                            ),
                          });
                        }}
                        className="text-red-600 hover:text-red-800 ml-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={addDayToItinerary}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Add Day
                </button>
              </div>

              {/* Current Itinerary Day by Day List */}
              {currentItinerary.dayByDay.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Added Days:</h4>
                  {currentItinerary.dayByDay.map((day, idx) => (
                    <div key={idx} className="mb-2 p-2 bg-gray-50 rounded">
                      <p className="font-medium">Day {day.day}: {day.title}</p>
                      <ul className="list-disc list-inside ml-4">
                        {day.activities.map((act, actIdx) => (
                          <li key={actIdx} className="text-sm">{act}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={addItinerary}
                className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              >
                Add Itinerary
              </button>
            </div>

            {/* Added Itineraries List */}
            {formData.itineraries.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Added Itineraries:</h3>
                <div className="space-y-4">
                  {formData.itineraries.map((itinerary, idx) => (
                    <div key={idx} className="border p-4 rounded">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{itinerary.title}</h4>
                          <p className="text-sm text-gray-600">
                            {itinerary.duration} - ${itinerary.price}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              itineraries: prev.itineraries.filter(
                                (_, i) => i !== idx
                              ),
                            }));
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <ul className="list-disc list-inside ml-4 text-sm">
                        {itinerary.highlights.map((h, hIdx) => (
                          <li key={hIdx}>{h}</li>
                        ))}
                      </ul>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Days: {itinerary.dayByDay.length}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Attractions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Attractions</h2>
            <div className="border-b pb-4 mb-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Attraction Name"
                  value={currentAttraction.name}
                  onChange={(e) =>
                    setCurrentAttraction({
                      ...currentAttraction,
                      name: e.target.value,
                    })
                  }
                />
                <Input
                  label="Type"
                  value={currentAttraction.type}
                  onChange={(e) =>
                    setCurrentAttraction({
                      ...currentAttraction,
                      type: e.target.value,
                    })
                  }
                  placeholder="e.g., Historical Site"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Latitude"
                  type="number"
                  step="any"
                  value={currentAttraction.latitude}
                  onChange={(e) =>
                    setCurrentAttraction({
                      ...currentAttraction,
                      latitude: e.target.value,
                    })
                  }
                />
                <Input
                  label="Longitude"
                  type="number"
                  step="any"
                  value={currentAttraction.longitude}
                  onChange={(e) =>
                    setCurrentAttraction({
                      ...currentAttraction,
                      longitude: e.target.value,
                    })
                  }
                />
              </div>
              <Input
                label="Description"
                value={currentAttraction.description}
                onChange={(e) =>
                  setCurrentAttraction({
                    ...currentAttraction,
                    description: e.target.value,
                  })
                }
              />
              <button
                type="button"
                onClick={addAttraction}
                className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              >
                Add Attraction
              </button>
            </div>
            {formData.attractions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Added Attractions:</h3>
                <div className="space-y-2">
                  {formData.attractions.map((attraction, idx) => (
                    <div key={idx} className="flex justify-between items-center border p-3 rounded">
                      <div>
                        <p className="font-medium">{attraction.name}</p>
                        <p className="text-sm text-gray-600">{attraction.type}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            attractions: prev.attractions.filter(
                              (_, i) => i !== idx
                            ),
                          }));
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews</h2>
            <div className="border-b pb-4 mb-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Reviewer Name"
                  value={currentReview.name}
                  onChange={(e) =>
                    setCurrentReview({ ...currentReview, name: e.target.value })
                  }
                />
                <Input
                  label="Rating (1-5)"
                  type="number"
                  min="1"
                  max="5"
                  value={currentReview.rating}
                  onChange={(e) =>
                    setCurrentReview({ ...currentReview, rating: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Date"
                  type="date"
                  value={currentReview.date}
                  onChange={(e) =>
                    setCurrentReview({ ...currentReview, date: e.target.value })
                  }
                />
                <Input
                  label="Trip Type"
                  value={currentReview.tripType}
                  onChange={(e) =>
                    setCurrentReview({
                      ...currentReview,
                      tripType: e.target.value,
                    })
                  }
                />
              </div>
              <Input
                label="Avatar URL"
                value={currentReview.avatar}
                onChange={(e) =>
                  setCurrentReview({ ...currentReview, avatar: e.target.value })
                }
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment *
                </label>
                <textarea
                  value={currentReview.comment}
                  onChange={(e) =>
                    setCurrentReview({ ...currentReview, comment: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <button
                type="button"
                onClick={addReview}
                className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              >
                Add Review
              </button>
            </div>
            {formData.reviews.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Added Reviews:</h3>
                <div className="space-y-2">
                  {formData.reviews.map((review, idx) => (
                    <div key={idx} className="flex justify-between items-start border p-3 rounded">
                      <div>
                        <p className="font-medium">{review.name}</p>
                        <p className="text-sm text-gray-600">
                          Rating: {review.rating}/5 - {review.date}
                        </p>
                        <p className="text-sm mt-1">{review.comment}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            reviews: prev.reviews.filter((_, i) => i !== idx),
                          }));
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Customization Options */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Customization Options
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Accommodations */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accommodations
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={accommodationInput}
                    onChange={(e) => setAccommodationInput(e.target.value)}
                    placeholder="e.g., Beach Resorts"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      addCustomizationOption("accommodations", accommodationInput)
                    }
                    className="mt-6 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.customizationOptions.accommodations.map(
                    (item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() =>
                            removeCustomizationOption("accommodations", idx)
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Transportation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transportation
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={transportationInput}
                    onChange={(e) => setTransportationInput(e.target.value)}
                    placeholder="e.g., Tuk-tuks"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      addCustomizationOption("transportation", transportationInput)
                    }
                    className="mt-6 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.customizationOptions.transportation.map(
                    (item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() =>
                            removeCustomizationOption("transportation", idx)
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Activities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activities
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={activityInput}
                    onChange={(e) => setActivityInput(e.target.value)}
                    placeholder="e.g., Temple visits"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      addCustomizationOption("activities", activityInput)
                    }
                    className="mt-6 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.customizationOptions.activities.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => removeCustomizationOption("activities", idx)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requirements
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={specialRequirementInput}
                    onChange={(e) =>
                      setSpecialRequirementInput(e.target.value)
                    }
                    placeholder="e.g., Vegetarian meals"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      addCustomizationOption(
                        "specialRequirements",
                        specialRequirementInput
                      )
                    }
                    className="mt-6 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.customizationOptions.specialRequirements.map(
                    (item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() =>
                            removeCustomizationOption("specialRequirements", idx)
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Link
              to="/admin/dashboard"
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              Add Destination
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddDestination;

