import { useEffect, useState, useCallback } from "react";
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
import Select from "../components/common/Input/Select";
import Input from "../components/common/Input/Input";
import { useToast } from "../components/common/Toast/Toast";
import { getErrorMessage } from "../utils/apiErrorHandler";
import axios from "axios";

interface EnquiryProps {
  initialDestination?: string;
  hideDestinationField?: boolean;
  embedded?: boolean;
  title?: string;
}
interface ApiDestination {
  id: number;
  name: string;
  country?: string;
  hero_image: string;
  description: string;
}
const Enquiry: React.FC<EnquiryProps> = ({
  initialDestination = "",
  hideDestinationField = false,
  embedded = false,
  title = "Travel Enquiry",
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Your Details
    name: "",
    email: "",
    phone: "",
    adults: 1,
    children: 0,

    // Step 2 - Trip Details
    destination: initialDestination,
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
  const [destinations, setDestinations] = useState<string[]>([]);
  const { showSuccess, showError } = useToast();

  const setDestinationsToState = useCallback(async () => {
    try {
      const allDestinations = await getDestinations();
      const destinationOption = [
        ...allDestinations.map(
          (dest) =>
            dest.name + (dest.country !== dest.name ? `, ${dest.country}` : "")
        ),
        "Other (Please specify in message)",
      ];
      setDestinations(destinationOption);
    } catch (error) {
      console.log(error);
      setDestinations([]);
      // Don't show error toast for destinations loading as it's not critical
    }
  }, []);

  useEffect(() => {
    setDestinationsToState();
  }, [setDestinationsToState]);
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

    if (!hideDestinationField) {
      if (!formData.destination) {
        newErrors.destination = "Destination is required";
      }
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

  const createEnquiry = async () => {
    try {
      const response = await axios.post("/api/enquiry/create", {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        numberOfAdults: formData.adults,
        numberOfChildren: formData.children,
        destination: formData.destination,
        departureCity: formData.departureCity,
        expectedDepartureDate: formData.departureDate, // YYYY-MM-DD format
        durationOfStay: formData.duration,
        maximumBudget: formData.budget,
      });

      console.log("Enquiry created successfully:", response.data);
      showSuccess(
        "Travel enquiry submitted successfully! Our travel experts will get back to you within 24 hours."
      );
    } catch (error) {
      console.error("Error creating enquiry:", error);
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
      throw error; // Re-throw to prevent setIsSubmitted from being called
    }
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
      try {
        await createEnquiry();
        setIsSubmitted(true);
      } catch {
        // Error handling is done in createEnquiry function
      }
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
      <div
        className={`${
          embedded ? "" : "min-h-screen bg-gray-50 pt-20"
        } flex items-center justify-center`}
      >
        <div className="max-w-2xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-white rounded-3xl shadow-xl p-10 md:p-12 text-center">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Enquiry Submitted Successfully!
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed font-light">
              Thank you for your enquiry. Our travel experts will review your
              requirements and get back to you within 24 hours with a customized
              travel proposal.
            </p>
            <div className="space-y-4">
              <LoadingButton
                onClick={resetForm}
                fullWidth
                variant="primary"
                className="px-8 py-4 text-base"
              >
                Submit Another Enquiry
              </LoadingButton>
              <LoadingButton
                onClick={() => (window.location.href = "/")}
                fullWidth
                variant="outline"
                className="px-8 py-4 text-base"
              >
                Back to Home
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const coreContent = (
    <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
      {/* Header with improved hierarchy */}
      {!embedded && (
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Tell us about your dream trip and we'll create a personalized travel
            experience just for you
          </p>
        </div>
      )}

      {/* Progress Bar with improved mobile hierarchy */}
      <div className="mb-8 sm:mb-12">
        <div className="flex items-center justify-center space-x-4 sm:space-x-6 lg:space-x-8">
          <div
            className={`flex items-center space-x-2 sm:space-x-3 ${
              currentStep >= 1 ? "text-primary-500" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base ${
                currentStep >= 1
                  ? "bg-primary-500 text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              1
            </div>
            <span className="font-semibold text-sm sm:text-base hidden sm:inline">
              Your Details
            </span>
          </div>
          <div
            className={`w-12 sm:w-16 lg:w-20 h-1 rounded-full ${
              currentStep >= 2 ? "bg-primary-500" : "bg-gray-200"
            }`}
          />
          <div
            className={`flex items-center space-x-2 sm:space-x-3 ${
              currentStep >= 2 ? "text-primary-500" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base ${
                currentStep >= 2
                  ? "bg-primary-500 text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              2
            </div>
            <span className="font-semibold text-sm sm:text-base hidden sm:inline">
              Trip Details
            </span>
          </div>
        </div>
        {/* Mobile step labels */}
        <div className="flex justify-center mt-2 sm:hidden">
          <span className="text-xs text-gray-500">
            {currentStep === 1 ? "Your Details" : "Trip Details"}
          </span>
        </div>
      </div>

      {/* Form with improved mobile spacing */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-12">
        {currentStep === 1 ? (
          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center space-x-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500" />
              <span>Your Details</span>
            </h2>

            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label
                    htmlFor="adults"
                    className="block text-sm font-semibold text-gray-700 mb-2"
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
                    <div className="flex items-center space-x-2 mt-1">
                      <AlertCircle className="w-3 h-3 text-red-500" />
                      <span className="text-xs text-red-500">
                        {errors.adults}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="children"
                    className="block text-sm font-semibold text-gray-700 mb-2"
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

              <div className="flex justify-end pt-2">
                <LoadingButton
                  type="button"
                  onClick={handleNext}
                  variant="primary"
                  icon={ChevronRight}
                  iconPosition="right"
                  className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base w-full sm:w-auto"
                >
                  Next
                </LoadingButton>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 flex items-center space-x-2 sm:space-x-3">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary-500" />
              <span>Trip Details</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {!hideDestinationField ? (
                <div>
                  <label
                    htmlFor="destination"
                    className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3"
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
                    <div className="flex items-center space-x-2 mt-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-500">
                        {errors.destination}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">
                    Destination
                  </label>
                  <div className="px-4 sm:px-6 py-3 sm:py-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 text-sm sm:text-base">
                    {formData.destination || initialDestination}
                  </div>
                </div>
              )}

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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                <div>
                  <label
                    htmlFor="departureDate"
                    className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3"
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
                    <div className="flex items-center space-x-2 mt-2">
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
                    className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3"
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
                    <div className="flex items-center space-x-2 mt-2">
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
                  className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3"
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
                  <div className="flex items-center space-x-2 mt-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-500">
                      {errors.budget}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pt-4">
                <LoadingButton
                  type="button"
                  onClick={handleBack}
                  disabled={isLoading}
                  variant="outline"
                  icon={ChevronLeft}
                  className="px-6 sm:px-8 py-3 text-sm sm:text-base w-full sm:w-auto order-2 sm:order-1"
                >
                  Back
                </LoadingButton>

                <LoadingButton
                  type="submit"
                  isLoading={isLoading}
                  loadingText="Submitting Enquiry..."
                  variant="primary"
                  icon={CheckCircle}
                  iconPosition="right"
                  className="px-6 sm:px-8 py-3 text-sm sm:text-base w-full sm:w-auto order-1 sm:order-2"
                >
                  Submit Enquiry
                </LoadingButton>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );

  if (embedded) {
    return <div>{coreContent}</div>;
  }

  return <div className="min-h-screen bg-gray-50 pt-20">{coreContent}</div>;
};

export default Enquiry;
