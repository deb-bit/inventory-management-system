import { useState, useEffect } from 'react';
import ProductService from '../services/product.service';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await ProductService.getAllProducts();
                setProducts(response.data);
            } catch (error) {
                console.error('Failed to fetch products', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const totalProducts = products.length;
    const totalValue = products.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    const lowStockItems = products.filter(p => p.quantity < 10);

    // Calculate category data for the pie chart
    const categoryDataMap = products.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + 1;
        return acc;
    }, {});
    
    // If no data, provide some dummy data so the chart looks good
    const chartData = Object.keys(categoryDataMap).length > 0 
        ? Object.keys(categoryDataMap).map(key => ({ name: key, value: categoryDataMap[key] }))
        : [
            { name: 'Electronics', value: 400 },
            { name: 'Furniture', value: 300 },
            { name: 'Clothing', value: 300 },
        ];

    const COLORS = ['#8884d8', '#ff7b72', '#4bc0c0', '#ffce56', '#36a2eb'];

    if (loading) return <div className="loading">Loading dashboard...</div>;

    return (
        <div className="page-container">
            <header className="page-header">
                <h1>Dashboard Overview</h1>
                <div className="header-search">
                    <span className="search-icon">🔍</span>
                    <input type="text" placeholder="Search" />
                </div>
            </header>
            
            <div className="stats-grid">
                <div className="stat-card stat-card-blue">
                    <div className="stat-content">
                        <h3>Total Products</h3>
                        <div className="stat-value">{totalProducts}</div>
                    </div>
                    <div className="stat-icon">📦</div>
                    <div className="stat-icon-bg">📦</div>
                </div>
                <div className="stat-card stat-card-teal">
                    <div className="stat-content">
                        <h3>Inventory Value</h3>
                        <div className="stat-value">₹{totalValue.toFixed(2)}</div>
                    </div>
                    <div className="stat-icon">📈</div>
                    <div className="stat-icon-bg">📈</div>
                </div>
                <div className="stat-card stat-card-pink">
                    <div className="stat-content">
                        <h3>Low Stock Alerts</h3>
                        <div className="stat-value">{lowStockItems.length}</div>
                    </div>
                    <div className="stat-icon">⛽</div>
                    <div className="stat-icon-bg">⛽</div>
                </div>
            </div>

            <div className="dashboard-bottom-grid">
                <div className="dashboard-section">
                    <h2>Low Stock Items</h2>
                    {lowStockItems.length === 0 ? (
                        <div className="empty-state-box">
                            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#dccfc1" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="3" y1="9" x2="21" y2="9"></line>
                                <line x1="3" y1="15" x2="21" y2="15"></line>
                            </svg>
                            <p>No low stock items currently.</p>
                        </div>
                    ) : (
                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Quantity</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lowStockItems.map(item => (
                                        <tr key={item.id} className="row-warning">
                                            <td>{item.name}</td>
                                            <td>{item.category}</td>
                                            <td>{item.quantity}</td>
                                            <td><span className="badge badge-warning">Low Stock</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="dashboard-section">
                    <h2>Top Categories</h2>
                    <div className="top-categories-box" style={{ height: '250px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={3}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} 
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
