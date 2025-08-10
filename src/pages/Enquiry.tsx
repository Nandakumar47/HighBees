import { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Users,
  MapPin,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import LoadingButton from "../components/LoadingButton";
import { useLoading } from "../hooks/useLoading";
import { getAllDestinations } from "../data/destinationsData";
import Select from "../components/common/Input/Select";
import Input from "../components/common/Input/Input";

const Enquiry = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Your Details
    name: "",
    email: "",
    phone: "",
    adults: 1,
    children: 0,

    // Step 2 - Trip Details
    destination: "",
    departureCity: "",
    departureDate: "",
    duration: "",
    budget: "",
  });
  type EnquiryForm = typeof formData;
  type FormErrors = Partial<Record<keyof EnquiryForm, string>>;
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, withLoading } = useLoading();

  // Get destinations from centralized data
  const allDestinations = getAllDestinations();
  const destinations = [
    ...allDestinations.map(
      (dest) =>
        dest.name + (dest.country !== dest.name ? `, ${dest.country}` : "")
    ),
    "Other (Please specify in message)",
  ];

  const validateStep1 = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (formData.adults < 1) {
      newErrors.adults = "At least 1 adult is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: FormErrors = {};

    if (!formData.destination) {
      newErrors.destination = "Destination is required";
    }

    if (!formData.departureCity.trim()) {
      newErrors.departureCity = "Departure city is required";
    }

    if (!formData.departureDate) {
      newErrors.departureDate = "Departure date is required";
    }

    if (!formData.duration) {
      newErrors.duration = "Duration is required";
    }

    if (!formData.budget) {
      newErrors.budget = "Budget is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (name in errors) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) {
      return;
    }

    await withLoading(async () => {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      adults: 1,
      children: 0,
      destination: "",
      departureCity: "",
      departureDate: "",
      duration: "",
      budget: "",
    });
    setCurrentStep(1);
    setIsSubmitted(false);
    setErrors({});
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Enquiry Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your enquiry. Our travel experts will review your
              requirements and get back to you within 24 hours with a customized
              travel proposal.
            </p>
            <div className="space-y-3">
              <button
                onClick={resetForm}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Submit Another Enquiry
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="w-full border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-semibold py-3 rounded-lg transition-all duration-200"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Travel Enquiry
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tell us about your dream trip and we'll create a personalized travel
            experience just for you
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div
              className={`flex items-center space-x-2 ${
                currentStep >= 1 ? "text-primary-500" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 1
                    ? "bg-primary-500 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                1
              </div>
              <span className="font-medium">Your Details</span>
            </div>
            <div
              className={`w-16 h-1 ${
                currentStep >= 2 ? "bg-primary-500" : "bg-gray-200"
              }`}
            />
            <div
              className={`flex items-center space-x-2 ${
                currentStep >= 2 ? "text-primary-500" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 2
                    ? "bg-primary-500 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                2
              </div>
              <span className="font-medium">Trip Details</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {currentStep === 1 ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <Users className="w-6 h-6 text-primary-500" />
                <span>Your Details</span>
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Input
                      id="name"
                      name="name"
                      label="Full Name *"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={errors.name as string}
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <Input
                      id="email"
                      name="email"
                      label="Email Address *"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email as string}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <Input
                    id="phone"
                    name="phone"
                    label="Phone Number *"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone as string}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="adults"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Number of Adults *
                    </label>
                    <Select
                      id="adults"
                      name="adults"
                      value={formData.adults}
                      onChange={handleInputChange}
                      placeholder="Select adults"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} Adult{num > 1 ? "s" : ""}
                        </option>
                      ))}
                    </Select>
                    {errors.adults && (
                      <div className="flex items-center space-x-1 mt-1">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-500">
                          {errors.adults}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="children"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Number of Children
                    </label>
                    <Select
                      id="children"
                      name="children"
                      value={formData.children}
                      onChange={handleInputChange}
                      placeholder="Select children"
                    >
                      {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Child" : "Children"}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <MapPin className="w-6 h-6 text-primary-500" />
                <span>Trip Details</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="destination"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Destination *
                  </label>
                  <Select
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="Select a destination"
                  >
                    <option value="">Select a destination</option>
                    {destinations.map((dest) => (
                      <option key={dest} value={dest}>
                        {dest}
                      </option>
                    ))}
                  </Select>
                  {errors.destination && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-500">
                        {errors.destination}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <Input
                    id="departureCity"
                    name="departureCity"
                    label="Departure City *"
                    type="text"
                    value={formData.departureCity}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    error={errors.departureCity as string}
                    placeholder="e.g., New York, London, Mumbai"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="departureDate"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Expected Departure Date *
                    </label>
                    <Input
                      type="date"
                      id="departureDate"
                      name="departureDate"
                      value={formData.departureDate}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      min={new Date().toISOString().split("T")[0]}
                      error={errors.departureDate as string}
                    />
                    {errors.departureDate && (
                      <div className="flex items-center space-x-1 mt-1">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-500">
                          {errors.departureDate}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="duration"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Duration of Stay (days) *
                    </label>
                    <Select
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      placeholder="Select duration"
                    >
                      <option value="">Select duration</option>
                      <option value="3-5">3-5 days</option>
                      <option value="6-7">6-7 days</option>
                      <option value="8-10">8-10 days</option>
                      <option value="11-14">11-14 days</option>
                      <option value="15-21">15-21 days</option>
                      <option value="22+">22+ days</option>
                    </Select>
                    {errors.duration && (
                      <div className="flex items-center space-x-1 mt-1">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-500">
                          {errors.duration}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Maximum Budget (USD) *
                  </label>
                  <Select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="Select budget range"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-1000">Under $1,000</option>
                    <option value="1000-2000">$1,000 - $2,000</option>
                    <option value="2000-3000">$2,000 - $3,000</option>
                    <option value="3000-5000">$3,000 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="10000+">$10,000+</option>
                  </Select>
                  {errors.budget && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-500">
                        {errors.budget}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isLoading}
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed font-semibold px-8 py-3 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back</span>
                  </button>

                  <LoadingButton
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Submitting Enquiry..."
                    variant="primary"
                  >
                    <span>Submit Enquiry</span>
                    <CheckCircle className="w-5 h-5" />
                  </LoadingButton>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Enquiry;
