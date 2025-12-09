import ChartContainer from './ChartContainer';
import SalesChart from './SalesChart';
import DevicesChart from './DevicesChart';
import PerformanceChart from './PerformanceChart';
import AreaChartComponent from './AreaChartComponent';

const ChartsGrid = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      <div className="animate-fadeIn" style={{ animationDelay: '0.4s' }}>
        <ChartContainer title="Sales Overview">
          <SalesChart />
        </ChartContainer>
      </div>
      <div className="animate-fadeIn" style={{ animationDelay: '0.5s' }}>
        <ChartContainer title="User Devices">
          <DevicesChart />
        </ChartContainer>
      </div>
      <div className="animate-fadeIn" style={{ animationDelay: '0.6s' }}>
        <ChartContainer title="Performance Metrics">
          <PerformanceChart />
        </ChartContainer>
      </div>
      <div className="animate-fadeIn" style={{ animationDelay: '0.7s' }}>
        <ChartContainer title="Website Traffic">
          <AreaChartComponent />
        </ChartContainer>
      </div>
    </section>
  );
};

export default ChartsGrid;
