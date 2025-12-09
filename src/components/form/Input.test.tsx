import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test-utils';
import Input from './Input';
import { UseFormRegisterReturn } from 'react-hook-form';

// Mock the register function return type for react-hook-form
const mockRegister: UseFormRegisterReturn = {
  name: 'test-input',
  onBlur: vi.fn(),
  onChange: vi.fn(),
  ref: vi.fn(),
};

describe('Input Component', () => {
  it('should render with label', () => {
    render(
      <Input
        label="Test Label"
        name="test-input"
        register={mockRegister}
      />
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should render with error message when error prop is provided', () => {
    render(
      <Input
        label="Test Label"
        name="test-input"
        register={mockRegister}
        error="This is an error message"
      />
    );

    expect(screen.getByText('This is an error message')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { hidden: true })).toHaveAttribute('aria-invalid', 'true');
  });

  it('should not show error message when error prop is not provided', () => {
    render(
      <Input
        label="Test Label"
        name="test-input"
        register={mockRegister}
      />
    );

    expect(screen.queryByText('error')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox', { hidden: true })).toHaveAttribute('aria-invalid', 'false');
  });

  it('should render with default type as text', () => {
    render(
      <Input
        label="Test Label"
        name="test-input"
        register={mockRegister}
      />
    );

    expect(screen.getByRole('textbox', { hidden: true })).toHaveAttribute('type', 'text');
  });

  it('should render with specified type', () => {
    render(
      <Input
        label="Test Label"
        name="test-input"
        type="email"
        register={mockRegister}
      />
    );

    expect(screen.getByRole('textbox', { hidden: true })).toHaveAttribute('type', 'email');
  });

  it('should call onChange when the input value changes', () => {
    const mockOnChange = vi.fn();
    const mockRegisterWithOnChange: UseFormRegisterReturn = {
      ...mockRegister,
      onChange: mockOnChange,
    };

    render(
      <Input
        label="Test Label"
        name="test-input"
        register={mockRegisterWithOnChange}
      />
    );

    const input = screen.getByRole('textbox', { hidden: true });
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('should have proper aria-describedby when error is present', () => {
    render(
      <Input
        label="Test Label"
        name="test-input"
        register={mockRegister}
        error="This is an error message"
      />
    );

    const input = screen.getByRole('textbox', { hidden: true });
    const errorElement = screen.getByText('This is an error message');
    
    expect(input).toHaveAttribute('aria-describedby', `${input.id}-error`);
    expect(errorElement).toHaveAttribute('id', `${input.id}-error`);
  });

  it('should not have aria-describedby when no error is present', () => {
    render(
      <Input
        label="Test Label"
        name="test-input"
        register={mockRegister}
      />
    );

    const input = screen.getByRole('textbox', { hidden: true });
    expect(input).not.toHaveAttribute('aria-describedby');
  });
});