package com.sales.soap;

import jakarta.jws.WebMethod;
import jakarta.jws.WebParam;
import jakarta.jws.WebService;

@WebService
public class BooksSoap {

    @WebMethod
    public double applyVAT(@WebParam(name = "subtotal") double subtotal) {
        return subtotal * 1.16;
    }

    @WebMethod
    public double convertToCurrency(@WebParam(name = "subtotal") double subtotal) {
        return subtotal * 20.44;
    }
}
