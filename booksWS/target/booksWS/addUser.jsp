<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Agregar Usuario</title>
    <link rel="stylesheet" href="styles/user.css">
    <script src="scripts/user.js" defer></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
</head>
<body>

<nav class="navbar">
    <div class="nav-brand">
        <a href="index.jsp" style="display: flex; align-items: center; color: inherit; text-decoration: none; gap: 1rem;">
            <i class="fas fa-book-open" aria-hidden="true"></i>
            <h1>BookHaven</h1>
        </a>
    </div>
    <div class="nav-links">
        <a href="users.jsp" class="submit-btn">Volver a Usuarios</a>
    </div>
</nav>

<main class="container">
    <h2>Nuevo Usuario</h2>
    <form id="userForm" class="form">
        <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required />
        </div>

        <div class="form-group">
            <label for="correo">Correo:</label>
            <input type="email" id="correo" name="correo" required />
        </div>

        <div class="form-group">
            <label for="clave">Contraseña:</label>
            <input type="password" id="clave" name="clave" required />
        </div>

        <div class="form-group">
            <label for="rol">Rol:</label>
            <select id="rol" name="rol" required>
                <option value="">Seleccionar rol</option>
                <option value="admin">Admin</option>
                <option value="usuario">Usuario</option>
            </select>
        </div>

        <button type="submit" class="submit-btn">Guardar Usuario</button>
    </form>
</main>

<footer>
    <div class="footer-content">
        <p>&copy; 2025 BookStore. Todos los derechos reservados.</p>
    </div>
</footer>

<div id="notification"></div>

</body>
</html>
