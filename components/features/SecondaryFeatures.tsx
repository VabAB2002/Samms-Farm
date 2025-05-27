"use client";

import SecondaryFeatureCard from './SecondaryFeatureCard';

const SecondaryFeatures = () => {
  const features = [
    {
      id: 'merchandise',
      title: "Provisions",
      description: "Take the farm experience home — organic coffee, craft brews, handcrafted mugs, and more. Each item carries our story of sustainability and care.",
      imageUrl: "/images/merchandise.jpg",
      buttonText: "Browse Our Goods",
      buttonLink: "#shop",
      imageOnRight: false
    },
    {
      id: 'blog',
      title: "Journal",
      description: "Reflections from the land, daily thoughts, and wisdom gathered through seasons of farming, cooking, and community building.",
      imageUrl: "/images/blog.jpg",
      buttonText: "Read & Subscribe",
      buttonLink: "#blog",
      imageOnRight: true
    }
  ];

  return (
    <section className="bg-cream-100 py-8 px-4 md:py-12 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {features.map((feature) => (
          <div key={feature.id} className="group">
            <SecondaryFeatureCard
              title={feature.title}
              description={feature.description}
              imageUrl={feature.imageUrl}
              buttonText={feature.buttonText}
              buttonLink={feature.buttonLink}
              imageOnRight={feature.imageOnRight}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SecondaryFeatures;
