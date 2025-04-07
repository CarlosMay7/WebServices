package com.sales.soap;

import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import java.io.IOException;

@WebServlet("/soapServlet")
public class SoapServlet extends HttpServlet {

    private GeneratorSoap generator = new GeneratorSoap();
    private BooksSoap books = new BooksSoap();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String action = request.getParameter("action");
        response.setContentType("application/json");

        switch (action) {
            case "generateISBN":
                String title = request.getParameter("title");
                String isbn = generator.generateISBN(title);
                response.getWriter().write("{\"isbn\":\"" + isbn + "\"}");
                break;

            case "priceWithVAT":
                double vatPrice = books.calculatePriceWithVAT();
                response.getWriter().write("{\"priceWithVAT\":" + vatPrice + "}");
                break;

            case "convertCurrency":
                double mxnPrice = books.convertToCurrency();
                response.getWriter().write("{\"convertedPrice\":" + mxnPrice + "}");
                break;

            default:
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\":\"Acción no válida\"}");
        }
    }
}
