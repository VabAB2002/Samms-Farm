import React from 'react';

export const metadata = {
  title: "Samm's Restaurant",
  description: "Farm-to-table café that serves fresh, wholesome meals with warmth and connection.",
  // Adding Sanity CDN preconnect
  icons: {
    other: [
      {
        rel: 'preconnect',
        url: 'https://cdn.sanity.io'
      }
    ]
  }
};

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
