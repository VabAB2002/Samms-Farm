import '@testing-library/jest-dom';

// This fixes the TypeScript errors for Jest globals
declare global {
  const describe: (name: string, fn: () => void) => void;
  const it: (name: string, fn: () => void) => void;
  const test: (name: string, fn: () => void) => void;
  const expect: any;
  const beforeAll: (fn: () => void) => void;
  const beforeEach: (fn: () => void) => void;
  const afterAll: (fn: () => void) => void;
  const afterEach: (fn: () => void) => void;

  namespace jest {
    function mock(moduleName: string, factory?: any): any;
    function fn(): any;
    function spyOn(object: any, method: string): any;
    function setTimeout(timeout: number): void;
    function resetAllMocks(): void;
    function clearAllMocks(): void;
    function restoreAllMocks(): void;
    
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveClass(...classNames: string[]): R;
    }
  }
}
