package com.sales.ejb;

import java.util.ArrayList;
import java.util.List;

import com.sales.model.Book;

import jakarta.ejb.Singleton;

@Singleton
public class CatalogBean {
    private List<Book> books = new ArrayList<>();

    public CatalogBean() {
        books.add(new Book("Shadow Hunters", "Cassandra Clare", 20.50));
        books.add(new Book("El Principito", "Antoine de Saint-Exupéry", 22));
    }

    public List<Book> getBooks() {
        return books;
    }

    public Book getBookByTitle(String name) {
        return books.stream().filter(book -> book.getTitle().equals(name)).findFirst().orElse(null);
    }
}
