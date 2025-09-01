package com.emranhss.merchandise.repository;


import com.emranhss.merchandise.entity.Goods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoodsRepo extends JpaRepository<Goods,Long> {
}
