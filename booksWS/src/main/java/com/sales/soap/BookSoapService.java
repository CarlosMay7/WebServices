package com.sales.soap;

import com.sales.ejb.CatalogBean;
import com.sales.ejb.CartBean;
import com.sales.model.Book;
import jakarta.ejb.EJB;
import jakarta.jws.WebMethod;
import jakarta.jws.WebService;
import jakarta.ejb.Stateless;

@Stateless
@WebService
public class BookSoapService {

    @EJB
    private CatalogBean catalog;

    @EJB
    private CartBean cartBean;

    @WebMethod
    public String generateISBN(String title) {
        Book book = catalog.getBookByTitle(title);
        if (book == null) {
            return "Book not found";
        }
        return "978-3-" + Math.abs(title.hashCode()) + "-X";
    }

    @WebMethod
    public double calculatePriceWithVAT() {
        double total = cartBean.getTotal();
        return total * 1.16;
    }

    @WebMethod
    public double convertToCurrency() {
        double total = cartBean.getTotal();
        return total * 20.44;
    }
}

