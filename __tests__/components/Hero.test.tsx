import React from 'react'
import { render, screen } from '@testing-library/react'
import Hero from '../../app/components/Hero'

// Mock the urlFor function from sanityClient
jest.mock('@/lib/sanity/sanityClient', () => ({
  urlFor: jest.fn().mockImplementation(() => ({
    width: () => ({
      url: () => 'https://example.com/mocked-image.jpg'
    }),
    url: () => 'https://example.com/mocked-image.jpg'
  }))
}))

// Mock next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}))

// Mock next/link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode, href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe('Hero Component', () => {
  const mockHeroProps = {
    hero: {
      headline: 'Welcome to Sam\'s Farm',
      subHeadline: 'Experience farm-to-table dining in a rustic setting',
      overlayColor: 'dark',
      overlayOpacity: 50,
      heroMedia: {
        type: 'image',
        image: { asset: { _ref: 'image-ref' } },
        alt: 'Farm landscape'
      },
      ctaButton: {
        label: 'Book a Table',
        href: '/restaurant',
        style: 'primary'
      },
      secondaryCta: {
        label: 'Explore the Farm',
        href: '/farm'
      }
    }
  }

  it('renders headline correctly', () => {
    render(<Hero {...mockHeroProps} />)
    expect(screen.getByText('Welcome to Sam\'s Farm')).toBeInTheDocument()
  })

  it('renders subheadline when provided', () => {
    render(<Hero {...mockHeroProps} />)
    expect(screen.getByText('Experience farm-to-table dining in a rustic setting')).toBeInTheDocument()
  })

  it('renders CTA buttons with correct labels and links', () => {
    render(<Hero {...mockHeroProps} />)
    
    const primaryCta = screen.getByText('Book a Table')
    expect(primaryCta).toBeInTheDocument()
    expect(primaryCta.closest('a')).toHaveAttribute('href', '/restaurant')
    
    const secondaryCta = screen.getByText('Explore the Farm')
    expect(secondaryCta).toBeInTheDocument()
    expect(secondaryCta.closest('a')).toHaveAttribute('href', '/farm')
  })

  it('renders image when image type is provided', () => {
    render(<Hero {...mockHeroProps} />)
    const heroImage = screen.getByAltText('Farm landscape')
    expect(heroImage).toBeInTheDocument()
  })

  it('applies the correct overlay class based on color and opacity', () => {
    render(<Hero {...mockHeroProps} />)
    // Since we're using Tailwind classes, we need to check if the overlay div has the correct classes
    // For 'dark' overlay with 50% opacity, we expect 'bg-brown-900 bg-opacity-50'
    const overlayDiv = document.querySelector('.absolute.inset-0.z-10')
    expect(overlayDiv).toHaveClass('bg-brown-900')
    expect(overlayDiv).toHaveClass('bg-opacity-50')
  })
})
