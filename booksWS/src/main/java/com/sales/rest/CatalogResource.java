package com.sales.rest;

import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import com.sales.ejb.CatalogBean;
import com.sales.model.Book;

@Path("/books")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CatalogResource {

    @EJB
    private CatalogBean catalogBean; // Reuses your existing EJB

    // GET /books → Returns all books
    @GET
    public Response getAllBooks() {
        List<Book> books = catalogBean.getBooks();
        return Response.ok(books).build();
    }

    // POST /books → Adds a new book
    @POST
    public Response addBook(@FormParam("title") String title,
                            @FormParam("author") String author,
                            @FormParam("price") double price,
                            @FormParam("quantity") int quantity) {
        
        Book book = new Book(title, author, price);
        book.setQuantity(quantity);
        catalogBean.addBook(book);
        return Response.status(Response.Status.CREATED).build();
    }
}