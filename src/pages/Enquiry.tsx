import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Users, Calendar, MapPin, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import LoadingButton from '../components/LoadingButton';
import { useLoading } from '../hooks/useLoading';
import { getAllDestinations } from '../data/destinationsData';

const Enquiry = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Your Details
    name: '',
    email: '',
    phone: '',
    adults: 1,
    children: 0,
    
    // Step 2 - Trip Details
    destination: '',
    departureCity: '',
    departureDate: '',
    duration: '',
    budget: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, withLoading } = useLoading();

  // Get destinations from centralized data
  const allDestinations = getAllDestinations();
  const destinations = [
    ...allDestinations.map(dest => dest.name + (dest.country !== dest.name ? `, ${dest.country}` : '')),
    'Other (Please specify in message)'
  ];

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (formData.adults < 1) {
      newErrors.adults = 'At least 1 adult is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.destination) {
      newErrors.destination = 'Destination is required';
    }

    if (!formData.departureCity.trim()) {
      newErrors.departureCity = 'Departure city is required';
    }

    if (!formData.departureDate) {
      newErrors.departureDate = 'Departure date is required';
    }

    if (!formData.duration) {
      newErrors.duration = 'Duration is required';
    }

    if (!formData.budget) {
      newErrors.budget = 'Budget is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }

    await withLoading(async () => {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      adults: 1,
      children: 0,
      destination: '',
      departureCity: '',
      departureDate: '',
      duration: '',
      budget: ''
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
              Thank you for your enquiry. Our travel experts will review your requirements and get back to you within 24 hours with a customized travel proposal.
            </p>
            <div className="space-y-3">
              <button
                onClick={resetForm}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Submit Another Enquiry
              </button>
              <button
                onClick={() => window.location.href = '/'}
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
            Tell us about your dream trip and we'll create a personalized travel experience just for you
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-primary-500' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                1
              </div>
              <span className="font-medium">Your Details</span>
            </div>
            <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-primary-500' : 'bg-gray-200'}`} />
            <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-primary-500' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
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
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <div className="flex items-center space-x-1 mt-1">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-500">{errors.name}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <div className="flex items-center space-x-1 mt-1">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-500">{errors.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-500">{errors.phone}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Adults *
                    </label>
                    <select
                      id="adults"
                      name="adults"
                      value={formData.adults}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                        errors.adults ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                    {errors.adults && (
                      <div className="flex items-center space-x-1 mt-1">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-500">{errors.adults}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Children
                    </label>
                    <select
                      id="children"
                      name="children"
                      value={formData.children}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                      {[0, 1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Child' : 'Children'}</option>
                      ))}
                    </select>
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
                  <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                    Destination *
                  </label>
                  <select
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${
                      errors.destination ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a destination</option>
                    {destinations.map(dest => (
                      <option key={dest} value={dest}>{dest}</option>
                    ))}
                  </select>
                  {errors.destination && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-500">{errors.destination}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="departureCity" className="block text-sm font-medium text-gray-700 mb-2">
                    Departure City *
                  </label>
                  <input
                    type="text"
                    id="departureCity"
                    name="departureCity"
                    value={formData.departureCity}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${
                      errors.departureCity ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., New York, London, Mumbai"
                  />
                  {errors.departureCity && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-500">{errors.departureCity}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Departure Date *
                    </label>
                    <input
                      type="date"
                      id="departureDate"
                      name="departureDate"
                      value={formData.departureDate}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${
                        errors.departureDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.departureDate && (
                      <div className="flex items-center space-x-1 mt-1">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-500">{errors.departureDate}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                      Duration of Stay (days) *
                    </label>
                    <select
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${
                        errors.duration ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select duration</option>
                      <option value="3-5">3-5 days</option>
                      <option value="6-7">6-7 days</option>
                      <option value="8-10">8-10 days</option>
                      <option value="11-14">11-14 days</option>
                      <option value="15-21">15-21 days</option>
                      <option value="22+">22+ days</option>
                    </select>
                    {errors.duration && (
                      <div className="flex items-center space-x-1 mt-1">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-500">{errors.duration}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Budget (USD) *
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${
                      errors.budget ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select budget range</option>
                    <option value="under-1000">Under $1,000</option>
                    <option value="1000-2000">$1,000 - $2,000</option>
                    <option value="2000-3000">$2,000 - $3,000</option>
                    <option value="3000-5000">$3,000 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="10000+">$10,000+</option>
                  </select>
                  {errors.budget && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-500">{errors.budget}</span>
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