export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  createdAt: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

export const tableData: User[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', createdAt: '2023-01-15', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor', createdAt: '2023-02-20', status: 'Active' },
  { id: 3, name: 'Sam Wilson', email: 'sam.wilson@example.com', role: 'Viewer', createdAt: '2023-03-10', status: 'Inactive' },
  { id: 4, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Editor', createdAt: '2023-04-05', status: 'Active' },
  { id: 5, name: 'Chris Lee', email: 'chris.lee@example.com', role: 'Viewer', createdAt: '2023-05-21', status: 'Pending' },
  { id: 6, name: 'Patricia Brown', email: 'patricia.brown@example.com', role: 'Admin', createdAt: '2023-06-12', status: 'Active' },
  { id: 7, name: 'Michael Clark', email: 'michael.clark@example.com', role: 'Editor', createdAt: '2023-07-30', status: 'Inactive' },
  { id: 8, name: 'Linda Davis', email: 'linda.davis@example.com', role: 'Viewer', createdAt: '2023-08-18', status: 'Active' },
  { id: 9, name: 'James Rodriguez', email: 'james.rodriguez@example.com', role: 'Editor', createdAt: '2023-09-25', status: 'Pending' },
  { id: 10, name: 'Barbara Martinez', email: 'barbara.martinez@example.com', role: 'Viewer', createdAt: '2023-10-02', status: 'Active' },
];
