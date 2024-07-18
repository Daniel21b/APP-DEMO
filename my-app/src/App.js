import React, { useState } from 'react';
import 'carbon-components/css/carbon-components.min.css';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { Database, Warehouse, Truck, ShoppingCart, Users, Cloud, QrCode, CheckCircle, Recycle, AlertTriangle, XCircle, TrendingUp, TrendingDown, DollarSign, Package, RefreshCcw } from 'lucide-react';
import { Tooltip as CarbonTooltip } from 'carbon-components-react';

// Data definitions
const inventoryData = [
  { product: 'Organic Apples', current: 80, optimal: 50 },
  { product: 'Fresh Kale', current: 30, optimal: 60 },
  { product: 'Grass-Fed Beef', current: 45, optimal: 40 },
  { product: 'Free-Range Eggs', current: 90, optimal: 70 },
];

const demandForecast = [
  { day: 'Mon', demand: 100, weather: 'Sunny' },
  { day: 'Tue', demand: 120, weather: 'Cloudy' },
  { day: 'Wed', demand: 110, weather: 'Rainy' },
  { day: 'Thu', demand: 140, weather: 'Sunny' },
  { day: 'Fri', demand: 160, weather: 'Sunny' },
  { day: 'Sat', demand: 180, weather: 'Partly Cloudy' },
  { day: 'Sun', demand: 130, weather: 'Rainy' },
];

const storeData = [
  { name: 'Chicago Store', waste: 20, stockouts: 15, excess: 25, donations: 10 },
  { name: 'New York Store', waste: 18, stockouts: 12, excess: 22, donations: 15 },
  { name: 'Los Angeles Store', waste: 22, stockouts: 18, excess: 20, donations: 12 },
];

const weekSummary = {
  totalSales: 1250000,
  wastageReduction: 15,
  stockoutReduction: 20,
  comparisonToLastWeek: 5,
};

const monthSummary = {
  totalSales: 5000000,
  wastageReduction: 12,
  stockoutReduction: 18,
  comparisonToLastMonth: 10,
};

const yearSummary = {
  totalSales: 60000000,
  wastageReduction: 10,
  stockoutReduction: 15,
  comparisonToLastYear: 8,
};

const workflows = [
  { id: 1, text: 'AI detected potential stockout for Fresh Kale. Automated reorder initiated.' },
  { id: 2, text: 'Excess inventory alert for Organic Apples. Markdown process started to reduce waste.' },
  { id: 3, text: 'Supply delay detected for Grass-Fed Beef. Alternate supplier engaged.' },
  { id: 4, text: 'Weather alert: Potential disruption to transportation. Rerouting shipments.' },
];

const workQueues = [
  { id: 1, text: 'Resolve potential stockout for Fresh Kale', action: 'Resolve' },
  { id: 2, text: 'Review markdown strategy for Organic Apples', action: 'Review' },
  { id: 3, text: 'Assess alternative suppliers for Grass-Fed Beef', action: 'Assess' },
];

