package com.sales.soap;

import com.sales.ejb.CatalogBean;
import com.sales.model.Book;

import jakarta.ejb.EJB;
import jakarta.jws.WebMethod; 
import jakarta.jws.WebService; 

@WebService
public class GeneratorSoap {

    @EJB
    private CatalogBean catalog; 

    @WebMethod
    public String generateISBN(String title) {
        Book book = catalog.getBookByTitle(title);
        if (book == null) {
            return "Book not found"; 
        }

        String isbn = "978-3-" + title.hashCode() + "-X";
        return isbn;
    }
}

