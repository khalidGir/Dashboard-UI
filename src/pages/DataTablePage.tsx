import React, { useState, useMemo, memo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  FilterFn,
} from '@tanstack/react-table';
import useDashboardData from '../hooks/useDashboardData';
import Input from '../components/form/Input';
import Select from '../components/form/Select';
import useDebounce from '../hooks/useDebounce';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  createdAt: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

// Define a fuzzy filter function for global search
const fuzzyFilter: FilterFn<User> = (row, columnId, value) => {
  const rowValue = row.getValue(columnId);
  if (!rowValue || !value) return true;

  return String(rowValue).toLowerCase().includes(String(value).toLowerCase());
};

const DataTablePage: React.FC = () => {
  const { tableData, isTableLoading, tableError } = useDashboardData();
  const [globalFilter, setGlobalFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Debounced search value
  const debouncedGlobalFilter = useDebounce(globalFilter, 300);

  // Processed data with filters applied
  const filteredData = useMemo(() => {
    if (!tableData) return [];

    return tableData.filter(user => {
      // Global search filter
      const matchesGlobal = !debouncedGlobalFilter ||
        user.name.toLowerCase().includes(debouncedGlobalFilter.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedGlobalFilter.toLowerCase()) ||
        user.role.toLowerCase().includes(debouncedGlobalFilter.toLowerCase()) ||
        user.status.toLowerCase().includes(debouncedGlobalFilter.toLowerCase());

      // Role filter
      const matchesRole = !roleFilter || user.role === roleFilter;

      // Status filter
      const matchesStatus = !statusFilter || user.status === statusFilter;

      return matchesGlobal && matchesRole && matchesStatus;
    });
  }, [tableData, debouncedGlobalFilter, roleFilter, statusFilter]);

  // Extract unique roles and statuses for dropdown options
  const uniqueRoles = useMemo(() => {
    if (!tableData) return [];
    return Array.from(new Set(tableData.map(user => user.role)));
  }, [tableData]);

  const uniqueStatuses = useMemo(() => {
    if (!tableData) return [];
    return Array.from(new Set(tableData.map(user => user.status)));
  }, [tableData]);

  // Column definitions
  const columns = useMemo<ColumnDef<User>[], []>(() => [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => {
        const status = info.getValue();
        const statusClass =
          status === 'Active'
            ? 'bg-success text-white'
            : status === 'Inactive'
            ? 'bg-danger text-white'
            : 'bg-warning text-white';
        return <span className={`px-2 py-1 rounded-full text-xs ${statusClass}`}>{status}</span>;
      },
    },
  ], []);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter: debouncedGlobalFilter,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    globalFilterFn: fuzzyFilter,
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  if (isTableLoading) {
    return (
      <div className="p-6 bg-bg-secondary dark:bg-bg-secondary rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-text-primary dark:text-text-primary mb-4">Users</h2>
        <div className="mb-4 space-y-4">
          {/* Search and filter inputs skeleton */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="h-10 bg-bg-tertiary dark:bg-bg-tertiary rounded-md animate-pulse"></div>
            </div>
            <div className="w-32">
              <div className="h-10 bg-bg-tertiary dark:bg-bg-tertiary rounded-md animate-pulse"></div>
            </div>
            <div className="w-32">
              <div className="h-10 bg-bg-tertiary dark:bg-bg-tertiary rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-bg-tertiary dark:bg-bg-tertiary">
              <tr>
                <th className="p-3 text-left text-sm font-semibold text-text-secondary dark:text-text-secondary">ID</th>
                <th className="p-3 text-left text-sm font-semibold text-text-secondary dark:text-text-secondary">Name</th>
                <th className="p-3 text-left text-sm font-semibold text-text-secondary dark:text-text-secondary">Email</th>
                <th className="p-3 text-left text-sm font-semibold text-text-secondary dark:text-text-secondary hidden md:table-cell">Role</th>
                <th className="p-3 text-left text-sm font-semibold text-text-secondary dark:text-text-secondary hidden md:table-cell">Created At</th>
                <th className="p-3 text-left text-sm font-semibold text-text-secondary dark:text-text-secondary">Status</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b border-border-color">
                  <td className="p-3 text-sm text-text-primary dark:text-text-primary animate-pulse">
                    <div className="h-4 bg-bg-tertiary dark:bg-bg-tertiary rounded w-3/4"></div>
                  </td>
                  <td className="p-3 text-sm text-text-primary dark:text-text-primary animate-pulse">
                    <div className="h-4 bg-bg-tertiary dark:bg-bg-tertiary rounded w-3/4"></div>
                  </td>
                  <td className="p-3 text-sm text-text-primary dark:text-text-primary animate-pulse">
                    <div className="h-4 bg-bg-tertiary dark:bg-bg-tertiary rounded w-3/4"></div>
                  </td>
                  <td className="p-3 text-sm text-text-primary dark:text-text-primary animate-pulse hidden md:table-cell">
                    <div className="h-4 bg-bg-tertiary dark:bg-bg-tertiary rounded w-3/4"></div>
                  </td>
                  <td className="p-3 text-sm text-text-primary dark:text-text-primary animate-pulse hidden md:table-cell">
                    <div className="h-4 bg-bg-tertiary dark:bg-bg-tertiary rounded w-3/4"></div>
                  </td>
                  <td className="p-3 text-sm text-text-primary dark:text-text-primary animate-pulse">
                    <div className="h-4 bg-bg-tertiary dark:bg-bg-tertiary rounded w-3/4"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (tableError) {
    return (
      <div className="p-6 bg-bg-secondary dark:bg-bg-secondary rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-text-primary dark:text-text-primary mb-4">Users</h2>
        <div className="p-4 text-center text-danger">
          Error: {tableError}
        </div>
      </div>
    );
  }

  if (tableData.length === 0) {
    return (
      <div className="p-6 bg-bg-secondary dark:bg-bg-secondary rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-text-primary dark:text-text-primary mb-4">Users</h2>
        <div className="p-4 text-center text-text-secondary dark:text-text-secondary">
          No user data available
        </div>
      </div>
    );
  }

  // Convert role options to select format
  const roleOptions = uniqueRoles.map(role => ({
    value: role,
    label: role
  }));

  // Convert status options to select format
  const statusOptions = uniqueStatuses.map(status => ({
    value: status,
    label: status
  }));

  return (
    <div className="p-6 bg-bg-secondary dark:bg-bg-secondary rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-text-primary dark:text-text-primary mb-4">Users</h2>

      {/* Search and Filter Controls */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Search"
          name="search"
          type="text"
          register={{ onChange: (e) => setGlobalFilter(String(e.target.value)), value: globalFilter }}
          error={null}
          placeholder="Search users..."
        />

        <Select
          label="Filter by Role"
          name="roleFilter"
          options={[{ value: '', label: 'All Roles' }, ...roleOptions]}
          register={{ onChange: (e) => setRoleFilter(e.target.value), value: roleFilter }}
          error={null}
        />

        <Select
          label="Filter by Status"
          name="statusFilter"
          options={[{ value: '', label: 'All Statuses' }, ...statusOptions]}
          register={{ onChange: (e) => setStatusFilter(e.target.value), value: statusFilter }}
          error={null}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full">
          <thead className="bg-bg-tertiary dark:bg-bg-tertiary">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`p-3 text-left text-sm font-semibold text-text-secondary dark:text-text-secondary ${
                      (header.id === 'role' || header.id === 'createdAt')
                        ? 'hidden md:table-cell'
                        : ''
                    }`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-border-color hover:bg-bg-tertiary dark:hover:bg-bg-tertiary">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`p-3 text-sm text-text-primary dark:text-text-primary ${
                      (cell.column.id === 'role' || cell.column.id === 'createdAt')
                        ? 'hidden md:table-cell'
                        : ''
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-text-secondary dark:text-text-secondary">
          Showing {table.getPaginationRowModel().rows.length} of {tableData.length} users
        </div>

        <div className="flex items-center gap-2">
          <button
            className={`px-3 py-1 rounded-md text-text-primary dark:text-text-primary ${
              table.getCanPreviousPage()
                ? 'hover:bg-bg-tertiary dark:hover:bg-bg-tertiary cursor-pointer'
                : 'opacity-50 cursor-not-allowed'
            }`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>

          <div className="flex items-center gap-1">
            {table.getPageCount() > 1 && Array.from({ length: table.getPageCount() }, (_, i) => i).map(page => (
              <button
                key={page}
                onClick={() => table.setPageIndex(page)}
                className={`w-8 h-8 rounded-full ${
                  table.getState().pagination.pageIndex === page
                    ? 'bg-primary text-white'
                    : 'text-text-primary dark:text-text-primary hover:bg-bg-tertiary dark:hover:bg-bg-tertiary'
                }`}
              >
                {page + 1}
              </button>
            ))}
          </div>

          <button
            className={`px-3 py-1 rounded-md text-text-primary dark:text-text-primary ${
              table.getCanNextPage()
                ? 'hover:bg-bg-tertiary dark:hover:bg-bg-tertiary cursor-pointer'
                : 'opacity-50 cursor-not-allowed'
            }`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary dark:text-text-secondary">Rows per page:</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="bg-bg-secondary dark:bg-bg-secondary text-text-primary dark:text-text-primary border border-border-color rounded px-2 py-1"
          >
            {[10, 25, 50, 100].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default memo(DataTablePage);
