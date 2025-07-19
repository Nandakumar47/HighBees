import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ROUTES } from "../../../utils/constants";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if current path is destinations or destination detail
  const isDestinationsActive =
    location.pathname === ROUTES.DESTINATIONS ||
    location.pathname.startsWith("/destinations/");

  const navigation = [
    { name: "Home", href: ROUTES.HOME },
    { name: "Destinations", href: ROUTES.DESTINATIONS },
    { name: "Make Enquiry", href: ROUTES.ENQUIRY, special: true },
    { name: "Contact", href: ROUTES.CONTACT },
    { name: "About", href: ROUTES.ABOUT },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-3 group">
            <img
              src="/logo.png "
              alt="High Bees Holidays"
              className="h-10 w-auto -mt-[8px] rounded-full"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-lg lg:text-xl font-bold text-gray-900">
                High Bees
              </span>
              <span className="-mt-[4px] text-sm lg:text-base text-gray-500 text-right font-semibold">
                Holidays
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive =
                item.name === "Destinations"
                  ? isDestinationsActive
                  : location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-all duration-300 relative group pb-1 ${
                    isActive
                      ? "text-primary-500"
                      : "text-gray-700 hover:text-primary-500"
                  }`}
                >
                  {item.name}

                  {/* Static blue underline ONLY for Make Enquiry */}
                  {item.special && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0066CC]"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-slide-up">
            <div className="space-y-2">
              {navigation.map((item) => {
                const isActive =
                  item.name === "Destinations"
                    ? isDestinationsActive
                    : location.pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 relative ${
                      isActive
                        ? "text-primary-500 bg-primary-50"
                        : item.special
                        ? "text-primary-500 mx-3 border border-primary-200 bg-primary-50 hover:bg-primary-100"
                        : "text-gray-700 hover:text-primary-500 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}

                    {/* Mobile static underline ONLY for Make Enquiry */}
                    {item.special && (
                      <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-[#0066CC] rounded-full"></span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
