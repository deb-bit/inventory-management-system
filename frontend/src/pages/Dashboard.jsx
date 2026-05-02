import { useState, useEffect } from 'react';
import ProductService from '../services/product.service';

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

    if (loading) return <div className="loading">Loading dashboard...</div>;

    return (
        <div className="page-container">
            <header className="page-header">
                <h1>Dashboard Overview</h1>
            </header>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Products</h3>
                    <div className="stat-value">{totalProducts}</div>
                </div>
                <div className="stat-card">
                    <h3>Inventory Value</h3>
                    <div className="stat-value">₹{totalValue.toFixed(2)}</div>
                </div>
                <div className="stat-card warning">
                    <h3>Low Stock Alerts</h3>
                    <div className="stat-value">{lowStockItems.length}</div>
                </div>
            </div>

            <div className="dashboard-section">
                <h2>Low Stock Items</h2>
                {lowStockItems.length === 0 ? (
                    <p className="empty-state">No low stock items currently.</p>
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
        </div>
    );
};

export default Dashboard;
