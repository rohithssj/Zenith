import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import ProductPreview from '../../components/ProductPreview/ProductPreview';
import FeatureCards from '../../components/FeatureCards/FeatureCards';

const LandingPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductPreview />
      <FeatureCards />
    </>
  );
};

export default LandingPage;
