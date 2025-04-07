package com.sales.ejb;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.sales.model.Book;

import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/catalogServlet")
public class CatalogServlet extends HttpServlet {
    
    @EJB
    private CatalogBean catalogBean;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        List<Book> catalogBooks = catalogBean.getBooks();
        sendJsonResponse(response, catalogBooks);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();
        
        try {
            // Obtener los parámetros del formulario
            String title = request.getParameter("title");
            String author = request.getParameter("author");
            double price = Double.parseDouble(request.getParameter("price"));
            int quantity = Integer.parseInt(request.getParameter("quantity"));

            // Crear nuevo libro
            Book book = new Book(title, author, price);
            book.setQuantity(quantity);

            // Agregar el libro al catálogo
            catalogBean.addBook(book);

            // Crear respuesta JSON
            JsonObject jsonResponse = new JsonObject();
            jsonResponse.addProperty("success", true);
            jsonResponse.addProperty("message", "Libro agregado exitosamente");
            
            out.print(gson.toJson(jsonResponse));

        } catch (NumberFormatException e) {
            sendErrorResponse(response, "El precio o cantidad no tienen un formato válido");
        } catch (Exception e) {
            sendErrorResponse(response, "Error al agregar el libro: " + e.getMessage());
        }
    }

    private void sendJsonResponse(HttpServletResponse response, List<Book> books) 
            throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();
        String json = gson.toJson(books);
        out.print(json);
        out.flush();
    }

    private void sendErrorResponse(HttpServletResponse response, String message) 
            throws IOException {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();
        JsonObject jsonResponse = new JsonObject();
        jsonResponse.addProperty("success", false);
        jsonResponse.addProperty("message", message);
        out.print(gson.toJson(jsonResponse));
    }
}