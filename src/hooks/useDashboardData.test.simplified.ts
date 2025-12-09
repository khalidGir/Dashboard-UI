import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useDashboardData from './useDashboardData';

// Mock the data fetching functions to prevent actual async operations
vi.mock('./useDashboardData', async (importOriginal) => {
  const actual: any = await importOriginal();

  return {
    ...actual,
    // Override the fetch functions to return synchronous data
    fetchActivityData: vi.fn(() => Promise.resolve([
      { id: 1, icon: '📊', title: 'New Report', subtitle: 'Generated', time: '2 min ago' }
    ])),
    fetchSalesData: vi.fn(() => Promise.resolve([
      { name: 'Jan', sales: 1000, revenue: 2000 }
    ])),
    fetchUserData: vi.fn(() => Promise.resolve([
      { name: 'Desktop', value: 60 }
    ])),
    fetchPerformanceData: vi.fn(() => Promise.resolve([
      { name: 'Page A', uv: 4000, pv: 2400 }
    ])),
    fetchTableData: vi.fn(() => Promise.resolve([
      { id: 1, name: 'User 1', email: 'user1@example.com', role: 'Admin', createdAt: '2023-01-01', status: 'Active' }
    ])),
    fetchStatsData: vi.fn(() => Promise.resolve([
      { id: 1, title: 'Revenue', value: '$24,580', change: '↑ 12.5%', isPositive: true, icon: 'dollar' }
    ])),
  };
});

describe('useDashboardData Simplified (Critical Only)', () => {
  it('should initialize with loading states true', () => {
    const { result } = renderHook(() => useDashboardData());

    // Check initial loading states
    expect(result.current.isActivityLoading).toBe(true);
    expect(result.current.isSalesLoading).toBe(true);
    expect(result.current.isUserDataLoading).toBe(true);
    expect(result.current.isPerformanceLoading).toBe(true);
    expect(result.current.isTableLoading).toBe(true);
    expect(result.current.isStatsLoading).toBe(true);
  });

  it('should have refetch function', () => {
    const { result } = renderHook(() => useDashboardData());

    expect(result.current.refetch).toBeTypeOf('function');
  });
});