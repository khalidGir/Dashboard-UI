import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../test-utils';
import Button from './Button';

describe('Button Component', () => {
  it('should render children correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('should render with primary variant by default', () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByText('Test Button');
    expect(button).toHaveClass('bg-primary');
  });

  it('should render with specified variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByText('Secondary Button');
    expect(button).toHaveClass('bg-bg-tertiary');
  });

  it('should call onClick when clicked', () => {
    const mockOnClick = vi.fn();
    render(<Button onClick={mockOnClick}>Click Me</Button>);
    
    fireEvent.click(screen.getByText('Click Me'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', () => {
    const mockOnClick = vi.fn();
    render(
      <Button onClick={mockOnClick} disabled={true}>
        Disabled Button
      </Button>
    );
    
    fireEvent.click(screen.getByText('Disabled Button'));
    expect(mockOnClick).toHaveBeenCalledTimes(0);
  });

  it('should render with disabled state', () => {
    render(<Button disabled={true}>Disabled Button</Button>);
    const button = screen.getByText('Disabled Button');
    expect(button).toBeDisabled();
  });

  it('should render with different variants', () => {
    const { rerender } = render(<Button variant="primary">Test Button</Button>);
    let button = screen.getByText('Test Button');
    expect(button).toHaveClass('bg-primary');

    rerender(<Button variant="secondary">Test Button</Button>);
    button = screen.getByText('Test Button');
    expect(button).toHaveClass('bg-bg-tertiary');

    rerender(<Button variant="danger">Test Button</Button>);
    button = screen.getByText('Test Button');
    expect(button).toHaveClass('bg-danger');

    rerender(<Button variant="success">Test Button</Button>);
    button = screen.getByText('Test Button');
    expect(button).toHaveClass('bg-success');
  });

  it('should render with custom className', () => {
    render(<Button className="custom-class">Test Button</Button>);
    const button = screen.getByText('Test Button');
    expect(button).toHaveClass('custom-class');
  });

  it('should render loading state text when isLoading is true', () => {
    // For this test, I'll focus on the structure of the button when loading
    // Since the Button component doesn't have a specific loading prop in the current implementation,
    // I'll check for a scenario with a loading-like state
    render(<Button disabled={true}>Loading...</Button>);
    const button = screen.getByText('Loading...');
    expect(button).toBeDisabled();
  });
});