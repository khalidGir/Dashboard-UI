import { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell 
} from 'recharts';
import './App.css';

// Sample data for our dashboard
const salesData = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
  { name: 'Jul', sales: 3490, revenue: 4300 },
];

const userData = [
  { name: 'Desktop', value: 65 },
  { name: 'Mobile', value: 25 },
  { name: 'Tablet', value: 10 },
];

const performanceData = [
  { name: 'Page A', uv: 4000, pv: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398 },
  { name: 'Page C', uv: 2000, pv: 9800 },
  { name: 'Page D', uv: 2780, pv: 3908 },
  { name: 'Page E', uv: 1890, pv: 4800 },
  { name: 'Page F', uv: 2390, pv: 3800 },
  { name: 'Page G', uv: 3490, pv: 4300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Analytics Dashboard</h1>
        <p>Welcome back! Here's your overview</p>
      </header>

      {/* Stats Cards */}
      <section className="stats-grid">
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">$24,580</p>
          <span className="stat-change positive">↑ 12.5%</span>
        </div>
        <div className="stat-card">
          <h3>New Customers</h3>
          <p className="stat-value">1,243</p>
          <span className="stat-change positive">↑ 8.2%</span>
        </div>
        <div className="stat-card">
          <h3>Pending Orders</h3>
          <p className="stat-value">86</p>
          <span className="stat-change negative">↓ 3.1%</span>
        </div>
        <div className="stat-card">
          <h3>Bounce Rate</h3>
          <p className="stat-value">32.4%</p>
          <span className="stat-change negative">↑ 1.7%</span>
        </div>
      </section>

      {/* Charts Section */}
      <section className="charts-grid">
        <div className="chart-container">
          <h2>Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" name="Sales" />
              <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h2>User Devices</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {userData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container full-width">
          <h2>Performance Metrics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} name="Page Views" />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" name="Unique Visitors" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">📊</div>
            <div className="activity-content">
              <h4>New report generated</h4>
              <p>Sales report for June is ready</p>
            </div>
            <div className="activity-time">2 min ago</div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">👤</div>
            <div className="activity-content">
              <h4>New user registered</h4>
              <p>John Doe joined the platform</p>
            </div>
            <div className="activity-time">1 hour ago</div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">🛒</div>
            <div className="activity-content">
              <h4>New order received</h4>
              <p>Order #12345 for $245.00</p>
            </div>
            <div className="activity-time">3 hours ago</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;