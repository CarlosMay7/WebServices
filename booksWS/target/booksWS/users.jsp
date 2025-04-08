<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Lista de Usuarios</title>
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
        <a href="addUser.jsp" class="submit-btn">Agregar Usuario</a>
    </div>
</nav>

<main class="container">
    <h2>Lista de Usuarios</h2>
    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="usersBody">
        </tbody>
    </table>
</main>

<footer>
    <div class="footer-content">
        <p>&copy; 2025 BookStore. Todos los derechos reservados.</p>
    </div>
</footer>

<div id="notification"></div>

</body>
</html>
