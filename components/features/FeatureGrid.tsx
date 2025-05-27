"use client";

import React from 'react';
import FeatureCard from './FeatureCard';

const FeatureGrid = () => {
  const features = [
    {
      id: 'restaurant',
      title: "Restaurant",
      description: "A farm-to-table café that serves fresh, wholesome meals with warmth and connection.",
      imageUrl: "/images/restaurant.jpg",
      buttonText: "Our Menu",
      buttonLink: "#restaurant",
      comingSoon: false
    },
    {
      id: 'farm',
      title: "Farm",
      description: "Our working farm focused on sustainability, interdependence, and healing the land.",
      imageUrl: "/images/farm.jpg",
      buttonText: "Farm Experience",
      buttonLink: "#farm",
      comingSoon: false
    },
    {
      id: 'resort',
      title: "Resort",
      description: "A mindful sanctuary in nature, built with purpose and presence for rejuvenation.",
      imageUrl: "/images/resort.jpg",
      buttonText: "Coming Soon",
      buttonLink: "#resort",
      comingSoon: true
    }
  ];

  return (
    <section className="bg-cream-100 py-8 px-4 md:py-12 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
            imageUrl={feature.imageUrl}
            buttonText={feature.buttonText}
            buttonLink={feature.buttonLink}
            comingSoon={feature.comingSoon}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureGrid;
