import { describe, it, expect } from 'vitest';
import { render, screen } from '../test-utils';
import StatCard from './StatCard';
import { FiDollarSign } from 'react-icons/fi';

describe('StatCard Component', () => {
  const defaultProps = {
    title: 'Total Revenue',
    value: '$24,580',
    change: '↑ 12.5%',
    isPositive: true,
    icon: <FiDollarSign className="text-2xl text-primary" />,
  };

  it('should render title correctly', () => {
    render(<StatCard {...defaultProps} />);
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
  });

  it('should render value correctly', () => {
    render(<StatCard {...defaultProps} />);
    expect(screen.getByText('$24,580')).toBeInTheDocument();
  });

  it('should render change text correctly', () => {
    render(<StatCard {...defaultProps} />);
    expect(screen.getByText('↑ 12.5%')).toBeInTheDocument();
  });

  it('should render icon correctly', () => {
    render(<StatCard {...defaultProps} />);
    const icon = screen.getByTestId('icon'); // We need to add a test id to the icon
    expect(icon).toBeInTheDocument();
  });

  it('should have positive change class when isPositive is true', () => {
    render(<StatCard {...defaultProps} isPositive={true} />);
    const changeElement = screen.getByText('↑ 12.5%');
    expect(changeElement).toHaveClass('text-success');
  });

  it('should have negative change class when isPositive is false', () => {
    render(
      <StatCard
        {...defaultProps}
        change="↓ 3.1%"
        isPositive={false}
      />
    );
    const changeElement = screen.getByText('↓ 3.1%');
    expect(changeElement).toHaveClass('text-danger');
  });

  it('should render different icon when provided', () => {
    render(
      <StatCard
        {...defaultProps}
        icon={<span data-testid="test-icon">TEST</span>}
      />
    );
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('should render with different values', () => {
    const customProps = {
      ...defaultProps,
      title: 'New Users',
      value: '1,243',
      change: '↑ 8.2%',
    };

    render(<StatCard {...customProps} />);
    expect(screen.getByText('New Users')).toBeInTheDocument();
    expect(screen.getByText('1,243')).toBeInTheDocument();
    expect(screen.getByText('↑ 8.2%')).toBeInTheDocument();
  });
});