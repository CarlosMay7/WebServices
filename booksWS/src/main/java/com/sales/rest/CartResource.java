package com.sales.rest;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import jakarta.enterprise.context.SessionScoped;
import java.io.Serializable;

import com.sales.ejb.CartBean;
import com.sales.ejb.CatalogBean;
import com.sales.model.Book;

import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@SessionScoped
@Path("/cart")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CartResource implements Serializable {

    @EJB
    private CartBean cartBean;

    @EJB
    private CatalogBean catalogBean;

    @POST
    @Path("/add")
    public Response addToCart(String jsonBody) {
        JsonObject json = JsonParser.parseString(jsonBody).getAsJsonObject();
        String title = json.get("title").getAsString();
        Book book = catalogBean.getBookByTitle(title);
        if (book == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Libro no encontrado").build();
        }
        cartBean.addBook(book);
        return Response.ok().build();
    }

    @DELETE
    @Path("/remove")
    public Response removeFromCart(String jsonBody) {
        JsonObject json = JsonParser.parseString(jsonBody).getAsJsonObject();
        String title = json.get("title").getAsString();
        cartBean.removeBook(title);
        return Response.noContent().build();
    }

    @PUT
    @Path("/update-quantity")
    public Response updateQuantity(
            @QueryParam("title") String title,
            @QueryParam("action") String action) { 
        
        Book book = catalogBean.getBookByTitle(title);

        if ("increase".equals(action)) {
            cartBean.addBook(book); 
        } else if ("decrease".equals(action)) {
            cartBean.decreaseBookQuantity(book); 
        } else {
            return Response.status(Response.Status.BAD_REQUEST).entity("Acción no válida").build();
        }
        
        return Response.ok().build();
    }

    @GET
    public Response getCartItems() {
        List<Book> books = cartBean.getSavedBooks();
        return Response.ok(books).build();
    }
}