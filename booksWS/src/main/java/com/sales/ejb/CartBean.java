package com.sales.ejb;
import java.util.ArrayList;
import java.util.List;

import com.sales.model.Book;

import jakarta.ejb.Stateful;

@Stateful
public class CartBean {

    private List<Book> shoppingCart = new ArrayList<>();

    public void addBook(Book book) {
        shoppingCart.add(book);
    }

    public void removeBook(String name) {
        shoppingCart.removeIf(book -> book.getTitle().equals(name));
    }

    public List<Book> getSavedBooks() {
        return shoppingCart;
    }

    public double getTotal() {
        return shoppingCart.stream().mapToDouble(Book::getPrice).sum();
    }
}
