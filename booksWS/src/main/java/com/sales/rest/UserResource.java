package com.sales.rest;

import jakarta.enterprise.context.SessionScoped;
import java.io.Serializable;
import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import com.sales.model.User;

@SessionScoped
@Path("/usuarios")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource implements Serializable {

    @EJB
    private UserBean usuarioBean;

    @GET
    public List<User> listarUsuarios() {
        return usuarioBean.listarUsuarios();
    }

    @POST
    public User agregarUsuario(User usuario) {
        return usuarioBean.agregarUsuario(usuario);
    }
    
    @DELETE
    @Path("/{id}")
    public Response eliminarUsuario(@PathParam("id") int id) {
        boolean removido = usuarioBean.removerUsuario(id);
        if(removido) {
            return Response.ok().build();
        } else {
            return Response.status(Response.Status.NOT_FOUND)
                           .entity("Usuario no encontrado")
                           .build();
        }
    }
}
