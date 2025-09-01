package com.emranhss.merchandise.RestController;

import com.emranhss.merchandise.entity.Item;
import com.emranhss.merchandise.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/item")
@CrossOrigin("*")
public class ItemRestController {

    @Autowired
    private ItemService itemService;

    @GetMapping("")
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }



//    @GetMapping("")
//    public List<ItemResponseDTO> getAllItemsDTOs() {
//        return itemService.getAllItemResponseDTOS();
//    }


    @PostMapping("")
    public ResponseEntity<Item> createItems(@RequestBody Item items) {
        Item savedItems = itemService.saveItems(items);
        return ResponseEntity.ok(savedItems);
    }
}
