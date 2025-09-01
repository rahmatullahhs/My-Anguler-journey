package com.emranhss.merchandise.RestController;

import com.emranhss.merchandise.entity.Supplier;
import com.emranhss.merchandise.repository.SupplierRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/supplier")
@CrossOrigin("*")
public class SupplierController {

    @Autowired
    private final SupplierRepo supplierRepo;

    public SupplierController(SupplierRepo supplierRepo) {
        this.supplierRepo = supplierRepo;
    }

    // Create
    @PostMapping("add")
    public Supplier addSupplier(@RequestBody Supplier supplier) {
        return supplierRepo.save(supplier);
    }

    // Read all
    @GetMapping("")
    public List<Supplier> getAllSuppliers() {
        return supplierRepo.findAll();
    }

    // Read one by ID
    @GetMapping("/{id}")
    public Optional<Supplier> getSupplierById(@PathVariable Long id) {
        return supplierRepo.findById(id);
    }

    // Update
    @PutMapping("/{id}")
    public Supplier updateSupplier(@PathVariable Long id, @RequestBody Supplier supplierDetails) {
        return supplierRepo.findById(id)
                .map(supplier -> {
                    supplier.setName(supplierDetails.getName());
                    supplier.setContactPerson(supplierDetails.getContactPerson());
                    supplier.setPhone(supplierDetails.getPhone());
                    supplier.setEmail(supplierDetails.getEmail());
                    supplier.setAddress(supplierDetails.getAddress());
                    supplier.setCompanyName(supplierDetails.getCompanyName());

                    return supplierRepo.save(supplier);
                })
                .orElseThrow(() -> new RuntimeException("Supplier not found with id " + id));
    }

    // Delete
    @DeleteMapping("{id}")
    public void deleteSupplier(@PathVariable Long id) {
        supplierRepo.deleteById(id);
    }
}

