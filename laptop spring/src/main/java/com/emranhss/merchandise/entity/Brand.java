package com.emranhss.merchandise.entity;

import jakarta.persistence.*;
@Table(name="brand")
@Entity
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

@ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    public Brand() {
    }

    public Brand(Long id, String name, Category category) {
        this.id = id;
        this.name = name;
        this.category = category;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
