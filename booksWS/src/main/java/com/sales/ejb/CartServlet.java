package com.sales.ejb;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sales.model.Book;

import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/cartServlet")
public class CartServlet extends HttpServlet {
    
    @EJB
    private CartBean cartBean;
    
    @EJB
    private CatalogBean catalogBean;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<Book> cartBooks = cartBean.getSavedBooks();
        sendJsonResponse(response, cartBooks);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String req = request.getParameter("title");
        String action = request.getParameter("action");
        try {            
            JsonObject jsonTitle = JsonParser.parseString(req).getAsJsonObject();
            String title = jsonTitle.get("title").getAsString();
            
            if ("add".equals(action)) {
                Book book = catalogBean.getBookByTitle(title);
                if (book != null) {
                    cartBean.addBook(book);
                    response.setStatus(HttpServletResponse.SC_OK);
                } else {
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                }
            } else if ("remove".equals(action)) {
                cartBean.removeBook(title);
                response.setStatus(HttpServletResponse.SC_OK);
            } else if ("updateQuantity".equals(action)) {
                Book book = catalogBean.getBookByTitle(title);
                String actionValue = request.getParameter("value");
                JsonObject jsonValue = JsonParser.parseString(actionValue).getAsJsonObject();
                String value = jsonValue.get("value").getAsString();
                if("increase".equals(value)) {
                    cartBean.addBook(book);
                    response.setStatus(HttpServletResponse.SC_OK);
                } else if("decrease".equals(value)){
                    cartBean.decreaseBookQuantity(book);
                    response.setStatus(HttpServletResponse.SC_OK);
                }
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }   
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    private void sendJsonResponse(HttpServletResponse response, List<Book> books) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();
        String json = gson.toJson(books);
        out.print(json);
        out.flush();
    }
}