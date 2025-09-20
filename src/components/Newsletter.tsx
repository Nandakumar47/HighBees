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
    <section className="py-16 lg:py-20 bg-gradient-to-br from-primary-500 to-primary-700 relative overflow-hidden">
      {/* Background Pattern - De-emphasized */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content with improved hierarchy */}
          <div className="text-white">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              Never Miss a Deal
            </h2>
            <p className="text-lg sm:text-xl text-primary-100 mb-8 leading-relaxed font-light">
              Subscribe to our newsletter and be the first to know about
              exclusive offers, new destinations, and travel inspiration.
            </p>

            {/* Benefits with better hierarchy */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-start space-x-5">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mt-1 flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-primary-100 text-base leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Newsletter Form with improved hierarchy */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-12">
            {!isSubscribed ? (
              <div>
                <div className="text-center mb-10">
                  <div className="bg-primary-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-10 h-10 text-primary-500" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Join Our Travel Community
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    Get weekly travel inspiration and exclusive deals delivered
                    to your inbox.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
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
                    icon={Send}
                    iconPosition="left"
                  >
                    Subscribe Now
                  </LoadingButton>

                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    By subscribing, you agree to our Privacy Policy and Terms of
                    Service. You can unsubscribe at any time.
                  </p>
                </form>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Welcome Aboard!
                </h3>
                <p className="text-gray-600 text-base mb-8 leading-relaxed">
                  Thank you for subscribing to our newsletter. You'll start
                  receiving exclusive travel deals and inspiration soon.
                </p>
                <button
                  onClick={() => setIsSubscribed(false)}
                  className="text-primary-500 hover:text-primary-600 font-medium transition-colors text-base"
                >
                  Subscribe another email
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Social Proof - De-emphasized */}
        <div className="mt-20 text-center text-white">
          <p className="text-primary-100 text-base mb-6 font-light">
            Join over 100,000 travelers who trust High Bees Holidays
          </p>
          <div className="flex items-center justify-center space-x-8">
            <div className="text-xl font-semibold">50,000+</div>
            <div className="w-px h-8 bg-primary-300" />
            <div className="text-xl font-semibold">Newsletter Subscribers</div>
            <div className="w-px h-8 bg-primary-300" />
            <div className="text-xl font-semibold">4.9★</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
