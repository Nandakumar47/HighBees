import React, { useState } from "react";
import { Mail, Send, CheckCircle, Gift, Globe, Plane } from "lucide-react";
import LoadingButton from "./LoadingButton";
import Input from "./common/Input/Input";
import { useLoading } from "../hooks/useLoading";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { isLoading, withLoading } = useLoading();

  const benefits = [
    {
      icon: Gift,
      title: "Exclusive Deals",
      description: "Get access to special offers and early bird discounts",
    },
    {
      icon: Globe,
      title: "Travel Inspiration",
      description: "Discover new destinations and hidden gems worldwide",
    },
    {
      icon: Plane,
      title: "Travel Tips",
      description:
        "Expert advice and insider tips for better travel experiences",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    await withLoading(async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubscribed(true);
      setEmail("");
    });
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-500 to-primary-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Never Miss a Deal
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Subscribe to our newsletter and be the first to know about
              exclusive offers, new destinations, and travel inspiration.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-white bg-opacity-20 rounded-lg p-2 mt-1">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-primary-100">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Newsletter Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            {!isSubscribed ? (
              <div>
                <div className="text-center mb-8">
                  <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-primary-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Join Our Travel Community
                  </h3>
                  <p className="text-gray-600">
                    Get weekly travel inspiration and exclusive deals delivered
                    to your inbox.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      id="email"
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      disabled={isLoading}
                      endAdornment={<Mail className="w-5 h-5 text-gray-400" />}
                    />
                  </div>

                  <LoadingButton
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Subscribing..."
                    className="w-full"
                    variant="primary"
                  >
                    <Send className="w-5 h-5" />
                    <span>Subscribe Now</span>
                  </LoadingButton>

                  <p className="text-xs text-gray-500 text-center">
                    By subscribing, you agree to our Privacy Policy and Terms of
                    Service. You can unsubscribe at any time.
                  </p>
                </form>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome Aboard!
                </h3>
                <p className="text-gray-600 mb-6">
                  Thank you for subscribing to our newsletter. You'll start
                  receiving exclusive travel deals and inspiration soon.
                </p>
                <button
                  onClick={() => setIsSubscribed(false)}
                  className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
                >
                  Subscribe another email
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center text-white">
          <p className="text-primary-100 mb-4">
            Join over 100,000 travelers who trust High Bees Holidays
          </p>
          <div className="flex items-center justify-center space-x-8">
            <div className="text-2xl font-bold">50,000+</div>
            <div className="w-px h-8 bg-primary-300" />
            <div className="text-2xl font-bold">Newsletter Subscribers</div>
            <div className="w-px h-8 bg-primary-300" />
            <div className="text-2xl font-bold">4.9★</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
