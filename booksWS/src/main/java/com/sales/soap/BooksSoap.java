package com.sales.soap;
import com.sales.ejb.CartBean;

import jakarta.ejb.EJB;
import jakarta.jws.WebMethod; 
import jakarta.jws.WebService; 

@WebService
public class BooksSoap {

    @EJB
    private CartBean cartBean;

    @WebMethod
    public double calculatePriceWithVAT() {
        double total = cartBean.getTotal();
        return total * 1.16;
    }

    @WebMethod
    public double convertToCurrency() {
        double total = cartBean.getTotal();
        return total * 20.44;  // Conversión a pesos mexicanos
    }
     
}
