package com.sales.ejb;

import java.util.ArrayList;
import java.util.List;

import com.sales.model.Book;

import jakarta.ejb.Singleton;

@Singleton
public class CatalogBean {
    private List<Book> books = new ArrayList<>();

    public CatalogBean() {
        books.add(new Book(1, "Shadow Hunters", "Cassandra Clare", 20.50));
        books.add(new Book(2, "El Principito", "Antoine de Saint-Exupéry", 22));
    }

    public List<Book> getBooks() {
        return books;
    }

    // public Book getBookById(int id) {
    //     return books.
    // }
}
