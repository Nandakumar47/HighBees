import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import LoadingButton from "../components/LoadingButton";
import { useLoading } from "../hooks/useLoading";
import Input from "../components/common/Input/Input";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, withLoading } = useLoading();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await withLoading(async () => {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Mon-Fri 9AM-8PM, Sat-Sun 10AM-6PM EST",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@highbeesholidays.com", "support@highbeesholidays.com"],
      description: "We respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Office",
      details: ["123 Travel Street", "Adventure City, AC 12345"],
      description: "Visit us by appointment",
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Monday - Friday: 9AM - 8PM", "Weekend: 10AM - 6PM"],
      description: "Eastern Standard Time",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start planning your next adventure? We're here to help make
            your travel dreams come true.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      id="name"
                      name="name"
                      label="Full Name *"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      error={errors.name}
                      placeholder="Your full name"
                    />
                    <Input
                      id="email"
                      name="email"
                      label="Email Address *"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      error={errors.email}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <Input
                      id="phone"
                      name="phone"
                      label="Phone Number"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Tell us about your travel plans, preferences, and any specific requirements..."
                    />
                    {errors.message && (
                      <div className="flex items-center space-x-1 mt-1">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-500">
                          {errors.message}
                        </span>
                      </div>
                    )}
                  </div>

                  <LoadingButton
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Sending Message..."
                    className="w-full transform hover:scale-105"
                    variant="primary"
                    size="lg"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </LoadingButton>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting us. Our travel experts will get
                    back to you within 24 hours to help plan your perfect trip.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-primary-100 rounded-lg p-2 mt-1">
                        <Icon className="w-5 h-5 text-primary-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {info.title}
                        </h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600">
                            {detail}
                          </p>
                        ))}
                        <p className="text-sm text-gray-500 mt-1">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Response */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Need Immediate Help?</h3>
              <p className="mb-4 opacity-90">
                For urgent travel assistance or last-minute bookings, call our
                24/7 emergency hotline.
              </p>
              <div className="flex items-center space-x-2 mb-4">
                <Phone className="w-5 h-5" />
                <span className="font-semibold">+1 (555) 911-HELP</span>
              </div>
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 border border-white border-opacity-30 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 w-full">
                Call Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
