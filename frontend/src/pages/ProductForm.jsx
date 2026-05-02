import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductService from '../services/product.service';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: '',
        quantity: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditMode) {
            const fetchProduct = async () => {
                try {
                    const response = await ProductService.getProductById(id);
                    setProduct(response.data);
                } catch (err) {
                    setError('Failed to fetch product details.');
                }
            };
            fetchProduct();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            if (isEditMode) {
                await ProductService.updateProduct(id, product);
            } else {
                await ProductService.createProduct(product);
            }
            navigate('/products');
        } catch (err) {
            setError('Failed to save product. Please check your inputs.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container form-page">
            <header className="page-header">
                <h1>{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
            </header>

            <div className="form-card">
                {error && <div className="alert alert-error">{error}</div>}
                <form onSubmit={handleSubmit} className="crud-form">
                    <div className="form-group">
                        <label>Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input
                            type="text"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group half">
                            <label>Price (₹)</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group half">
                            <label>Quantity</label>
                            <input
                                type="number"
                                min="0"
                                name="quantity"
                                value={product.quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/products')}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
