import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const destinationImages = [
    "https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280",
    "https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280",
    "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280",
    "https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % destinationImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [destinationImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % destinationImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + destinationImages.length) % destinationImages.length
    );
  };

  return (
    <section className="relative min-h-screen bg-gray-50 overflow-hidden">
      {/* Subtle Accent Shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-400/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-blue-400/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-green-400/15 rounded-full blur-2xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center p-8 lg:p-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Side - Content */}
            <div className="lg:w-2/3">
              <div className="max-w-2xl">
                {/* Bold Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                  Your <span className="text-blue-600">Dream</span> Journey
                  Awaits
                </h1>

                {/* Descriptive Paragraph */}
                <p className="text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed font-light">
                  Join HighBees Holidays and discover extraordinary destinations
                  around the world. From pristine beaches to majestic mountains,
                  we craft unforgettable travel experiences tailored just for
                  you. Let us turn your wanderlust into reality with our premium
                  travel services and expert local guides.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Primary Button */}
                  <button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg flex items-center justify-center">
                    <span>Start Your Adventure</span>
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  {/* Secondary Link */}
                  <button className="text-gray-600 hover:text-blue-600 font-medium text-lg transition-colors duration-300 underline underline-offset-4 hover:underline-offset-8">
                    Explore Our Packages
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Instax Style Photo */}
            <div className="lg:w-1/3">
              <div className="relative w-full max-w-sm mx-auto">
                {/* Instax Photo Container */}
                <div className="relative bg-white p-4 rounded-2xl shadow-2xl">
                  {/* Photo Area */}
                  <div className="relative h-80 w-full overflow-hidden rounded-xl">
                    {destinationImages.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                          index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <div
                          className="w-full h-full bg-cover bg-center bg-no-repeat"
                          style={{ backgroundImage: `url(${image})` }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Instax Photo Info Area */}
                  <div className="mt-4 text-center">
                    <div className="text-sm text-gray-500 font-medium">
                      HighBees Holidays
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="text-xs font-medium tracking-wide uppercase">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
