package com.emranhss.merchandise.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "stock_in")
public class StockIn {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private Date receivedTransactionDate;
    private int quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    public StockIn() {
    }

    public StockIn(int id, Date receivedTransactionDate, int quantity, Item item) {
        this.id = id;
        this.receivedTransactionDate = receivedTransactionDate;
        this.quantity = quantity;
        this.item = item;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getReceivedTransactionDate() {
        return receivedTransactionDate;
    }

    public void setReceivedTransactionDate(Date receivedTransactionDate) {
        this.receivedTransactionDate = receivedTransactionDate;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }
}
