package com.sales.rest;

import com.sales.ejb.CartBean;
import com.sales.ejb.CatalogBean;
import com.sales.model.Book;
import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/cart")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CartResource {

    @EJB
    private CartBean cartBean; // Inyecta tu EJB Stateful

    @EJB
    private CatalogBean catalogBean;

    // Añadir libro al carrito (por título)
    @POST
    @Path("/add")
    public Response addToCart(Book book) { // Recibe un JSON con { "title": "...", "price": x.x }
        cartBean.addBook(book);
        return Response.ok().build();
    }

    // Eliminar libro del carrito (por título)
    @DELETE
    @Path("/remove/{title}")
    public Response removeFromCart(@PathParam("title") String title) {
        cartBean.removeBook(title);
        return Response.noContent().build();
    }

    // Actualizar cantidad (aumentar/disminuir)
    @PUT
    @Path("/update-quantity")
    public Response updateQuantity(
            @QueryParam("title") String title,
            @QueryParam("action") String action) { // "increase" o "decrease"
        
        Book book = catalogBean.getBookByTitle(title);

        if ("increase".equals(action)) {
            cartBean.addBook(book); // Aumenta cantidad en +1
        } else if ("decrease".equals(action)) {
            cartBean.decreaseBookQuantity(book); // Disminuye cantidad en -1
        } else {
            return Response.status(Response.Status.BAD_REQUEST).entity("Acción no válida").build();
        }
        
        return Response.ok().build();
    }

    // Obtener todos los libros del carrito
    @GET
    public Response getCartItems() {
        List<Book> books = cartBean.getSavedBooks();
        
        // Devuelve un JSON combinado (libros + total)
        return Response.ok(books).build();
    }
}