import React, { useState } from "react";
import { Plus, X, Trash2 } from "lucide-react";
import Input from "../../../../components/common/Input/Input";
import { CreateDestinationData } from "../../../../services/types/destination.types";

interface FormProps {
  formData: CreateDestinationData;
  setFormData: React.Dispatch<React.SetStateAction<CreateDestinationData>>;
  errors: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const BasicInfoForm: React.FC<FormProps> = ({ formData, handleInputChange, errors }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Input label="Destination Name *" name="name" value={formData.name} onChange={handleInputChange} error={errors.name} required />
      </div>
      <div>
        <Input label="Country *" name="country" value={formData.country} onChange={handleInputChange} error={errors.country} required />
      </div>
      <div>
        <Input label="Continent *" name="continent" value={formData.continent} onChange={handleInputChange} error={errors.continent} required />
      </div>
      <div>
        <Input label="Hero Image URL *" name="heroImage" value={formData.heroImage} onChange={handleInputChange} error={errors.heroImage} required />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          required
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>
    </div>
  </div>
);

export const GalleryForm: React.FC<Pick<FormProps, 'formData' | 'setFormData'>> = ({ formData, setFormData }) => {
  const [galleryInput, setGalleryInput] = useState("");

  const addGallery = () => {
    if (galleryInput.trim()) {
      setFormData(prev => ({ ...prev, gallery: [...prev.gallery, galleryInput.trim()] }));
      setGalleryInput("");
    }
  };

  const removeGallery = (index: number) => {
    setFormData(prev => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== index) }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Gallery</h2>
      <div className="flex gap-2 mb-4">
        <Input label="Add Gallery Image URL" value={galleryInput} onChange={(e) => setGalleryInput(e.target.value)} placeholder="https://example.com/image.jpg" />
        <button type="button" onClick={addGallery} className="mt-6 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"><Plus className="w-5 h-5" /></button>
      </div>
      <div className="flex flex-wrap gap-2">
        {formData.gallery.map((url, index) => (
          <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
            <span className="text-sm text-gray-700 truncate max-w-xs">{url}</span>
            <button type="button" onClick={() => removeGallery(index)} className="text-red-600 hover:text-red-800"><X className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const HighlightsForm: React.FC<Pick<FormProps, 'formData' | 'setFormData'>> = ({ formData, setFormData }) => {
  const [highlightInput, setHighlightInput] = useState("");

  const addHighlight = () => {
    if (highlightInput.trim()) {
      setFormData(prev => ({ ...prev, highlights: [...prev.highlights, highlightInput.trim()] }));
      setHighlightInput("");
    }
  };

  const removeHighlight = (index: number) => {
    setFormData(prev => ({ ...prev, highlights: prev.highlights.filter((_, i) => i !== index) }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Highlights</h2>
      <div className="flex gap-2 mb-4">
        <Input label="Add Highlight" value={highlightInput} onChange={(e) => setHighlightInput(e.target.value)} placeholder="e.g., Beautiful tropical beaches" />
        <button type="button" onClick={addHighlight} className="mt-6 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"><Plus className="w-5 h-5" /></button>
      </div>
      <ul className="list-disc list-inside space-y-2">
        {formData.highlights.map((highlight, index) => (
          <li key={index} className="flex items-center justify-between">
            <span>{highlight}</span>
            <button type="button" onClick={() => removeHighlight(index)} className="text-red-600 hover:text-red-800 ml-2"><Trash2 className="w-4 h-4" /></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const BestTimeToVisitForm: React.FC<Omit<FormProps, 'setFormData'>> = ({ formData, handleInputChange, errors }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Best Time to Visit</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Input label="Months *" name="bestTimeToVisit.months" value={formData.bestTimeToVisit.months} onChange={handleInputChange} error={errors["bestTimeToVisit.months"]} required />
      <Input label="Weather" name="bestTimeToVisit.weather" value={formData.bestTimeToVisit.weather} onChange={handleInputChange} />
      <Input label="Temperature" name="bestTimeToVisit.temperature" value={formData.bestTimeToVisit.temperature} onChange={handleInputChange} />
    </div>
  </div>
);

export const VisaRequirementsForm: React.FC<Omit<FormProps, 'setFormData' | 'errors'>> = ({ formData, handleInputChange }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Visa Requirements</h2>
    <div className="space-y-4">
      <div className="flex items-center">
        <input type="checkbox" name="visaRequirements.required" checked={formData.visaRequirements.required} onChange={handleInputChange} className="mr-2" />
        <label className="text-sm font-medium text-gray-700">Visa Required</label>
      </div>
      <Input label="Details" name="visaRequirements.details" value={formData.visaRequirements.details} onChange={handleInputChange} />
      <Input label="Processing Time" name="visaRequirements.processingTime" value={formData.visaRequirements.processingTime || ""} onChange={handleInputChange} />
    </div>
  </div>
);

export const CurrencyForm: React.FC<Omit<FormProps, 'setFormData'>> = ({ formData, handleInputChange, errors }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Currency</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Input label="Currency Code *" name="currency.code" value={formData.currency.code} onChange={handleInputChange} error={errors["currency.code"]} placeholder="e.g., USD" required />
      <Input label="Currency Name" name="currency.name" value={formData.currency.name} onChange={handleInputChange} />
      <Input label="Exchange Rate" name="currency.exchangeRate" value={formData.currency.exchangeRate} onChange={handleInputChange} />
    </div>
  </div>
);

export const LanguageForm: React.FC<FormProps> = ({ formData, setFormData, handleInputChange, errors }) => {
  const [languageOtherInput, setLanguageOtherInput] = useState("");

  const addOtherLanguage = () => {
    if (languageOtherInput.trim()) {
      setFormData(prev => ({
        ...prev,
        language: { ...prev.language, others: [...(prev.language.others || []), languageOtherInput.trim()] }
      }));
      setLanguageOtherInput("");
    }
  };

  const removeOtherLanguage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      language: { ...prev.language, others: prev.language.others?.filter((_, i) => i !== index) || [] }
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Language</h2>
      <div className="space-y-4">
        <Input label="Primary Language *" name="language.primary" value={formData.language.primary} onChange={handleInputChange} error={errors["language.primary"]} required />
        <div className="flex gap-2">
          <Input label="Other Languages" value={languageOtherInput} onChange={(e) => setLanguageOtherInput(e.target.value)} placeholder="e.g., English (tourist areas)" />
          <button type="button" onClick={addOtherLanguage} className="mt-6 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"><Plus className="w-5 h-5" /></button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.language.others?.map((lang, index) => (
            <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
              <span>{lang}</span>
              <button type="button" onClick={() => removeOtherLanguage(index)} className="text-red-600 hover:text-red-800"><X className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const WeatherForm: React.FC<Omit<FormProps, 'setFormData'>> = ({ formData, handleInputChange, errors }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Weather</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Input label="Climate *" name="weather.climate" value={formData.weather.climate} onChange={handleInputChange} error={errors["weather.climate"]} required />
      <Input label="Rainy Seasons" name="weather.rainySeasons" value={formData.weather.rainySeasons || ""} onChange={handleInputChange} />
      <Input label="Dry Seasons" name="weather.drySeasons" value={formData.weather.drySeasons || ""} onChange={handleInputChange} />
    </div>
  </div>
);

export const BudgetRangeForm: React.FC<Omit<FormProps, 'setFormData' | 'errors'>> = ({ formData, handleInputChange }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Budget Range</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Input label="Budget" name="budgetRange.budget" value={formData.budgetRange.budget} onChange={handleInputChange} placeholder="e.g., $25-50/day" />
      <Input label="Mid Range" name="budgetRange.midRange" value={formData.budgetRange.midRange} onChange={handleInputChange} placeholder="e.g., $50-100/day" />
      <Input label="Luxury" name="budgetRange.luxury" value={formData.budgetRange.luxury} onChange={handleInputChange} placeholder="e.g., $100-300/day" />
    </div>
  </div>
);
