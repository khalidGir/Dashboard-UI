import { useState, useEffect, useRef } from 'react';

// Define the data types
interface ActivityItem {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
  time: string;
}

interface SalesItem {
  name: string;
  sales: number;
  revenue: number;
}

interface UserItem {
  name: string;
  value: number;
}

interface PerformanceItem {
  name: string;
  uv: number;
  pv: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  createdAt: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

interface StatItem {
  id: number;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
}

interface DashboardData {
  // Activity data
  activityData: ActivityItem[];
  isActivityLoading: boolean;
  activityError: string | null;

  // Sales data
  salesData: SalesItem[];
  isSalesLoading: boolean;
  salesError: string | null;

  // User data (for devices chart)
  userData: UserItem[];
  isUserDataLoading: boolean;
  userDataError: string | null;

  // Performance data
  performanceData: PerformanceItem[];
  isPerformanceLoading: boolean;
  performanceError: string | null;

  // Table data
  tableData: User[];
  isTableLoading: boolean;
  tableError: string | null;

  // Stats data
  statsData: StatItem[];
  isStatsLoading: boolean;
  statsError: string | null;

  // Refetch function
  refetch: () => void;
}

// Cache for storing fetched data with expiration
interface CacheEntry {
  data: any;
  timestamp: number;
  expiryTime: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const cache: Map<string, CacheEntry> = new Map();

// Function to check if cache is expired
const isCacheExpired = (cacheEntry: CacheEntry): boolean => {
  return Date.now() - cacheEntry.timestamp > cacheEntry.expiryTime;
};

// Simulated data fetching functions
const fetchActivityData = async (signal?: AbortSignal): Promise<ActivityItem[]> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (signal?.aborted) {
        reject(new Error('Activity data fetch aborted'));
        return;
      }

      // Simulate occasional error
      if (Math.random() < 0.1) {
        reject(new Error('Failed to fetch activity data'));
        return;
      }

      // Generate dynamic activity data
      const activities: ActivityItem[] = [
        {
          id: 1,
          icon: '📊',
          title: 'New report generated',
          subtitle: 'Monthly performance report is ready',
          time: `${Math.floor(Math.random() * 10) + 1} min ago`,
        },
        {
          id: 2,
          icon: '👤',
          title: 'New user registered',
          subtitle: 'Alex Johnson joined the platform',
          time: `${Math.floor(Math.random() * 5) + 1} hour ago`,
        },
        {
          id: 3,
          icon: '🛒',
          title: 'New order received',
          subtitle: `Order #${Math.floor(Math.random() * 10000) + 10000} for $${Math.floor(Math.random() * 500) + 100}.00`,
          time: `${Math.floor(Math.random() * 12) + 1} hours ago`,
        },
        {
          id: 4,
          icon: '📈',
          title: 'Sales target achieved',
          subtitle: 'Reached 95% of monthly sales goal',
          time: `${Math.floor(Math.random() * 24) + 1} hours ago`,
        },
        {
          id: 5,
          icon: '🔧',
          title: 'System updated',
          subtitle: 'Dashboard version 2.1.0 installed',
          time: `${Math.floor(Math.random() * 7) + 1} days ago`,
        },
      ];

      resolve(activities);
    }, 500 + Math.random() * 500); // Shorter delay for better performance (500-1000ms)

    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new Error('Activity data fetch aborted'));
    });
  });
};

const fetchSalesData = async (signal?: AbortSignal): Promise<SalesItem[]> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (signal?.aborted) {
        reject(new Error('Sales data fetch aborted'));
        return;
      }

      if (Math.random() < 0.1) {
        reject(new Error('Failed to fetch sales data'));
        return;
      }

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const salesData: SalesItem[] = months.slice(0, 7).map((month, index) => ({
        name: month,
        sales: Math.floor(Math.random() * 5000) + 1000,
        revenue: Math.floor(Math.random() * 10000) + 2000,
      }));

      resolve(salesData);
    }, 500 + Math.random() * 500); // Shorter delay (500-1000ms)

    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new Error('Sales data fetch aborted'));
    });
  });
};

