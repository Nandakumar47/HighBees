import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LogOut, ArrowLeft } from "lucide-react";
import { useToast } from "../../components/common/Toast/Toast";
import { useLoading } from "../../hooks/useLoading";
import { destinationService } from "../../services/destinationService";
import { CreateDestinationData } from "../../services/types/destination.types";
import { getErrorMessage } from "../../utils/apiErrorHandler";
import PageLoader from "../../components/PageLoader";
import { ROUTES } from "../../utils/constants";
import {
  BasicInfoForm, GalleryForm, HighlightsForm, BestTimeToVisitForm,
  VisaRequirementsForm, CurrencyForm, LanguageForm, WeatherForm,
  BudgetRangeForm, ItineraryForm, AttractionsForm, ReviewsForm,
  CustomizationOptionsForm
} from "./components/DestinationForms";

const AdminAddDestination = () => {
  const { logout } = useAuth();
  const { showToast } = useToast();
  const { isLoading, withLoading } = useLoading(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateDestinationData>({
    name: "",
    country: "",
    continent: "",
    heroImage: "",
    gallery: [],
    description: "",
    highlights: [],
    bestTimeToVisit: { months: "", weather: "", temperature: "" },
    visaRequirements: { required: false, details: "", processingTime: "" },
    currency: { code: "", name: "", exchangeRate: "" },
    language: { primary: "", others: [] },
    weather: { climate: "", rainySeasons: "", drySeasons: "" },
    budgetRange: { budget: "", midRange: "", luxury: "" },
    itineraries: [],
    attractions: [],
    reviews: [],
    customizationOptions: { accommodations: [], transportation: [], activities: [], specialRequirements: [] },
    enquiries: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const target = e.target;
    const checked = target instanceof HTMLInputElement ? target.checked : false;

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
    
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
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
        navigate(ROUTES.ADMIN.DASHBOARD);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        showToast(errorMessage, "error");
      }
    });
  };

  if (isLoading) {
    return <PageLoader message="Adding destination..." />;
  }

  const formProps = { formData, setFormData, handleInputChange, errors };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to={ROUTES.ADMIN.DASHBOARD} className="p-1 hover:bg-gray-100 rounded">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Add New Destination</h1>
            </div>
            <button onClick={logout} className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base">
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <BasicInfoForm {...formProps} />
          <GalleryForm formData={formData} setFormData={setFormData} />
          <HighlightsForm formData={formData} setFormData={setFormData} />
          <BestTimeToVisitForm formData={formData} handleInputChange={handleInputChange} errors={errors} />
          <VisaRequirementsForm formData={formData} handleInputChange={handleInputChange} />
          <CurrencyForm formData={formData} handleInputChange={handleInputChange} errors={errors} />
          <LanguageForm {...formProps} />
          <WeatherForm formData={formData} handleInputChange={handleInputChange} errors={errors} />
          <BudgetRangeForm formData={formData} handleInputChange={handleInputChange} />
          <ItineraryForm formData={formData} setFormData={setFormData} />
          <AttractionsForm formData={formData} setFormData={setFormData} />
          <ReviewsForm formData={formData} setFormData={setFormData} />
          <CustomizationOptionsForm formData={formData} setFormData={setFormData} />

          <div className="flex justify-end gap-4">
            <Link to="/admin/dashboard" className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
              Cancel
            </Link>
            <button type="submit" className="px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600">
              Save Destination
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddDestination;
