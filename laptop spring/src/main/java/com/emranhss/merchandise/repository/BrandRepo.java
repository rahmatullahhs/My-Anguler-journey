package com.emranhss.merchandise.repository;

import com.emranhss.merchandise.entity.Brand;
import com.emranhss.merchandise.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BrandRepo extends JpaRepository<Brand , Long> {
List<Brand>findByCategoryId(Long categoryId);


}
