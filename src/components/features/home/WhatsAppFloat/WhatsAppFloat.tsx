import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../../../../utils/constants';
import { getDestinationBySlug } from '../../../../data/destinationsData';

const WhatsAppFloat = () => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  
  // Check if we're on a destination detail page
  const isDestinationPage = location.pathname.startsWith('/destinations/');
  const destinationSlug = isDestinationPage ? location.pathname.split('/destinations/')[1] : null;
  const destination = destinationSlug ? getDestinationBySlug(destinationSlug) : null;
  
  // Create context-aware message
  const getMessage = () => {
    if (destination) {
      return `Hi! I'm interested in learning more about travel destinations in ${destination.name}. Please provide detailed information about:

• Popular attractions
• Recommended duration of stay
• Best time to visit
• Accommodation options
• Estimated costs
• Available tour packages

Looking forward to your expert guidance!`;
    }
    
    return "Hi! I'm interested in planning a trip with High Bees Holidays. Can you help me?";
  };
  
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(getMessage());
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
        
        {/* Tooltip */}
        <div className={`absolute right-full mr-3 top-1/2 transform -translate-y-1/2 transition-all duration-200 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}>
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
            {destination ? `Ask about ${destination.name}` : 'Chat with us on WhatsApp'}
            <div className="absolute top-1/2 left-full transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default WhatsAppFloat;