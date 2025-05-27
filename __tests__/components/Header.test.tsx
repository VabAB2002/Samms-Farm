import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from '../../components/Header'

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}))

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
  usePathname: () => '/',
}))

describe('Header Component', () => {
  it('renders the Sam Farm logo', () => {
    render(<Header />)
    const logoElement = screen.getByAltText(/sam farm/i)
    expect(logoElement).toBeInTheDocument()
  })
  
  it('displays main navigation items', () => {
    render(<Header />)
    
    // Check for main navigation items from the redesigned header
    expect(screen.getByText(/restaurant/i)).toBeInTheDocument()
    expect(screen.getByText(/farm/i)).toBeInTheDocument()
    expect(screen.getByText(/resort/i)).toBeInTheDocument()
    expect(screen.getByText(/shop/i)).toBeInTheDocument()
    expect(screen.getByText(/blog/i)).toBeInTheDocument()
    expect(screen.getByText(/newsletter/i)).toBeInTheDocument()
  })
  
  it('has a contact us button', () => {
    render(<Header />)
    const contactButton = screen.getByText(/contact us/i)
    expect(contactButton).toBeInTheDocument()
  })
})
