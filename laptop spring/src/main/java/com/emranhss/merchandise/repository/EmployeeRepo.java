package com.emranhss.merchandise.repository;

import com.emranhss.merchandise.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepo extends JpaRepository<Employee,Long> {
}
