package com.inventory.backend.service;

import com.inventory.backend.model.Product;
import com.inventory.backend.model.User;
import com.inventory.backend.repository.ProductRepository;
import com.inventory.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    private User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
    }

    public List<Product> getAllProducts(String username) {
        User user = getUserByUsername(username);
        return productRepository.findByUser(user);
    }

    public List<Product> searchProducts(String username, String name) {
        User user = getUserByUsername(username);
        return productRepository.findByUserAndNameContainingIgnoreCase(user, name);
    }

    public Optional<Product> getProductById(String username, Long id) {
        User user = getUserByUsername(username);
        return productRepository.findByIdAndUser(id, user);
    }

    public Product createProduct(String username, Product product) {
        User user = getUserByUsername(username);
        product.setUser(user);
        return productRepository.save(product);
    }

    public Product updateProduct(String username, Long id, Product productDetails) {
        User user = getUserByUsername(username);
        return productRepository.findByIdAndUser(id, user).map(product -> {
            product.setName(productDetails.getName());
            product.setPrice(productDetails.getPrice());
            product.setQuantity(productDetails.getQuantity());
            product.setCategory(productDetails.getCategory());
            return productRepository.save(product);
        }).orElseThrow(() -> new RuntimeException("Product not found with id " + id));
    }

    public void deleteProduct(String username, Long id) {
        User user = getUserByUsername(username);
        Product product = productRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Product not found with id " + id));
        productRepository.delete(product);
    }
}
