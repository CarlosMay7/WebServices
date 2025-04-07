package com.sales.ejb;

import java.util.ArrayList;
import java.util.List;

import com.sales.model.Book;

import jakarta.ejb.Stateful;

// @Stateful
// public class CartBean {

//     private List<Book> shoppingCart = new ArrayList<>();

//     public void addBook(Book book) {
//         if(shoppingCart.contains(book)){

//         }
//     }

//     public void removeBook(String name) {
//         shoppingCart.removeIf(book -> book.getTitle().equals(name));
//     }

//     public List<Book> getSavedBooks() {
//         return shoppingCart;
//     }

//     public double getTotal() {
//         return shoppingCart.stream().mapToDouble(Book::getPrice).sum();
//     }
// }

@Stateful
public class CartBean {
    private class CartItem {
        private Book book;
        private int quantity;

        public CartItem(Book book, int quantity) {
            this.book = book;
            this.quantity = quantity;
        }

        public Book getBook() {
            return book;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }
    }

    private List<CartItem> shoppingCart = new ArrayList<>();

    public void addBook(Book book) {
        for (CartItem item : shoppingCart) {
            if (item.getBook().getTitle().equals(book.getTitle())) {
                item.setQuantity(item.getQuantity() + 1);
                return;
            }
        }
        shoppingCart.add(new CartItem(book, 1));
    }

    public void decreaseBookQuantity(Book book) {
        for (CartItem item : shoppingCart) {
            if (item.getBook().getTitle().equals(book.getTitle())) {
                item.setQuantity(item.getQuantity() - 1);
                return;
            }
        }
    }

    public void removeBook(String title) {
        shoppingCart.removeIf(item -> item.getBook().getTitle().equals(title));
    }

    public List<Book> getSavedBooks() {
        List<Book> books = new ArrayList<>();
        for (CartItem item : shoppingCart) {
            Book book = item.getBook();
            book.setQuantity(item.getQuantity());
            books.add(book);
        }
        return books;
    }

    public double getTotal() {
        return shoppingCart.stream()
                .mapToDouble(item -> item.getBook().getPrice() * item.getQuantity())
                .sum();
    }
}