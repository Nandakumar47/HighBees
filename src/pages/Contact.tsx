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
import { useToast } from "../components/common/Toast/Toast";
import { getErrorMessage } from "../utils/apiErrorHandler";
import axios from "axios";
import { CONTACT_INFO } from "../utils/constants";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, withLoading } = useLoading();
  const { showSuccess, showError } = useToast();

  const validateForm = () => {
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
    } else if (
      !/^[+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-()]/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await withLoading(async () => {
      sendEnquiry();
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: [CONTACT_INFO.phone],
      description: "Mon-Fri 9AM-8PM, Sat-Sun 10AM-6PM EST",
    },
    {
      icon: Mail,
      title: "Email",
      details: [CONTACT_INFO.email, "support@highbeesholidays.com"],
      description: "We respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Office",
      details: [CONTACT_INFO.address],
      description: "Visit us by appointment",
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Monday - Friday: 9AM - 8PM", "Weekend: 10AM - 6PM"],
      description: "Eastern Standard Time",
    },
  ];
  const sendEnquiry = async () => {
    try {
      const response = await axios.post("/api/contact", {
        name: formData.name,
        contactNo: formData.phone,
        emailId: formData.email,
        message: formData.message,
      });
      if (response.status === 201) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        showSuccess(
          "Message sent successfully! We'll get back to you within 24 hours."
        );
      }
      console.log("Enquiry created successfully:", response.data);
    } catch (error) {
      console.error("Error creating enquiry:", error);
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {/* Header with improved hierarchy */}
        <div className="text-center mb-16 lg:mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Ready to start planning your next adventure? We're here to help make
            your travel dreams come true.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
          {/* Contact Form with improved mobile hierarchy */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                Send us a Message
              </h2>

              {!isSubmitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                      label="Phone Number *"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      error={errors.phone}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm sm:text-base font-semibold text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      rows={4}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed text-sm sm:text-base ${
                        errors.message
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Tell us about your travel plans, preferences, and any specific requirements..."
                    />
                    {errors.message && (
                      <div className="flex items-center space-x-2 mt-2">
                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
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
                    className="w-full shadow-lg hover:shadow-xl min-h-[48px] sm:min-h-[56px] px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
                    variant="primary"
                    size="lg"
                    icon={Send}
                    iconPosition="left"
                  >
                    Send Message
                  </LoadingButton>
                </form>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <div className="bg-green-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed font-light">
                    Thank you for contacting us. Our travel experts will get
                    back to you within 24 hours to help plan your perfect trip.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary-500 hover:text-primary-600 font-semibold transition-colors hover:underline text-sm sm:text-base"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information with improved mobile hierarchy */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Contact Information
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-primary-100 rounded-xl p-2 sm:p-2.5 mt-1 flex-shrink-0">
                        <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                          {info.title}
                        </h4>
                        {info.details.map((detail, idx) => (
                          <p
                            key={idx}
                            className="text-gray-700 text-sm sm:text-base mb-1"
                          >
                            {detail}
                          </p>
                        ))}
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Response */}
            {/* <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-xl font-bold mb-4">Need Immediate Help?</h3>
              <p className="mb-4 opacity-90">
                For urgent travel assistance or last-minute bookings, call our
                24/7 emergency hotline.
              </p>
              <div className="flex items-center space-x-2 mb-4">
                <Phone className="w-5 h-5" />
                <span className="font-semibold">+1 (555) 911-HELP</span>
              </div>
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 border border-white border-opacity-30 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 w-full hover:bg-opacity-40 transform hover:scale-105">
                Call Now
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
