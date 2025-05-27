/**
 * Tailwind Color Theme for Sanity Studio
 * Uses the earthy green/brown palette as specified in requirements
 */
import { buildLegacyTheme } from 'sanity';

// Brand colors from Tailwind palette
const props = {
  // Brand colors
  '--brand-primary': '#3F6212', // moss-700
  '--brand-secondary': '#854D0E', // brown-600
  '--brand-tertiary': '#C2410C', // terracotta-600
  
  // Default button colors
  '--default-button-primary-color': '#4D7C0F', // moss-600
  '--default-button-success-color': '#65A30D', // moss-500
  '--default-button-warning-color': '#FACC15', // yellow-400
  '--default-button-danger-color': '#DC2626', // red-600
  
  // State colors
  '--state-info-color': '#65A30D', // moss-500
  '--state-success-color': '#16A34A', // green-600
  '--state-warning-color': '#D97706', // amber-600
  '--state-danger-color': '#C2410C', // terracotta-600
  
  // UI colors
  '--main-navigation-color': '#FFFAF0', // cream-50
  '--main-navigation-color--inverted': '#3F6212', // moss-700
  
  // Text colors
  '--body-text': '#422006', // brown-900
  '--focus-color': '#D97706', // amber-600
};

export const tailwindColorTheme = buildLegacyTheme(props);
