import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductService from '../services/product.service';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await ProductService.getAllProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (searchQuery.trim()) {
                const response = await ProductService.searchProducts(searchQuery);
                setProducts(response.data);
            } else {
                fetchProducts();
            }
        } catch (error) {
            console.error('Search failed', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await ProductService.deleteProduct(id);
                setProducts(products.filter(p => p.id !== id));
            } catch (error) {
                console.error('Failed to delete product', error);
            }
        }
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <h1>Products</h1>
                <Link to="/products/add" className="btn btn-primary">Add New Product</Link>
            </header>

            <div className="search-bar">
                <form onSubmit={handleSearch} className="search-form">
                    <input 
                        type="text" 
                        placeholder="Search products by name..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="btn btn-secondary">Search</button>
                    {searchQuery && (
                        <button type="button" className="btn btn-outline" onClick={() => { setSearchQuery(''); fetchProducts(); }}>Clear</button>
                    )}
                </form>
            </div>

            {loading ? (
                <div className="loading">Loading products...</div>
            ) : (
                <div className="table-container">
                    {products.length === 0 ? (
                        <p className="empty-state">No products found.</p>
                    ) : (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>₹{product.price.toFixed(2)}</td>
                                        <td>
                                            <span className={`badge ${product.quantity < 10 ? 'badge-warning' : 'badge-success'}`}>
                                                {product.quantity}
                                            </span>
                                        </td>
                                        <td className="actions-cell">
                                            <Link to={`/products/edit/${product.id}`} className="btn-icon edit">✏️</Link>
                                            <button onClick={() => handleDelete(product.id)} className="btn-icon delete">🗑️</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductList;
