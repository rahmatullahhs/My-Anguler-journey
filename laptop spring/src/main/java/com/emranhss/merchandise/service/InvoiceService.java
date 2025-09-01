package com.emranhss.merchandise.service;

import com.emranhss.merchandise.entity.Invoice;
import com.emranhss.merchandise.entity.Product;
import com.emranhss.merchandise.repository.InvoiceRepo;
import com.emranhss.merchandise.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepo invoiceRepo;
    @Autowired
    private ProductRepo productRepo;



//    public Invoice save(Invoice invoice) {
//        // Re-fetch each product from the DB (optional step depending on use case)
//        List<Product> managedProducts = invoice.getProducts().stream()
//                .map(p -> productRepo.findById(p.getId())
//                        .orElseThrow(() -> new RuntimeException("Product not found with id: " + p.getId())))
//                .toList();
//
//        // Set the invoice reference in each product
//        managedProducts.forEach(p -> p.setInvoice(invoice));
//
//        // Set the managed products back into invoice
//        invoice.setProducts(managedProducts);
//
//        // Calculate totals before saving
//        invoice.calculateTotals();
//
//        // Save the invoice along with cascade to products
//        return invoiceRepo.save(invoice);
//
//
//
//    }


//    public Invoice save(Invoice invoice) {
//        // Re-fetch each product from the DB
//        List<Product> managedProducts = invoice.getProducts().stream()
//                .map(p -> productRepo.findById(p.getId())
//                        .orElseThrow(() -> new RuntimeException("Product not found with id: " + p.getId())))
//                .toList();
//        // Deduct quantities
//        for (int i = 0; i < managedProducts.size(); i++) {
//            Product managedProduct = managedProducts.get(i);
//            Product invoiceProduct = invoice.getProducts().get(i);
//
//            int newQuantity = managedProduct.getQuantity() - invoiceProduct.getQuantity();
//
//            if (newQuantity < 0) {
//                throw new RuntimeException("Not enough stock for product: " + managedProduct.getName());
//            }
//            managedProduct.setQuantity(newQuantity);
//            managedProduct.setInvoice(invoice); // link to invoice
//            productRepo.save(managedProduct);   // update stock
//        }
//        // Update invoice with managed products
//        invoice.setProducts(managedProducts);
//        // Calculate totals
//        invoice.calculateTotals();
//        // Save the invoice
//        return invoiceRepo.save(invoice);
//    }

//    public Invoice save(Invoice invoice) {
//        // Save invoice first without products so it gets a valid ID
//        invoice.setProducts(null); // Detach products temporarily
//        Invoice savedInvoice = invoiceRepo.save(invoice); // ✅ invoice now has ID
//
//        // Re-fetch and update product inventory, then link to invoice
//        List<Product> updatedProducts = invoice.getProducts().stream().map(p -> {
//            Product dbProduct = productRepo.findById(p.getId())
//                    .orElseThrow(() -> new RuntimeException("Product not found with id: " + p.getId()));
//
//            int newQuantity = dbProduct.getQuantity() - p.getQuantity();
//
//            if (newQuantity < 0) {
//                throw new RuntimeException("Not enough stock for product: " + dbProduct.getName());
//            }
//
//            dbProduct.setQuantity(newQuantity);
//            dbProduct.setInvoice(savedInvoice); // ✅ link invoice after it has an ID
//
//            return dbProduct;
//        }).toList();
//
//        // Save updated products
//        productRepo.saveAll(updatedProducts);
//
//        // Now update invoice with correct products
//        savedInvoice.setProducts(updatedProducts);
//        savedInvoice.calculateTotals(); // re-calculate based on updated data
//
//        return invoiceRepo.save(savedInvoice); // ✅ final update with correct totals and linked products
//    }


    public List<Invoice> getAll() {
        return invoiceRepo.findAll();
    }

    public Optional<Invoice> getById(Long id) {
        return invoiceRepo.findById(id);
    }

    public void delete(Long id) {
        invoiceRepo.deleteById(id);
    }

}
