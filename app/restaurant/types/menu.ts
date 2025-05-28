import { z } from 'zod';

// Choices schema for add-ons like milk options
export const ChoiceSchema = z.object({
  name: z.string(),
  price: z.string().optional(),
});

// Options schema for item customizations
export const OptionGroupSchema = z.object({
  group: z.string(),
  choices: z.array(ChoiceSchema),
});

// Variant schema for items with different sizes/options
export const VariantSchema = z.object({
  name: z.string(),
  price: z.string(),
});

// Menu item schema
export const MenuItemSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.string().optional(),
  variants: z.array(VariantSchema).optional(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  imageUrl: z.string().optional(), // Added for Sanity integration
  soldOut: z.boolean().optional(),
  popular: z.boolean().optional(),
});

// Category schema
export const CategorySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  basePrice: z.string().optional(),
  price: z.string().optional(),
  items: z.array(MenuItemSchema),
  options: z.union([
    z.array(OptionGroupSchema),
    z.record(z.string(), z.array(z.string()))
  ]).optional(),
});

// Section schema
export const SectionSchema = z.object({
  section: z.string(),
  description: z.string().optional(),
  categories: z.array(CategorySchema),
});

// Complete menu schema
export const MenuSchema = z.object({
  menu: z.array(SectionSchema),
});

// Infer TypeScript types from Zod schemas
export type Choice = z.infer<typeof ChoiceSchema>;
export type OptionGroup = z.infer<typeof OptionGroupSchema>;
export type Variant = z.infer<typeof VariantSchema>;
export type MenuItem = z.infer<typeof MenuItemSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type Section = z.infer<typeof SectionSchema>;
export type Menu = z.infer<typeof MenuSchema>;

// Filter types
export type DietaryFilter = 'all' | 'vegetarian' | 'vegan' | 'gluten-free';
