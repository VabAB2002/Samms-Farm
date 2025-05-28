"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Animation variants
const categoryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

interface ChoiceOption {
  name: string;
  price?: string;
}

interface GroupOption {
  group: string;
  choices: ChoiceOption[];
}

interface CategoryOptionsProps {
  options: any; // This can be an array or a record object
}

const CategoryOptions: React.FC<CategoryOptionsProps> = ({ options }) => {
  // Handle array-based options (groups of choices)
  if (Array.isArray(options) && options.length > 0) {
    return (
      <motion.div 
        className="mt-8 bg-cream-50 p-5 rounded-lg border border-cream-200 shadow-sm"
        variants={categoryVariants}
      >
        <h4 className="font-medium text-brown-800 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-terracotta-400 rounded-full"></span>
          Options
        </h4>
        <div className="space-y-4">
          {options.map((option: GroupOption, idx: number) => (
            <div key={idx}>
              <p className="text-sm font-medium text-brown-700">{option.group}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {option.choices.map((choice, choiceIdx) => (
                  <span key={choiceIdx} className="text-xs bg-cream-100 text-brown-700 px-2.5 py-1.5 rounded-full shadow-sm">
                    {choice.name} {choice.price && <span className="font-medium">{choice.price}</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }
  
  // Handle record-based options (named groups with string arrays)
  if (options && !Array.isArray(options) && Object.keys(options).length > 0) {
    return (
      <motion.div 
        className="mt-8 bg-cream-50 p-5 rounded-lg border border-cream-200 shadow-sm"
        variants={categoryVariants}
      >
        <div className="space-y-4">
          {Object.entries(options).map(([optionName, choices], idx) => (
            <div key={idx}>
              <p className="text-sm font-medium text-brown-700 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-terracotta-400 rounded-full"></span>
                {optionName}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {(choices as string[]).map((choice, choiceIdx) => (
                  <span key={choiceIdx} className="text-xs bg-cream-100 text-brown-700 px-2.5 py-1.5 rounded-full shadow-sm">
                    {choice}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }
  
  // Return null if no options
  return null;
};

export default CategoryOptions;
