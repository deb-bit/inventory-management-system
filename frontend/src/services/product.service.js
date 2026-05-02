import api from './api';

const getAllProducts = () => {
    return api.get('/products');
};

const getProductById = (id) => {
    return api.get(`/products/${id}`);
};

const createProduct = (product) => {
    return api.post('/products', product);
};

const updateProduct = (id, product) => {
    return api.put(`/products/${id}`, product);
};

const deleteProduct = (id) => {
    return api.delete(`/products/${id}`);
};

const searchProducts = (name) => {
    return api.get(`/products/search?name=${name}`);
};

const ProductService = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts
};

export default ProductService;
