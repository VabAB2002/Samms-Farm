import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FarmContent from './components/FarmContent';

export const metadata = {
  title: "Farm | Samm's Farm",
  description: "Our working farm focused on sustainability, interdependence, and healing the land."
};



export default function FarmPage() {
  return (
    <>
      <Header />
      <FarmContent />
      <Footer />
    </>
  );
}
