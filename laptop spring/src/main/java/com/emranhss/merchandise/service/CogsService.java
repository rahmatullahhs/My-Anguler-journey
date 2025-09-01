package com.emranhss.merchandise.service;

import com.emranhss.merchandise.entity.Cogs;
import com.emranhss.merchandise.entity.Customer;
import com.emranhss.merchandise.repository.CogsRepo;
import com.emranhss.merchandise.repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CogsService {


    @Autowired
    private CogsRepo cogsRepo;

    public List<Cogs> getAllCogs() {
        return cogsRepo.findAll();
    }

    public Cogs getCogsById(Long id) {
        return cogsRepo.findById(id).orElse(null);
    }

//    public Cogs createCogs(Cogs cogs) {
//        return cogsRepo.save(cogs);
//    }

    public Cogs createCogs(Cogs cogs) {
        if (cogs.getDate() == null) {
            cogs.setDate(cogs.getDate());  // default to today if no date provided
        }
        return cogsRepo.save(cogs);
    }


    public Cogs updateCogs(Long id, Cogs updatedCogs) {
        return cogsRepo.findById(id).map(cogs -> {
            cogs.setProductName(updatedCogs.getProductName());
            cogs.setPurchaseInvoice(updatedCogs.getPurchaseInvoice());
            cogs.setProductPrice(updatedCogs.getProductPrice());
            cogs.setTransportFee(updatedCogs.getTransportFee());
            cogs.setLabourCost(updatedCogs.getLabourCost());
            cogs.setPackingCost(updatedCogs.getPackingCost());
            cogs.setTax(updatedCogs.getTax());
            cogs.setTotalCogs(updatedCogs.getTotalCogs());
            cogs.setDate(updatedCogs.getDate());
            return cogsRepo.save(cogs);
        }).orElse(null);
    }

    public void deleteCogs(Long id) {
        cogsRepo.deleteById(id);
    }
}