const integrations = [
  { 
    name: 'ERP System', 
    icon: Database, 
    description: 'Enterprise Resource Planning system data integration',
    status: 'normal',
    aiInsight: 'All ERP data is synchronizing correctly. No action required.',
    kpi: { label: 'Data Sync Rate', value: '99.9%', trend: 'up' }
  },
  { 
    name: 'Warehouse Management', 
    icon: Warehouse, 
    description: 'Warehouse operations and logistics management',
    status: 'warning',
    aiInsight: 'Inventory turnover rate has decreased by 5% in the last week. Recommend optimizing storage layout for faster picking.',
    kpi: { label: 'Inventory Turnover', value: '4.2', trend: 'down' },
    aiRecommendation: 'Implement new slotting strategy to improve picking efficiency by an estimated 12%. This could increase turnover rate to 4.5.'
  },
  { 
    name: 'Transportation Management', 
    icon: Truck, 
    description: 'Logistics and transportation optimization',
    status: 'issue',
    aiInsight: 'Detected potential stockouts due to delayed shipments. High impact on customer satisfaction expected.',
    kpi: { label: 'On-Time Delivery', value: '92%', trend: 'down' },
    aiRecommendation: 'Activate contingency carriers and expedite shipping for high-priority items. Estimated to improve on-time delivery to 97% within 48 hours.'
  },
  { 
    name: 'Point of Sale', 
    icon: ShoppingCart, 
    description: 'Sales and inventory tracking at the point of sale',
    status: 'normal',
    aiInsight: 'Sales data is current and accurate. Demand forecasting models updated.',
    kpi: { label: 'Forecast Accuracy', value: '94%', trend: 'up' }
  },
  { 
    name: 'Supplier Portals', 
    icon: Users, 
    description: 'Supplier communication and inventory management',
    status: 'warning',
    aiInsight: 'Three key suppliers showing delayed response times. Risk of supply chain disruption.',
    kpi: { label: 'Supplier Performance', value: '87%', trend: 'down' },
    aiRecommendation: 'Initiate automated communication protocols with affected suppliers. If no response within 4 hours, trigger alternative supplier options to maintain inventory levels.'
  },
  { 
    name: 'Weather Data Services', 
    icon: Cloud, 
    description: 'Weather data integration for demand forecasting',
    status: 'normal',
    aiInsight: 'Weather patterns normal. Demand forecasts adjusted for seasonal trends.',
    kpi: { label: 'Forecast Adjustment', value: '+2%', trend: 'up' }
  },
];

