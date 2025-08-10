import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturedDestinations from "../components/FeaturedDestinations";
import ServicesSection from "../components/ServicesSection";
import SpecialOffers from "../components/SpecialOffers";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div className="animate-fade-in">
      <HeroSection />
      <FeaturedDestinations />
      <ServicesSection />
      {/* <SpecialOffers /> */}
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
