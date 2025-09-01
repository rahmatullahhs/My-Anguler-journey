package com.emranhss.merchandise.service;

import com.emranhss.merchandise.dto.InventoryResponseDTO;
import com.emranhss.merchandise.entity.Inventory;
import com.emranhss.merchandise.entity.Item;
import com.emranhss.merchandise.entity.StockIn;
import com.emranhss.merchandise.entity.StockOut;
import com.emranhss.merchandise.repository.InventoryRepo;
import com.emranhss.merchandise.repository.ItemRepo;
import com.emranhss.merchandise.repository.StockInRepo;
import com.emranhss.merchandise.repository.StockOutRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;

@Service
public class InventoryService {
    @Autowired
    private InventoryRepo inventoryRepo;

    @Autowired
    private StockInRepo stockInRepo;

    @Autowired
    private StockOutRepo stockOutRepo;

    @Autowired
    private ItemRepo itemRepo;

    public void addStock(int itemId, int quantity) {
        // Fetch the existing Item object from the database
        Item item = itemRepo.findById(itemId).orElse(null);

        if (item == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item with ID " + itemId + " not found.");
        }

        Inventory inventory = inventoryRepo.findByItemId(itemId);
        if (inventory != null) {
            // Update existing inventory
            inventory.setQuantity(inventory.getQuantity() + quantity);
            inventoryRepo.save(inventory);
        } else {
            // If inventory doesn't exist, create a new inventory record
            Inventory newInventory = new Inventory(0, quantity, item);
            inventoryRepo.save(newInventory);
        }

        // Create a StockIn entry (save the stock entry)
        StockIn stockIn = new StockIn(0, new Date(), quantity, item);
        stockInRepo.save(stockIn);
    }


    // Method to remove stock (Stock Out)
    public void addStockOut(int itemId, int quantity) {
        // Fetch the existing Item object from the database
        Item item = itemRepo.findById(itemId).orElse(null);

        if (item == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item with ID " + itemId + " not found.");
        }

        // Fetch inventory entry
        Inventory inventory = inventoryRepo.findByItemId(itemId);

        if (inventory != null) {
            // Check if there's enough stock for stock-out
            if (inventory.getQuantity() < quantity) {
                throw new RuntimeException("Insufficient stock for item ID " + itemId);
            }

            // Update inventory quantity (subtracting the stock-out quantity)
            inventory.setQuantity(inventory.getQuantity() - quantity);
            inventoryRepo.save(inventory);
        } else {
            // If inventory doesn't exist, throw an error or handle accordingly
            throw new RuntimeException("No inventory record found for item ID " + itemId);
        }

        // Create a StockOut entry (save the stock-out transaction)
        StockOut stockOut = new StockOut(0, new Date(), quantity, item);
        stockOutRepo.save(stockOut);
    }

    public List<Inventory> getAllInventory() {
        return inventoryRepo.findAll();
    }


    public List<InventoryResponseDTO> getAllInventoryResponseDTOS() {
        return inventoryRepo.findAll().stream().map(inventory -> {
            InventoryResponseDTO dto = new InventoryResponseDTO();
            dto.setId(inventory.getId());
            dto.setQuantity(inventory.getQuantity());
            dto.setName(inventory.getItem().getName());




            return dto;
        }).toList();
    }



}
