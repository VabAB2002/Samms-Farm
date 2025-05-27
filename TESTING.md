# Testing Documentation for Sam's Farm

This document outlines the testing approach used in the Sam's Farm website project.

## Testing Stack

- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing utilities for React components
- **Jest DOM**: Custom jest matchers for DOM testing

## Test Structure

Tests are organized in the `__tests__` directory, mirroring the structure of the source code:

- `__tests__/components`: Tests for React components
- `__tests__/lib`: Tests for utility functions and API integrations

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch
```

## Test Coverage

To generate a test coverage report:

```bash
npm test -- --coverage
```

## Component Testing Approach

Components are tested with these principles in mind:

1. **Functionality over implementation**: Tests verify what components do, not how they're built
2. **Accessibility**: Components are tested for proper ARIA attributes and keyboard navigation
3. **Responsiveness**: Key UI components are tested in different viewport sizes

## Integration Testing

Integration tests focus on:

1. **Sanity CMS Integration**: Verifying content is properly fetched and displayed
2. **Shopify Integration**: Testing cart functionality and product displays
3. **Mailchimp Newsletter**: Testing subscription forms and confirmation flows

## Writing New Tests

When adding new features, follow this testing checklist:

1. Write tests for new components
2. Update existing tests if modifying functionality
3. Verify tests pass locally before committing
4. Check test coverage remains above threshold (target: >80%)
