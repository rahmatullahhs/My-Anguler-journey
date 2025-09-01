package com.emranhss.merchandise.RestController;

import com.emranhss.merchandise.dto.ProductResponseDTO;
import com.emranhss.merchandise.entity.Product;
import com.emranhss.merchandise.entity.Supplier;
import com.emranhss.merchandise.repository.ProductRepo;
import com.emranhss.merchandise.repository.SupplierRepo;
import com.emranhss.merchandise.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/product")
@CrossOrigin("*")
public class ProductController {

  @Autowired
  private final ProductRepo productRepo;
    @Autowired
    private ProductService productService;

    public ProductController(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    // Create
    @PostMapping("add")
    public Product addProduct(@RequestBody Product product) {
        return productRepo.save(product);
    }

    // Read all
    @GetMapping("all")
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    @GetMapping("")
    public List<ProductResponseDTO> getAllProductsResponseDTOs() {
        return productService.getAllProductResponseDTOS();

    }


    // Read one by ID
    @GetMapping("/{id}")
    public Optional<Product> getProductById(@PathVariable Long id) {
        return productRepo.findById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        return productRepo.findById(id)
                .map(product -> {
                    product.setName(productDetails.getName());
                    product.setCategory(productDetails.getCategory());
                    product.setBrand(productDetails.getBrand());
                    product.setModel(productDetails.getModel());
                    product.setDetails(productDetails.getDetails());
                    product.setQuantity(productDetails.getQuantity());
                    product.setPrice(productDetails.getPrice());

                    Product updatedProduct = productRepo.save(product);
                    return ResponseEntity.ok(updatedProduct);
                })
                .orElse(ResponseEntity.notFound().build());
    }


    // Delete
    @DeleteMapping("{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepo.deleteById(id);
    }
}

