import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Wrapper component to provide common contexts needed by our components
const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

const customRender = (ui: React.ReactElement, options = {}) => {
  return render(ui, { wrapper: AllProviders, ...options });
};

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };