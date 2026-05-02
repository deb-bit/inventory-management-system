package com.inventory.backend.controller;

import com.inventory.backend.model.Product;
import com.inventory.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts(Principal principal) {
        return productService.getAllProducts(principal.getName());
    }
    
    @GetMapping("/search")
    public List<Product> searchProducts(Principal principal, @RequestParam String name) {
        return productService.searchProducts(principal.getName(), name);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(Principal principal, @PathVariable Long id) {
        return productService.getProductById(principal.getName(), id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Product createProduct(Principal principal, @RequestBody Product product) {
        return productService.createProduct(principal.getName(), product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(Principal principal, @PathVariable Long id, @RequestBody Product productDetails) {
        try {
            Product updatedProduct = productService.updateProduct(principal.getName(), id, productDetails);
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(Principal principal, @PathVariable Long id) {
        try {
            productService.deleteProduct(principal.getName(), id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
