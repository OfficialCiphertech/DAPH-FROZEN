import React from 'react';
import { Phone } from 'lucide-react';

const FloatingContact = () => {
  const handleContactClick = () => {
    const phoneNumber = '+233504759307'; // Your phone number with country code
    const message = 'Hello, I came across your application and would like to get in touch and get a website for my business.'; // Your predefined message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div 
      className="floating-contact cursor-pointer hover:bg-green-600 transition-colors duration-200"
      onClick={handleContactClick}
    >
      <div className="flex items-center space-x-2">
        <Phone className="h-4 w-4" />
        <span>Contact Developer</span>
      </div>
    </div>
  );
};

export default FloatingContact;