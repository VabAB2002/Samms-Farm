import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import schemas from './sanity/schemas';

export default defineConfig({
  name: 'default',
  title: 'Samms',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mfp8ghll',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  plugins: [deskTool(), visionTool()],
  
  schema: {
    types: schemas,
  },
});
