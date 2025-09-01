package com.emranhss.merchandise.service;

import com.emranhss.merchandise.entity.Category;
import com.emranhss.merchandise.repository.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    // Get all categories
    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    // Get a category by ID
    public Category getCategoryById(Long id) {
        return categoryRepo.findById(id).orElseThrow(() -> new RuntimeException("Category not found with ID: " + id));
    }

    // Create a new category
    public Category createCategory(Category category) {
        return categoryRepo.save(category);
    }

    // Update an existing category
    public Category updateCategory(Long id, Category updatedCategory) {
        return categoryRepo.findById(id).map(existingCategory -> {
            existingCategory.setName(updatedCategory.getName());
            // You can also update brands if needed, but usually not from here.
            return categoryRepo.save(existingCategory);
        }).orElseThrow(() -> new RuntimeException("Category not found with ID: " + id));
    }


    // Delete a category
    public void deleteCategory(Long id) {
        categoryRepo.deleteById(id);
    }
}
