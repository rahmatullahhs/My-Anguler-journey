package com.emranhss.merchandise.service;

import com.emranhss.merchandise.entity.Brand;
import com.emranhss.merchandise.entity.Category;
import com.emranhss.merchandise.repository.BrandRepo;
import com.emranhss.merchandise.repository.CategoryRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrandService {

    @Autowired
    private BrandRepo brandRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    // ✅ Return all brands
    public List<Brand> getAllBrand() {
        return brandRepo.findAll();
    }

    // ✅ Get a brand by ID
    public Optional<Brand> getBrandById(Long id) {
        return brandRepo.findById(id);
    }

    // ✅ Create a new brand
    @Transactional
    public Brand create(Brand brand) {
        if (brand.getCategory() != null) {
            Long categoryId = brand.getCategory().getId();
            Category category = categoryRepo.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId));
            brand.setCategory(category);
        }
        return brandRepo.save(brand);
    }

    // ✅ Update an existing brand
    public Brand update(Long id, Brand updateBrand) {
        Brand existingBrand = brandRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found with id: " + id));

        existingBrand.setName(updateBrand.getName());

        if (updateBrand.getCategory() != null) {
            Long categoryId = updateBrand.getCategory().getId();
            Category category = categoryRepo.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId));
            existingBrand.setCategory(category);
        }

        return brandRepo.save(existingBrand);
    }

    // ✅ Delete a brand
    public void deleteBrand(Long id) {
        brandRepo.deleteById(id);
    }
}
