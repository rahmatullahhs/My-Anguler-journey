package com.emranhss.merchandise.repository;

import com.emranhss.merchandise.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category, Long> {
        Category findByName(String name);

    }






