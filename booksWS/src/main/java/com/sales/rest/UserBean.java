package com.sales.rest;

import jakarta.ejb.Stateless;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import com.sales.model.User;

@Stateless
public class UserBean {

    private static final List<User> usuarios = new ArrayList<>();
    private static int contadorId = 1;

    public List<User> listarUsuarios() {
        return usuarios;
    }

    public User agregarUsuario(User usuario) {
        usuario.setId(contadorId++);
        usuarios.add(usuario);
        return usuario;
    }
    
    public boolean removerUsuario(int id) {
        Iterator<User> iter = usuarios.iterator();
        while(iter.hasNext()){
            User u = iter.next();
            if(u.getId() == id){
                iter.remove();
                return true;
            }
        }
        return false;
    }
}
