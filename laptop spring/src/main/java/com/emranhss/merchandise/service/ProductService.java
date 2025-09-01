package com.emranhss.merchandise.service;

import com.emranhss.merchandise.dto.ProductResponseDTO;
import com.emranhss.merchandise.entity.Product;
import com.emranhss.merchandise.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class ProductService {

    private final ProductRepo productRepo;

    @Autowired
    public ProductService(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    // Create or update a product
    public Product saveProduct(Product product) {
        return productRepo.save(product);
    }

    // Get all products
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    // Get product by ID
    public Optional<Product> getProductById(Long id) {
        return productRepo.findById(id);
    }

    // Delete product by ID
    public void deleteProduct(Long id) {
        productRepo.deleteById(id);
    }


    public List<ProductResponseDTO> getAllProductResponseDTOS() {
        return productRepo.findAll().stream().map(product -> {
            ProductResponseDTO dto = new ProductResponseDTO();
            dto.setId(product.getId());
            dto.setName(product.getName());
            dto.setPrice(product.getPrice());
            dto.setCategory(product.getCategory());
            dto.setDetails(product.getDetails());
            dto.setQuantity(product.getQuantity());
            dto.setBrand(product.getBrand());
            dto.setModel(product.getModel());


            return dto;
        }).toList();
    }
}
