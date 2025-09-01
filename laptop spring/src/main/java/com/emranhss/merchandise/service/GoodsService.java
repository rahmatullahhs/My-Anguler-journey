package com.emranhss.merchandise.service;

import com.emranhss.merchandise.entity.Brand;
import com.emranhss.merchandise.entity.Category;
import com.emranhss.merchandise.entity.Goods;
import com.emranhss.merchandise.entity.Supplier;
import com.emranhss.merchandise.repository.BrandRepo;
import com.emranhss.merchandise.repository.CategoryRepo;
import com.emranhss.merchandise.repository.GoodsRepo;
import com.emranhss.merchandise.repository.SupplierRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GoodsService {
    @Autowired
    private GoodsRepo goodsRepo;

    @Autowired
    private BrandRepo brandRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private SupplierRepo supplierRepo;

    public Goods save(Goods goods) {
        // Fetch existing entities from DB using IDs
        Brand brand = brandRepo.findById(goods.getBrand().getId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        Category category = categoryRepo.findById(goods.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Supplier supplier = supplierRepo.findById(goods.getSupplier().getId())
                .orElseThrow(() -> new RuntimeException("Supplier not found"));

        // Set persistent references
        goods.setBrand(brand);
        goods.setCategory(category);
        goods.setSupplier(supplier);

        return goodsRepo.save(goods);
    }

    public List<Goods> getAll() {
        return goodsRepo.findAll();
    }

    public Optional<Goods> getById(Long id) {
        return goodsRepo.findById(id);
    }

    public void delete(Long id) {
        goodsRepo.deleteById(id);
    }

    // Helpers to fetch related entities by ID
    public Brand getBrandById(Long id) {
        return brandRepo.findById(id).orElse(null);
    }

    public Category getCategoryById(Long id) {
        return categoryRepo.findById(id).orElse(null);
    }

    public Supplier getSupplierById(Long id) {
        return supplierRepo.findById(id).orElse(null);
    }
}

