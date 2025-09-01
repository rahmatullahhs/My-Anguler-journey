package com.emranhss.merchandise.repository;

import com.emranhss.merchandise.entity.Cogs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CogsRepo extends JpaRepository<Cogs,Long> {




}
