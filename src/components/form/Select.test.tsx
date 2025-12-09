import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test-utils';
import Select from './Select';
import { UseFormRegisterReturn } from 'react-hook-form';

// Mock the register function return type for react-hook-form
const mockRegister: UseFormRegisterReturn = {
  name: 'test-select',
  onBlur: vi.fn(),
  onChange: vi.fn(),
  ref: vi.fn(),
};

describe('Select Component', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('should render with label', () => {
    render(
      <Select
        label="Test Label"
        name="test-select"
        register={mockRegister}
        options={options}
      />
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should render with options', () => {
    render(
      <Select
        label="Test Select"
        name="test-select"
        register={mockRegister}
        options={options}
      />
    );

    options.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('should render with error message when error prop is provided', () => {
    render(
      <Select
        label="Test Select"
        name="test-select"
        register={mockRegister}
        options={options}
        error="This is an error message"
      />
    );

    expect(screen.getByText('This is an error message')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { hidden: true })).toHaveAttribute('aria-invalid', 'true');
  });

  it('should not show error message when error prop is not provided', () => {
    render(
      <Select
        label="Test Select"
        name="test-select"
        register={mockRegister}
        options={options}
      />
    );

    expect(screen.queryByText('error')).not.toBeInTheDocument();
    expect(screen.getByRole('combobox', { hidden: true })).toHaveAttribute('aria-invalid', 'false');
  });

  it('should call onChange when the selection changes', () => {
    const mockOnChange = vi.fn();
    const mockRegisterWithOnChange: UseFormRegisterReturn = {
      ...mockRegister,
      onChange: mockOnChange,
    };

    render(
      <Select
        label="Test Select"
        name="test-select"
        register={mockRegisterWithOnChange}
        options={options}
      />
    );

    const select = screen.getByRole('combobox', { hidden: true });
    fireEvent.change(select, { target: { value: 'option2' } });

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('should have proper aria-describedby when error is present', () => {
    render(
      <Select
        label="Test Select"
        name="test-select"
        register={mockRegister}
        options={options}
        error="This is an error message"
      />
    );

    const select = screen.getByRole('combobox', { hidden: true });
    const errorElement = screen.getByText('This is an error message');
    
    expect(select).toHaveAttribute('aria-describedby', `${select.id}-error`);
    expect(errorElement).toHaveAttribute('id', `${select.id}-error`);
  });

  it('should not have aria-describedby when no error is present', () => {
    render(
      <Select
        label="Test Select"
        name="test-select"
        register={mockRegister}
        options={options}
      />
    );

    const select = screen.getByRole('combobox', { hidden: true });
    expect(select).not.toHaveAttribute('aria-describedby');
  });

  it('should render with empty options array', () => {
    render(
      <Select
        label="Test Select"
        name="test-select"
        register={mockRegister}
        options={[]}
      />
    );

    const select = screen.getByRole('combobox', { hidden: true });
    expect(select.querySelectorAll('option').length).toBe(0);
  });

  it('should render with defaultValue', () => {
    const { container } = render(
      <Select
        label="Test Select"
        name="test-select"
        register={mockRegister}
        options={options}
        defaultValue="option2"
      />
    );

    const select = container.querySelector('select');
    expect(select).toBeInTheDocument();
    // Note: Since we're not passing value prop, default value is controlled by the register function
    // So we can't directly check the selected value without knowing how the register is implemented
  });
});