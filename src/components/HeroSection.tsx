import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:
        "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280",
      title: "Discover Paradise Islands",
      subtitle: "Escape to crystal-clear waters and pristine beaches",
    },
    {
      image:
        "https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280",
      title: "Mountain Adventures Await",
      subtitle: "Experience breathtaking peaks and scenic hiking trails",
    },
    {
      image:
        "https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280",
      title: "Cultural City Experiences",
      subtitle: "Immerse yourself in rich history and vibrant cultures",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative h-full flex items-center justify-center text-center text-white">
            <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
              {/* Primary heading with better hierarchy */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight animate-slide-up">
                {slide.title}
              </h1>
              {/* Secondary content with de-emphasized styling */}
              <p
                className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                {slide.subtitle}
              </p>

              {/* CTA Button with proper hierarchy */}
              <div
                className="animate-slide-up"
                style={{ animationDelay: "0.4s" }}
              >
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-lg font-medium hover:bg-white/20 hover:border-white/30 transition-all duration-300 text-lg">
                  Explore Destinations
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - De-emphasized */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-105"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-105"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators - De-emphasized */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator - De-emphasized */}
      <div className="absolute bottom-12 right-12 text-white/70 animate-bounce">
        <div className="flex flex-col items-center space-y-3">
          <span className="text-xs font-medium tracking-wide uppercase">
            Scroll
          </span>
          <div className="w-px h-6 bg-white/50" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
