import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import ProductPreview from '../../components/ProductPreview/ProductPreview';
import FeatureCards from '../../components/FeatureCards/FeatureCards';
import HowItWorks from '../../components/HowItWorks/HowItWorks';

const LandingPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductPreview />
      <FeatureCards />
      <HowItWorks />
    </>
  );
};

export default LandingPage;
