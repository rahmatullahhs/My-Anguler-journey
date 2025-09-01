package com.emranhss.merchandise.repository;

import com.emranhss.merchandise.entity.StockOut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockOutRepo extends JpaRepository<StockOut, Integer> {
}
