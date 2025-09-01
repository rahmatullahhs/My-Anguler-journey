package com.emranhss.merchandise.service;

import com.emranhss.merchandise.entity.Item;
import com.emranhss.merchandise.repository.ItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    @Autowired
    private ItemRepo itemRepo;


    public List<Item> getAllItems() {
        return itemRepo.findAll();
    }
    public Item saveItems(Item items) {
        return itemRepo.save(items);
    }
    public void deleteById(Integer id) {
        itemRepo.deleteById(id);
    }

//    public List<ItemResponseDTO> getAllItemResponseDTOS() {
//        return itemRepo.findAll().stream().map(item -> {
//            ItemResponseDTO dto = new ItemResponseDTO();
//            dto.setId(item.getId());
//            dto.setCategoryName(item.getCategoryName());
//            dto.setUnit(item.getUnit());
//
//
//            return dto;
//        }).toList();
//    }

}
