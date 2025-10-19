import { useState, useEffect } from "react";
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
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
          {/* Logo with improved mobile sizing */}
          <Link
            to={ROUTES.HOME}
            className="flex items-center space-x-2 sm:space-x-3 group"
          >
            <img
              src="/logo.png "
              alt="High Bees Holidays"
              className="h-8 sm:h-10 w-auto -mt-[6px] sm:-mt-[8px] rounded-full"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                High Bees
              </span>
              <span className="-mt-[3px] sm:-mt-[4px] text-xs sm:text-sm lg:text-base text-gray-500 text-right font-semibold">
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
                </Link>
              );
            })}

            {/* Make Enquiry Button - Rightmost */}
            <Link
              to={ROUTES.ENQUIRY}
              className="bg-[#FFAA05] hover:bg-[#FFAA05]/90 text-black px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Make Enquiry
            </Link>
          </div>

          {/* Mobile Menu Button with improved sizing */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu with improved mobile layout */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-3 sm:py-4 animate-slide-up">
            <div className="space-y-1 sm:space-y-2">
              {navigation.map((item) => {
                const isActive =
                  item.name === "Destinations"
                    ? isDestinationsActive
                    : location.pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                      isActive
                        ? "text-primary-500 bg-primary-50"
                        : "text-gray-700 hover:text-primary-500 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* Make Enquiry Button - Mobile */}
              <Link
                to={ROUTES.ENQUIRY}
                className="block bg-[#FFAA05] hover:bg-[#FFAA05]/90 text-black px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 text-center hover:scale-105 hover:shadow-lg mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Make Enquiry
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
