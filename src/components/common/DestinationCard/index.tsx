import { Link } from "react-router-dom";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import { Destination } from "../../../types";

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link
      to={`/destinations/${destination.slug}`}
      state={{ id: destination.id }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden block"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48 md:h-56">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {destination.highlight && (
          <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-sm font-semibold text-gray-900">
              {destination.highlight}
            </span>
          </div>
        )}
        {destination.price && (
          <div className="absolute bottom-4 left-4 bg-gold-500 text-white px-3 py-1 rounded-full">
            <span className="text-sm font-bold">From ${destination.price}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1 text-gray-500">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{destination.country}</span>
          </div>
          {/* <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {destination.rating && (
              <span className="text-sm font-medium">{destination.rating}</span>
            )}
            {destination.reviews && (
              <span className="text-sm text-gray-500">
                ({destination.reviews})
              </span>
            )}
          </div> */}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors">
          {destination.name}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {destination.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          {destination.duration && (
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{destination.duration}</span>
            </div>
          )}
          {destination.travelers && (
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{destination.travelers}</span>
            </div>
          )}
        </div>

        <div className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 group-hover:shadow-lg">
          <span>Explore Now</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
