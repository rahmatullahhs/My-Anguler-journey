package com.emranhss.merchandise.RestController;

import com.emranhss.merchandise.entity.Category;
import com.emranhss.merchandise.entity.Employee;
import com.emranhss.merchandise.repository.CategoryRepo;
import com.emranhss.merchandise.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/category")
@CrossOrigin("*")
public class CategoryController {


        @Autowired
        private CategoryService categoryService;

        // Create
        @PostMapping("/add")
        public Category saveCategory(@RequestBody Category category) {
            return categoryService.createCategory(category);
        }



    // Read one
        @GetMapping("{id}")
        public Category getCategoryById(@PathVariable long id) {
            return categoryService.getCategoryById(id);
        }

        // Read all
        @GetMapping("")
        public List<Category> getAllCategories() {
            return categoryService.getAllCategories();
        }

        // Update
        @PutMapping("{id}")
        public Category updateCategory(@PathVariable long id, @RequestBody Category category) {
            return categoryService.updateCategory(id, category);
        }

        // Delete
        @DeleteMapping("{id}")
        public void deleteCategory(@PathVariable Long id) {
            categoryService.deleteCategory(id);
        }
    }
