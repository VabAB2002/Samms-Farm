"use client";

import React from 'react';
import Menu from '../components/Menu';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-cream-50 bg-grain">
      <Header />
      <main className="py-12 md:py-20">
        <section className="container mx-auto px-4">
          {/* Full Menu with all sections */}
          <Menu />
        </section>
      </main>
      <Footer />
    </div>
  );
}
