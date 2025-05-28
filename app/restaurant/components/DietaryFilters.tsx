"use client";

import React from 'react';
import { IoLeaf } from 'react-icons/io5';
import { GiWheat } from 'react-icons/gi';
import { FaCarrot } from 'react-icons/fa';
import { DietaryFilter } from '../types/menu';

interface DietaryFiltersProps {
  activeFilter: DietaryFilter;
  setActiveFilter: (filter: DietaryFilter) => void;
}

const DietaryFilters: React.FC<DietaryFiltersProps> = ({ activeFilter, setActiveFilter }) => {
  // Filter badges with icons
  const dietaryFilters: {
    id: DietaryFilter;
    label: string;
    icon: React.ReactNode;
  }[] = [
    { id: 'all', label: 'All', icon: null },
    { id: 'vegetarian', label: 'Vegetarian', icon: <FaCarrot className="text-green-600" /> },
    { id: 'vegan', label: 'Vegan', icon: <IoLeaf className="text-green-700" /> },
    { id: 'gluten-free', label: 'Gluten-Free', icon: <GiWheat className="text-amber-600" /> }
  ];

  return (
    <div className="flex flex-wrap gap-2.5">
      {dietaryFilters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
            activeFilter === filter.id
              ? 'bg-moss-100 text-moss-800'
              : 'text-brown-600 hover:bg-cream-100'
          }`}
        >
          {filter.icon}
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default DietaryFilters;