const IntegrationCard = ({ name, icon: Icon, description, status, aiInsight, kpi, aiRecommendation }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [actionTaken, setActionTaken] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'issue': return '#EF4444';
      default: return '#10B981';
    }
  };

  const handleAction = (action) => {
    setActionTaken(action);
    console.log(`Action ${action} taken for ${name}`);
  };

  const cardStyle = {
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    borderLeft: `4px solid ${getStatusColor(status)}`,
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  };

  const iconStyle = {
    width: '32px',
    height: '32px',
    color: '#0043ce',
    marginRight: '16px',
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#161616',
    margin: '0',
  };

  const descriptionStyle = {
    fontSize: '14px',
    color: '#6f6f6f',
    margin: '0',
  };

  const statusStyle = {
    padding: '4px 8px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: `${getStatusColor(status)}20`,
    color: getStatusColor(status),
  };

  const kpiStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: '600',
    color: '#161616',
  };

  const kpiValueStyle = {
    color: '#0043ce',
    marginLeft: '4px',
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <Icon style={iconStyle} />
        <div>
          <h3 style={titleStyle}>{name}</h3>
          <p style={descriptionStyle}>{description}</p>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={statusStyle}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        <div style={kpiStyle}>
          <span>{kpi.label}:</span>
          <span style={kpiValueStyle}>{kpi.value}</span>
          {kpi.trend === 'up' ? <TrendingUp style={{ width: '16px', height: '16px', color: '#10B981', marginLeft: '4px' }} /> : <TrendingDown style={{ width: '16px', height: '16px', color: '#EF4444', marginLeft: '4px' }} />}
        </div>
      </div>

      <p style={{ fontSize: '14px', marginBottom: '16px', color: '#393939' }}>{aiInsight}</p>

      {aiRecommendation && (
        <button
          style={{ color: '#0043ce', textDecoration: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '600', backgroundColor: '#e3f8ff', padding: '8px 12px', borderRadius: '4px', border: 'none' }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Hide AI Recommendation' : 'Show AI Recommendation'}
        </button>
      )}

      {isExpanded && aiRecommendation && (
        <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#edf5ff', borderRadius: '8px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#161616' }}>AI Recommendation:</h4>
          <p style={{ fontSize: '14px', marginBottom: '16px', color: '#393939' }}>{aiRecommendation}</p>
          {!actionTaken && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                style={{ padding: '8px 16px', backgroundColor: '#0043ce', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                onClick={() => handleAction('approve')}
              >
                Approve
              </button>
              <button
                style={{ padding: '8px 16px', backgroundColor: '#393939', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                onClick={() => handleAction('review')}
              >
                Review
              </button>
            </div>
          )}
          {actionTaken && (
            <div style={{ textAlign: 'center', color: '#0043ce', fontWeight: '600' }}>
              <CheckCircle style={{ width: '16px', height: '16px', color: '#10B981', marginRight: '4px' }} />
              Action taken: {actionTaken.charAt(0).toUpperCase() + actionTaken.slice(1)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Original components
const KPICard = ({ title, value, change }) => (
  <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' }}>
    <h3 style={{ fontSize: '14px', color: '#718096' }}>{title}</h3>
    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</p>
    <p style={{ fontSize: '12px', color: change >= 0 ? '#48bb78' : '#f56565' }}>
      {change >= 0 ? '+' : ''}{change}% vs. Last Week
    </p>
  </div>
);

const WeatherDemandChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis yAxisId="left" />
      <YAxis yAxisId="right" orientation="right" />
      <RechartsTooltip />
      <Legend />
      <Line yAxisId="left" type="monotone" dataKey="demand" stroke="#8884d8" name="Demand" />
      <Line yAxisId="right" type="monotone" dataKey="weather" stroke="#82ca9d" name="Weather" />
    </LineChart>
  </ResponsiveContainer>
);

const InventoryChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="product" />
      <YAxis />
      <RechartsTooltip />
      <Legend />
      <Bar dataKey="current" fill="#8884d8" name="Current Stock" />
      <Bar dataKey="optimal" fill="#82ca9d" name="Optimal Stock" />
    </BarChart>
  </ResponsiveContainer>
);

const IntegrationItem = ({ name, icon: Icon, tooltip }) => (
  <CarbonTooltip direction="top" tabIndex={0} triggerText={
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#e6ffed', borderRadius: '5px', marginBottom: '10px', cursor: 'pointer' }}>
      <Icon style={{ marginRight: '10px' }} />
      <span>{name}</span>
    </div>
  }>
    <p>{tooltip}</p>
  </CarbonTooltip>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [reportType, setReportType] = useState('weekly');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '20px' }}>
              <KPICard title="Waste" value="20%" change={-2.5} />
              <KPICard title="Stockouts" value="15%" change={-1.8} />
              <KPICard title="Excess Inventory" value="25%" change={-3.2} />
              <KPICard title="Donations" value="10%" change={0.7} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '20px' }}>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Inventory Levels</h3>
                <InventoryChart data={inventoryData} />
              </div>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Demand Forecast (Weather-based)</h3>
                <WeatherDemandChart data={demandForecast} />
              </div>
            </div>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Intelligent Workflows</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                {workflows.map(workflow => (
                  <div key={workflow.id} style={{ backgroundColor: '#e3f8ff', padding: '20px', borderRadius: '5px' }}>
                    {workflow.text}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Work Queues</h3>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {workQueues.map(queue => (
                  <li key={queue.id} style={{ backgroundColor: '#f0f4f8', padding: '10px', borderRadius: '5px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{queue.text}</span>
                    <button style={{ backgroundColor: '#1f62ff', color: 'white', padding: '5px 10px', borderRadius: '5px', border: 'none' }}>{queue.action}</button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        );
      case 'stores':
        return (
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Store Comparison</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={storeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="waste" fill="#8884d8" name="Waste" />
                <Bar dataKey="stockouts" fill="#82ca9d" name="Stockouts" />
                <Bar dataKey="excess" fill="#ffc658" name="Excess" />
                <Bar dataKey="donations" fill="#ff8042" name="Donations" />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Detailed Statistics</h3>
              <p style={{ fontSize: '14px', color: '#6f6f6f' }}>
                Detailed statistics on inventory management, including waste reduction, stockout occurrences, and inventory turnover rates.
              </p>
            </div>
          </div>
        );
      case 'reports':
        const summary = reportType === 'weekly' ? weekSummary : reportType === 'monthly' ? monthSummary : yearSummary;
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <button
                onClick={() => setReportType('weekly')}
                style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: reportType === 'weekly' ? '#0043ce' : '#e3f8ff', color: reportType === 'weekly' ? 'white' : '#0043ce', border: 'none', borderRadius: '5px' }}
              >
                Weekly
              </button>
              <button
                onClick={() => setReportType('monthly')}
                style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: reportType === 'monthly' ? '#0043ce' : '#e3f8ff', color: reportType === 'monthly' ? 'white' : '#0043ce', border: 'none', borderRadius: '5px' }}
              >
                Monthly
              </button>
              <button
                onClick={() => setReportType('yearly')}
                style={{ padding: '10px 20px', backgroundColor: reportType === 'yearly' ? '#0043ce' : '#e3f8ff', color: reportType === 'yearly' ? 'white' : '#0043ce', border: 'none', borderRadius: '5px' }}
              >
                Yearly
              </button>
            </div>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>{`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Summary`}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '20px', backgroundColor: '#e3f8ff', borderRadius: '5px' }}>
                  <CheckCircle style={{ marginRight: '10px', color: '#48bb78' }} />
                  <div>
                    <h4 style={{ margin: 0 }}>Total Sales</h4>
                    <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>${summary.totalSales.toLocaleString()}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '20px', backgroundColor: '#e3f8ff', borderRadius: '5px' }}>
                  <Recycle style={{ marginRight: '10px', color: '#e53e3e' }} />
                  <div>
                    <h4 style={{ margin: 0 }}>Wastage Reduction</h4>
                    <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{summary.wastageReduction}%</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '20px', backgroundColor: '#e3f8ff', borderRadius: '5px' }}>
                  <CheckCircle style={{ marginRight: '10px', color: '#48bb78' }} />
                  <div>
                    <h4 style={{ margin: 0 }}>Stockout Reduction</h4>
                    <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{summary.stockoutReduction}%</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '20px', backgroundColor: '#e3f8ff', borderRadius: '5px' }}>
                  <CheckCircle style={{ marginRight: '10px', color: '#48bb78' }} />
                  <div>
                    <h4 style={{ margin: 0 }}>Overall Performance</h4>
                    <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{summary.comparisonToLastWeek || summary.comparisonToLastMonth || summary.comparisonToLastYear}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'smarterIntegration':
        return (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '20px' }}>
              <KPICard title="Total Inventory Value" value="$1.2M" change={5} />
              <KPICard title="Inventory Turnover" value="4.2" change={-5} />
              <KPICard title="Stock-out Rate" value="2.3%" change={-3.2} />
              <KPICard title="Forecast Accuracy" value="94%" change={2} />
            </div>

            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#161616' }}>System Integrations and AI Insights</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {integrations.map((integration, index) => (
                  <IntegrationCard key={index} {...integration} />
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#161616' }}>Product Traceability</h2>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ width: '120px', height: '120px', backgroundColor: '#edf5ff', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', marginRight: '20px' }}>
                  <QrCode style={{ width: '100px', height: '100px', color: '#0043ce' }} />
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: '#393939', marginBottom: '10px' }}>Scan this QR code to access detailed product origin and quality information.</p>
                  <p style={{ fontSize: '14px', color: '#0043ce' }}>This QR code integrates with our blockchain-based IBM Food Trust system for complete supply chain transparency.</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f7fafc' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#2a4365', color: 'white', padding: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px' }}>GREEN GARDEN</h1>
        <nav>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <SidebarItem label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
            <SidebarItem label="Stores" active={activeTab === 'stores'} onClick={() => setActiveTab('stores')} />
            <SidebarItem label="Reports" active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} />
            <SidebarItem label="Smarter Integration" active={activeTab === 'smarterIntegration'} onClick={() => setActiveTab('smarterIntegration')} />
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Inventory Dashboard</h2>
          <input type="text" placeholder="Search" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #e2e8f0' }} />
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

const SidebarItem = ({ label, active, onClick }) => (
  <li 
    onClick={onClick}
    style={{ 
      display: 'flex', 
      alignItems: 'center', 
      padding: '10px', 
      borderRadius: '5px', 
      cursor: 'pointer', 
      backgroundColor: active ? '#2c5282' : '', 
      color: active ? 'white' : '',
      marginBottom: '10px',
    }}
  >
    <span>{label}</span>
  </li>
);

export default Dashboard;
