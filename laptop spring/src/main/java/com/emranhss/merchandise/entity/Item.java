package com.emranhss.merchandise.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<StockIn> stockIns;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<StockOut> stockOuts;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<Inventory> inventories;

    public Item() {
    }

    public Item(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
