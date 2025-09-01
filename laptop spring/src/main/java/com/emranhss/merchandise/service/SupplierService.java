package com.emranhss.merchandise.service;

import com.emranhss.merchandise.entity.Supplier;
import com.emranhss.merchandise.repository.SupplierRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepo supplierRepo;

    public List<Supplier> getAllSupplier() {
        return supplierRepo.findAll();
    }

    public Supplier getSupplierById(Long id) {
        return supplierRepo.findById(id).orElse(null);
    }

    public Supplier createSupplier(Supplier supplier) {
        return supplierRepo.save(supplier);
    }

    public Supplier updateSupplier(Long id, Supplier updatedSupplier) {
        return supplierRepo.findById(id).map(supplier -> {
            supplier.setName(updatedSupplier.getName());
            supplier.setContactPerson(updatedSupplier.getContactPerson());
            supplier.setPhone(updatedSupplier.getPhone());
            supplier.setEmail(updatedSupplier.getEmail());
            supplier.setAddress(updatedSupplier.getAddress());
            supplier.setCompanyName(updatedSupplier.getCompanyName());

            return supplierRepo.save(supplier);
        }).orElse(null);
    }

    public void deleteSupplier(Long id) {
        supplierRepo.deleteById(id);
    }
}
