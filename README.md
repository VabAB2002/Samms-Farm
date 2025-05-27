# Samm's Farm Kitchen & Brewery

A modern, responsive website for Samm's Farm Kitchen & Brewery with content management through Sanity CMS, e-commerce functionality via Shopify Lite, and newsletter integration with Mailchimp.



## Tech Stack

| Component | Tool/Platform | Purpose |
| --------- | ------------- | ------- |
| Frontend | Next.js + Tailwind CSS | Clean UI, fast performance |
| CMS | Sanity.io | Manage content: blog, images, text |
| E-commerce | Shopify Lite | Sell merch with embedded buy buttons |
| Hosting | Vercel | Free, optimized deployment |
| Newsletter | Mailchimp | Email capture and blog distribution |

## Pages Structure

| Page | URL Path | CMS Source |
| ---- | -------- | ---------- |
| Homepage | `/` | Sanity CMS |
| Samms Restaurant | `/restaurant` | Static |
| Samms Farm | `/farm` | Static |
| Samms Resort | `/resort` | Static or placeholder |
| Merchandise | `/shop` | Shopify Buy Embed |
| Blog | `/blog` | Sanity CMS |
| Newsletter | `/newsletter` | Mailchimp embed |

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- A Sanity.io account
- A Shopify account (with Shopify Lite at minimum)
- A Mailchimp account

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd project
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   ```bash
   cp .env.local.example .env.local
   ```
   
   Then edit `.env.local` with your actual API keys and credentials.

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

### Sanity CMS

1. Create a new Sanity project at [sanity.io/manage](https://sanity.io/manage)
2. Update the Sanity configuration in `.env.local` with your project ID

### Sanity CMS Configuration

### Content Structure

The following content types are defined in Sanity:

#### Core Content Types
- **siteSettings**: Global settings including contact info, social links, business hours, and SEO defaults
- **homeHero**: Hero section configuration for the homepage
- **homeTile**: Interactive tile sections for the homepage
- **mediaAsset**: Reusable media items (images, videos) with categorization
- **product**: Shop products linked to Shopify inventory

#### Blog & Events
- **blogPost**: Blog articles with rich text content, categories, and authors
- **author**: Blog post author profiles
- **category**: Content categorization system
- **event**: Farm and restaurant events with booking information

#### Restaurant
- **menuPdf**: Uploadable menu PDFs for the restaurant
- **menuItem**: Individual menu items with descriptions and pricing
- **testimonial**: Customer reviews and testimonials

### Media Management

The media asset management system includes:

- **Categorized Media**: Images and videos organized by section (farm, restaurant, brewery)
- **Custom Media Gallery**: A responsive, interactive gallery component with multiple layout options
- **Media Metadata**: Supports alternative text, captions, and tags for better accessibility and SEO
- **Video Support**: Both uploaded videos and external video embeds (YouTube, Vimeo)

### E-commerce Integration (Shopify Lite)

### Features

- **Products in Sanity**: Products are defined in Sanity with fields for Shopify product IDs
- **Shopping Cart**: Client-side cart with persistent storage
- **Checkout Integration**: Seamless handoff to Shopify for secure checkout
- **Product Components**:
  - ProductCard for displaying products in grid layouts
  - ShoppingCart drawer for cart management

### Setup

1. Create a Shopify store or use your existing one
2. Set up products in your Shopify store
3. Add your Shopify API credentials to `.env.local`:
   ```
   NEXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
   NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN=your-storefront-access-token
   ```
4. Link products in Sanity to Shopify by adding the Shopify product IDs

### Newsletter Integration (Mailchimp)

### Features

- **Newsletter Signup Form**: Customizable component with light/dark modes
- **Double Opt-in**: Follows best practices for email marketing
- **API Integration**: Direct connection to Mailchimp API
- **Error Handling**: Graceful error handling for existing subscribers

### Setup

1. Create a Mailchimp account or use your existing one
2. Set up a list for subscribers
3. Add your Mailchimp API credentials to `.env.local`:
   ```
   MAILCHIMP_API_KEY=your-api-key
   MAILCHIMP_LIST_ID=your-audience-id
   MAILCHIMP_DC=us1 (or your data center)
   ```

## Deployment

The project is optimized for deployment on Vercel:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project on [Vercel](https://vercel.com/new)
3. Configure the environment variables
4. Deploy!

## Customization

- Update the branding and styling in `tailwind.config.js`
- Modify page layouts in the `/app` directory
- Update components in the `/components` directory
- Extend functionality by adding new features as needed

## License

This project is licensed under the MIT License.
