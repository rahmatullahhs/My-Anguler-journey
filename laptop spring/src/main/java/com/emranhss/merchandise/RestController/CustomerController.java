package com.emranhss.merchandise.RestController;

import com.emranhss.merchandise.entity.Customer;
import com.emranhss.merchandise.repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin("*")
public class CustomerController {
    @Autowired
    private final CustomerRepo customerRepo;

    public CustomerController(CustomerRepo customerRepo) {
        this.customerRepo = customerRepo;
    }

    // Create
    @PostMapping("add")
    public Customer addCustomer(@RequestBody Customer customer) {
        return customerRepo.save(customer);
    }

    // Read all
    @GetMapping("")
    public List<Customer> getAllCustomers() {
        return customerRepo.findAll();
    }

    // Read one by ID
    @GetMapping("/{id}")
    public Optional<Customer> getCustomerById(@PathVariable Long id) {
        return customerRepo.findById(id);
    }

    // Update
    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable Long id, @RequestBody Customer customerDetails) {
        return customerRepo.findById(id)
                .map(customer -> {
                    customer.setName(customerDetails.getName());
                    customer.setEmail(customerDetails.getEmail());
                    customer.setPhone(customerDetails.getPhone());
                    customer.setAddress(customerDetails.getAddress());

                    return customerRepo.save(customer);
                })
                .orElseThrow(() -> new RuntimeException("Customer not found with id " + id));
    }

    // Delete
    @DeleteMapping("{id}")
    public void deleteCustomer(@PathVariable Long id) {
        customerRepo.deleteById(id);
    }
}

