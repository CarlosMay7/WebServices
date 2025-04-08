package com.sales.rest;

import jakarta.enterprise.context.SessionScoped;
import java.io.Serializable;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import com.sales.ejb.CatalogBean;
import com.sales.model.Book;

@SessionScoped
@Path("/books")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CatalogResource implements Serializable {

    @EJB
    private CatalogBean catalogBean;

    @GET
    public Response getAllBooks() {
        List<Book> books = catalogBean.getBooks();
        return Response.ok(books).build();
    }

    @POST
    public Response addBook(String jsonBody) {
        try {
            JsonObject json = JsonParser.parseString(jsonBody).getAsJsonObject();
            String title = json.get("title").getAsString();
            String author = json.get("author").getAsString();
            double price = json.get("price").getAsDouble();
            int quantity = json.get("quantity").getAsInt();

            Book book = new Book(title, author, price);
            book.setQuantity(quantity);
            catalogBean.addBook(book);

            JsonObject responseJson = new JsonObject();
            responseJson.addProperty("message", "Libro agregado exitosamente");

            return Response.status(Response.Status.CREATED).entity(responseJson.toString()).build();
        } catch (Exception e) {
            JsonObject errorJson = new JsonObject();
            errorJson.addProperty("message", "Error al procesar la solicitud");
            return Response.status(Response.Status.BAD_REQUEST).entity(errorJson.toString()).build();
        }
    }
}