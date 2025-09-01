package com.emranhss.merchandise.repository;

import com.emranhss.merchandise.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepo extends JpaRepository<Inventory, Integer> {

    Inventory findByItemId(int itemId);
}
