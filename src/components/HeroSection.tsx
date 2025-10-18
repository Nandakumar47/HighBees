import { useState, useEffect } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRouteNavigation } from "../hooks/useRouteNavigation";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const { navigateToDestinations } = useRouteNavigation();
  const destinationImages = [
    "https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?auto=compress&cs=tinysrgb&w=1920",
    "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280",
    "https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=1920",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % destinationImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [destinationImages.length]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Hide scroll indicator after scrolling 200px
      setShowScrollIndicator(scrollY < 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-16 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
            {/* Left Side - Content */}
            <div className="w-full lg:w-2/3">
              <div className="max-w-2xl mx-auto lg:mx-0">
                {/* Bold Headline */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
                  <span className="text-[#FFAA05]"> Explore</span> the World{" "}
                  Live the Story.
                </h1>

                {/* Descriptive Paragraph */}
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 lg:mb-12 leading-relaxed font-light">
                  Join <span className="font-bold">High Bees Holidays</span> and
                  discover extraordinary destinations around the world. From
                  pristine beaches to majestic mountains, we craft unforgettable
                  travel experiences tailored just for{" "}
                  <span className="font-bold">You!</span>
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Primary Button */}
                  <button
                    className="group bg-[#FFAA05] hover:bg-[#FFAA05]/90 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg flex items-center justify-center"
                    onClick={navigateToDestinations}
                  >
                    <span>Start Your Adventure</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  {/* Secondary Link */}
                  {/* <button className="text-gray-600 hover:text-blue-600 font-medium text-base sm:text-lg transition-colors duration-300 underline underline-offset-4 hover:underline-offset-8 text-center sm:text-left">
                    Explore Our Packages
                  </button> */}
                </div>
              </div>
            </div>

            {/* Right Side - Instax Style Photo */}
            <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-xs sm:max-w-sm mx-auto lg:mx-0">
                {/* Instax Photo Container */}
                <div className="relative bg-white p-3 sm:p-4 rounded-2xl shadow-2xl">
                  {/* Photo Area */}
                  <div className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden rounded-xl">
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
                  <div className="mt-3 sm:mt-4 text-center">
                    <div className="text-xs sm:text-sm text-gray-500 font-medium">
                      HighBees Holidays
                    </div>
                    {/* <div className="text-xs text-gray-400 mt-1">
                      {new Date().toLocaleDateString()}
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <ChevronDown className="w-6 h-6" />
            <span className="text-xs font-medium tracking-wide uppercase">
              Scroll
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
