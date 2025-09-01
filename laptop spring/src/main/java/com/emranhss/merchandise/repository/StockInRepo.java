package com.emranhss.merchandise.repository;

import com.emranhss.merchandise.entity.StockIn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockInRepo extends JpaRepository<StockIn, Integer> {
}
