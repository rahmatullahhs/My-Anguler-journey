package com.emranhss.merchandise.RestController;

import com.emranhss.merchandise.entity.Goods;
import com.emranhss.merchandise.repository.BrandRepo;
import com.emranhss.merchandise.repository.CategoryRepo;
import com.emranhss.merchandise.repository.GoodsRepo;
import com.emranhss.merchandise.service.BrandService;
import com.emranhss.merchandise.service.CategoryService;
import com.emranhss.merchandise.service.GoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/goods")
@CrossOrigin("*")
public class GoodsController {


    @Autowired
    private GoodsService goodsService;

    @PostMapping("/add")
    public Goods createGoods(@RequestBody Goods goods) {
        return goodsService.save(goods);
    }

    @GetMapping
    public List<Goods> getAllGoods() {
        return goodsService.getAll();
    }

    @GetMapping("/{id}")
    public Goods getBuyGoodsById(@PathVariable Long id) {
        return goodsService.getById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Goods updateGoods(@PathVariable Long id, @RequestBody Goods updateGoods) {
        return goodsService.getById(id).map(existing -> {
            existing.setName(updateGoods.getName());
            existing.setPrice(updateGoods.getPrice());
            existing.setQty(updateGoods.getQty());
            existing.setBrand(updateGoods.getBrand());
            existing.setCategory(updateGoods.getCategory());
            existing.setSupplier(updateGoods.getSupplier());
            return goodsService.save(existing);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteGoods(@PathVariable Long id) {
        goodsService.delete(id);
    }
}