const fetchUserData = async (signal?: AbortSignal): Promise<UserItem[]> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (signal?.aborted) {
        reject(new Error('User data fetch aborted'));
        return;
      }

      if (Math.random() < 0.1) {
        reject(new Error('Failed to fetch user data'));
        return;
      }

      const userData: UserItem[] = [
        { name: 'Desktop', value: Math.floor(Math.random() * 40) + 50 }, // 50-90%
        { name: 'Mobile', value: Math.floor(Math.random() * 30) + 20 }, // 20-50%
        { name: 'Tablet', value: Math.floor(Math.random() * 15) + 5 }, // 5-20%
      ];

      resolve(userData);
    }, 500 + Math.random() * 500); // Shorter delay (500-1000ms)

    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new Error('User data fetch aborted'));
    });
  });
};

const fetchPerformanceData = async (signal?: AbortSignal): Promise<PerformanceItem[]> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (signal?.aborted) {
        reject(new Error('Performance data fetch aborted'));
        return;
      }

      if (Math.random() < 0.1) {
        reject(new Error('Failed to fetch performance data'));
        return;
      }

      const performanceData: PerformanceItem[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((letter, index) => ({
        name: `Page ${letter}`,
        uv: Math.floor(Math.random() * 5000) + 1000,
        pv: Math.floor(Math.random() * 5000) + 1000,
      }));

      resolve(performanceData);
    }, 500 + Math.random() * 500); // Shorter delay (500-1000ms)

    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new Error('Performance data fetch aborted'));
    });
  });
};

const fetchTableData = async (signal?: AbortSignal): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (signal?.aborted) {
        reject(new Error('Table data fetch aborted'));
        return;
      }

      if (Math.random() < 0.1) {
        reject(new Error('Failed to fetch table data'));
        return;
      }

      const roles: ('Admin' | 'Editor' | 'Viewer')[] = ['Admin', 'Editor', 'Viewer'];
      const statuses: ('Active' | 'Inactive' | 'Pending')[] = ['Active', 'Inactive', 'Pending'];

      const tableData: User[] = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: roles[Math.floor(Math.random() * roles.length)],
        createdAt: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
      }));

      resolve(tableData);
    }, 500 + Math.random() * 500); // Shorter delay (500-1000ms)

    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new Error('Table data fetch aborted'));
    });
  });
};

const fetchStatsData = async (signal?: AbortSignal): Promise<StatItem[]> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (signal?.aborted) {
        reject(new Error('Stats data fetch aborted'));
        return;
      }

      if (Math.random() < 0.1) {
        reject(new Error('Failed to fetch stats data'));
        return;
      }

      const stats: StatItem[] = [
        {
          id: 1,
          title: 'Total Revenue',
          value: `$${Math.floor(Math.random() * 10000) + 20000},000`,
          change: `${Math.random() > 0.5 ? '↑' : '↓'} ${(Math.random() * 20).toFixed(1)}%`,
          isPositive: Math.random() > 0.5,
          icon: 'dollar'
        },
        {
          id: 2,
          title: 'New Customers',
          value: `${Math.floor(Math.random() * 1000) + 1000}`,
          change: `${Math.random() > 0.5 ? '↑' : '↓'} ${(Math.random() * 15).toFixed(1)}%`,
          isPositive: Math.random() > 0.5,
          icon: 'users'
        },
        {
          id: 3,
          title: 'Pending Orders',
          value: `${Math.floor(Math.random() * 100) + 50}`,
          change: `${Math.random() > 0.5 ? '↑' : '↓'} ${(Math.random() * 10).toFixed(1)}%`,
          isPositive: Math.random() < 0.5, // Negative for pending orders
          icon: 'shopping-cart'
        },
        {
          id: 4,
          title: 'Bounce Rate',
          value: `${(Math.random() * 20 + 10).toFixed(1)}%`,
          change: `${Math.random() > 0.5 ? '↑' : '↓'} ${(Math.random() * 10).toFixed(1)}%`,
          isPositive: Math.random() < 0.5, // Negative for bounce rate
          icon: 'bar-chart'
        }
      ];

      resolve(stats);
    }, 500 + Math.random() * 500); // Shorter delay (500-1000ms)

    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new Error('Stats data fetch aborted'));
    });
  });
};

