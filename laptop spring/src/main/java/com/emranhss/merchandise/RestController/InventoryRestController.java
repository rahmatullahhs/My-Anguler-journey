package com.emranhss.merchandise.RestController;

import com.emranhss.merchandise.dto.InventoryResponseDTO;
import com.emranhss.merchandise.entity.Inventory;
import com.emranhss.merchandise.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin("*")
public class InventoryRestController {
    @Autowired
    private InventoryService inventoryService;

    @PostMapping("/add")
    public String addStock(@RequestBody Inventory stockRequest) {
        int itemId = stockRequest.getItem().getId();  // ✔️ cleaner and more correct
        int quantity = stockRequest.getQuantity();

        inventoryService.addStock(itemId, quantity);
        return "Stock added successfully!";
    }


    @PostMapping("/remove")
    public String removeStock(@RequestBody Inventory stockRequest) {
        int itemId = stockRequest.getItem().getId();
        int quantity = stockRequest.getQuantity();

        inventoryService.addStockOut(itemId, quantity);
        return "Stock removed successfully!";
    }



    @GetMapping("")
    public List<InventoryResponseDTO> getAllInventories() {
        return inventoryService.getAllInventoryResponseDTOS();
    }
}
