import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import Input from "../../../../components/common/Input/Input";
import { CreateDestinationData } from "../../../../services/types/destination.types";

interface CustomizationOptionsFormProps {
  formData: CreateDestinationData;
  setFormData: React.Dispatch<React.SetStateAction<CreateDestinationData>>;
}

export const CustomizationOptionsForm: React.FC<CustomizationOptionsFormProps> = ({ formData, setFormData }) => {
  const [accommodationInput, setAccommodationInput] = useState("");
  const [transportationInput, setTransportationInput] = useState("");
  const [activityInput, setActivityInput] = useState("");
  const [specialRequirementInput, setSpecialRequirementInput] = useState("");

  const addCustomizationOption = (category: keyof typeof formData.customizationOptions, value: string) => {
    if (!value.trim()) return;
    setFormData((prev) => ({
      ...prev,
      customizationOptions: {
        ...prev.customizationOptions,
        [category]: [...prev.customizationOptions[category], value.trim()],
      },
    }));
    switch (category) {
      case "accommodations": setAccommodationInput(""); break;
      case "transportation": setTransportationInput(""); break;
      case "activities": setActivityInput(""); break;
      case "specialRequirements": setSpecialRequirementInput(""); break;
    }
  };

  const removeCustomizationOption = (category: keyof typeof formData.customizationOptions, index: number) => {
    setFormData((prev) => ({
      ...prev,
      customizationOptions: {
        ...prev.customizationOptions,
        [category]: prev.customizationOptions[category].filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Customization Options</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Accommodations */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Accommodations</label>
          <div className="flex gap-2 mb-2">
            <Input
              value={accommodationInput}
              onChange={(e) => setAccommodationInput(e.target.value)}
              placeholder="e.g., Beach Resorts"
            />
            <button
              type="button"
              onClick={() => addCustomizationOption("accommodations", accommodationInput)}
              className="mt-6 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.customizationOptions.accommodations.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => removeCustomizationOption("accommodations", idx)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Transportation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Transportation</label>
          <div className="flex gap-2 mb-2">
            <Input
              value={transportationInput}
              onChange={(e) => setTransportationInput(e.target.value)}
              placeholder="e.g., Tuk-tuks"
            />
            <button
              type="button"
              onClick={() => addCustomizationOption("transportation", transportationInput)}
              className="mt-6 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.customizationOptions.transportation.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => removeCustomizationOption("transportation", idx)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Activities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Activities</label>
          <div className="flex gap-2 mb-2">
            <Input
              value={activityInput}
              onChange={(e) => setActivityInput(e.target.value)}
              placeholder="e.g., Temple visits"
            />
            <button
              type="button"
              onClick={() => addCustomizationOption("activities", activityInput)}
              className="mt-6 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.customizationOptions.activities.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
          <div className="flex gap-2 mb-2">
            <Input
              value={specialRequirementInput}
              onChange={(e) => setSpecialRequirementInput(e.target.value)}
              placeholder="e.g., Vegetarian meals"
            />
            <button
              type="button"
              onClick={() => addCustomizationOption("specialRequirements", specialRequirementInput)}
              className="mt-6 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.customizationOptions.specialRequirements.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => removeCustomizationOption("specialRequirements", idx)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