export const useDashboardData = (): DashboardData => {
  // Activity data state
  const [activityData, setActivityData] = useState<ActivityItem[]>([]);
  const [isActivityLoading, setIsActivityLoading] = useState<boolean>(true);
  const [activityError, setActivityError] = useState<string | null>(null);

  // Sales data state
  const [salesData, setSalesData] = useState<SalesItem[]>([]);
  const [isSalesLoading, setIsSalesLoading] = useState<boolean>(true);
  const [salesError, setSalesError] = useState<string | null>(null);

  // User data state
  const [userData, setUserData] = useState<UserItem[]>([]);
  const [isUserDataLoading, setIsUserDataLoading] = useState<boolean>(true);
  const [userDataError, setUserDataError] = useState<string | null>(null);

  // Performance data state
  const [performanceData, setPerformanceData] = useState<PerformanceItem[]>([]);
  const [isPerformanceLoading, setIsPerformanceLoading] = useState<boolean>(true);
  const [performanceError, setPerformanceError] = useState<string | null>(null);

  // Table data state
  const [tableData, setTableData] = useState<User[]>([]);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(true);
  const [tableError, setTableError] = useState<string | null>(null);

  // Stats data state
  const [statsData, setStatsData] = useState<StatItem[]>([]);
  const [isStatsLoading, setIsStatsLoading] = useState<boolean>(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Fetch data with caching and cleanup
  const fetchData = async () => {
    // Cancel any ongoing requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Check cache for each data type
    const cacheKeyPrefix = 'dashboard_';
    const cachePromises = [];

    // Reset errors
    setActivityError(null);
    setSalesError(null);
    setUserDataError(null);
    setPerformanceError(null);
    setTableError(null);
    setStatsError(null);

    // Check cache and set initial loading states
    setIsActivityLoading(true);
    setIsSalesLoading(true);
    setIsUserDataLoading(true);
    setIsPerformanceLoading(true);
    setIsTableLoading(true);
    setIsStatsLoading(true);

    try {
      // Activity data
      const activityCacheKey = `${cacheKeyPrefix}activity`;
      const activityCache = cache.get(activityCacheKey);
      if (activityCache && !isCacheExpired(activityCache)) {
        setActivityData(activityCache.data);
        setIsActivityLoading(false);
      } else {
        fetchActivityData(controller.signal).then(data => {
          if (!controller.signal.aborted) {
            setActivityData(data);
            setIsActivityLoading(false);
            cache.set(activityCacheKey, {
              data,
              timestamp: Date.now(),
              expiryTime: CACHE_DURATION
            });
          }
        }).catch(error => {
          if (!controller.signal.aborted && error.message !== 'Activity data fetch aborted') {
            setActivityError(error.message);
            setIsActivityLoading(false);
          }
        });
      }

      // Sales data
      const salesCacheKey = `${cacheKeyPrefix}sales`;
      const salesCache = cache.get(salesCacheKey);
      if (salesCache && !isCacheExpired(salesCache)) {
        setSalesData(salesCache.data);
        setIsSalesLoading(false);
      } else {
        fetchSalesData(controller.signal).then(data => {
          if (!controller.signal.aborted) {
            setSalesData(data);
            setIsSalesLoading(false);
            cache.set(salesCacheKey, {
              data,
              timestamp: Date.now(),
              expiryTime: CACHE_DURATION
            });
          }
        }).catch(error => {
          if (!controller.signal.aborted && error.message !== 'Sales data fetch aborted') {
            setSalesError(error.message);
            setIsSalesLoading(false);
          }
        });
      }

      // User data
      const userCacheKey = `${cacheKeyPrefix}user`;
      const userCache = cache.get(userCacheKey);
      if (userCache && !isCacheExpired(userCache)) {
        setUserData(userCache.data);
        setIsUserDataLoading(false);
      } else {
        fetchUserData(controller.signal).then(data => {
          if (!controller.signal.aborted) {
            setUserData(data);
            setIsUserDataLoading(false);
            cache.set(userCacheKey, {
              data,
              timestamp: Date.now(),
              expiryTime: CACHE_DURATION
            });
          }
        }).catch(error => {
          if (!controller.signal.aborted && error.message !== 'User data fetch aborted') {
            setUserDataError(error.message);
            setIsUserDataLoading(false);
          }
        });
      }

      // Performance data
      const performanceCacheKey = `${cacheKeyPrefix}performance`;
      const performanceCache = cache.get(performanceCacheKey);
      if (performanceCache && !isCacheExpired(performanceCache)) {
        setPerformanceData(performanceCache.data);
        setIsPerformanceLoading(false);
      } else {
        fetchPerformanceData(controller.signal).then(data => {
          if (!controller.signal.aborted) {
            setPerformanceData(data);
            setIsPerformanceLoading(false);
            cache.set(performanceCacheKey, {
              data,
              timestamp: Date.now(),
              expiryTime: CACHE_DURATION
            });
          }
        }).catch(error => {
          if (!controller.signal.aborted && error.message !== 'Performance data fetch aborted') {
            setPerformanceError(error.message);
            setIsPerformanceLoading(false);
          }
        });
      }

      // Table data
      const tableCacheKey = `${cacheKeyPrefix}table`;
      const tableCache = cache.get(tableCacheKey);
      if (tableCache && !isCacheExpired(tableCache)) {
        setTableData(tableCache.data);
        setIsTableLoading(false);
      } else {
        fetchTableData(controller.signal).then(data => {
          if (!controller.signal.aborted) {
            setTableData(data);
            setIsTableLoading(false);
            cache.set(tableCacheKey, {
              data,
              timestamp: Date.now(),
              expiryTime: CACHE_DURATION
            });
          }
        }).catch(error => {
          if (!controller.signal.aborted && error.message !== 'Table data fetch aborted') {
            setTableError(error.message);
            setIsTableLoading(false);
          }
        });
      }

      // Stats data
      const statsCacheKey = `${cacheKeyPrefix}stats`;
      const statsCache = cache.get(statsCacheKey);
      if (statsCache && !isCacheExpired(statsCache)) {
        setStatsData(statsCache.data);
        setIsStatsLoading(false);
      } else {
        fetchStatsData(controller.signal).then(data => {
          if (!controller.signal.aborted) {
            setStatsData(data);
            setIsStatsLoading(false);
            cache.set(statsCacheKey, {
              data,
              timestamp: Date.now(),
              expiryTime: CACHE_DURATION
            });
          }
        }).catch(error => {
          if (!controller.signal.aborted && error.message !== 'Stats data fetch aborted') {
            setStatsError(error.message);
            setIsStatsLoading(false);
          }
        });
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        console.error('Unexpected error in fetchData:', error);
        // Set all loading states to false in case of error
        setIsActivityLoading(false);
        setIsSalesLoading(false);
        setIsUserDataLoading(false);
        setIsPerformanceLoading(false);
        setIsTableLoading(false);
        setIsStatsLoading(false);
      }
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();

    // Cleanup function to abort requests when component unmounts
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    // Activity data
    activityData,
    isActivityLoading,
    activityError,

    // Sales data
    salesData,
    isSalesLoading,
    salesError,

    // User data
    userData,
    isUserDataLoading,
    userDataError,

    // Performance data
    performanceData,
    isPerformanceLoading,
    performanceError,

    // Table data
    tableData,
    isTableLoading,
    tableError,

    // Stats data
    statsData,
    isStatsLoading,
    statsError,

    // Refetch function
    refetch: fetchData,
  };
};

export default useDashboardData;