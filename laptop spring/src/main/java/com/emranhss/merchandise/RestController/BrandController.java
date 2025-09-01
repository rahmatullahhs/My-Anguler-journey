package com.emranhss.merchandise.RestController;

import com.emranhss.merchandise.entity.Brand;
import com.emranhss.merchandise.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/brand")
@CrossOrigin("*")
public class BrandController {

    @Autowired
    private BrandService brandService;

    // Create
    @PostMapping("/add")
    public Brand addBrand(@RequestBody Brand brand) {
        return brandService.create(brand);
    }

    // Read all
    @GetMapping("")
    public List<Brand> getAllBrand() {
        return brandService.getAllBrand();
    }

    // Read one
    @GetMapping("/{id}")
    public Optional<Brand> getBrandById(@PathVariable Long id) {
        return brandService.getBrandById(id);
    }

    // Update
    @PutMapping("/{id}")
    public Brand updateBrand(@PathVariable Long id, @RequestBody Brand brand) {
        return brandService.update(id, brand);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void deleteBrand(@PathVariable Long id) {
        brandService.deleteBrand(id);
    }
}
