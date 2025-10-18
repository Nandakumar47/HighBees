import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
} from "lucide-react";
import { ROUTES, CONTACT_INFO } from "../../../utils/constants";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to={ROUTES.HOME} className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="High Bees Holidays"
                className="h-16 w-auto"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold">
                  High <span className="text-primary-400">Bees</span>
                </span>
                <span className="text-sm font-medium text-gray-300">
                  Holidays
                </span>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted travel partner for unforgettable journeys. We create
              personalized experiences that turn your travel dreams into
              reality.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/1A1KyGTwoj/"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/highbeesholidays/"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to={ROUTES.DESTINATIONS}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Destinations
                </Link>
              </li>
              {/* <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Special Offers
                </a>
              </li> */}

              <li>
                <Link
                  to={ROUTES.CONTACT}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.ENQUIRY}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Make an enquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About the site</h3>
            <ul className="space-y-2">
              {/* <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </li> */}
              <li>
                <Link
                  to={ROUTES.ABOUT}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Travel Insurance
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Booking Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Safety Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-400" />
                <span className="text-gray-300">{CONTACT_INFO.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-400" />
                <span className="text-gray-300">{CONTACT_INFO.email}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5" />
                <span className="text-gray-300">{CONTACT_INFO.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 High Bees Holidays. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
