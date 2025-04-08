<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BookHaven - Tu Librer&iacute;a Digital</title>
    <link rel="stylesheet" href="styles/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <script src="scripts/cart.js"></script>
</head>
<body>
    <nav class="navbar">
        <div class="nav-brand">
            <i class="fas fa-book-open" aria-hidden="true"></i>
            <h1>BookHaven</h1>
        </div>
        <div class="nav-links">
            <a href="#" class="active" aria-current="page">Inicio</a>
            <a href="#" aria-label="Ver categorías">Categor&iacute;as</a>
            <a href="#" aria-label="Ver ofertas">Ofertas</a>
            <!-- Nuevo botón para administrar usuarios -->
            <a href="users.jsp" aria-label="Administrar Usuarios">Usuarios</a>
        </div>
        <div class="cart-icon">
            <button aria-label="Abrir carrito de compras" onclick="toggleCart()">
                <i class="fas fa-shopping-cart" aria-hidden="true"></i>
            </button>
        </div>
    </nav>

    <div class="cart-sidebar" id="cartSidebar" aria-label="Carrito de compras">
        <div class="cart-header">
            <h3>Tu Carrito</h3>
            <button onclick="toggleCart()" aria-label="Cerrar carrito">&times;</button>
        </div>
        <div class="cart-items" aria-live="polite">
        </div>
        <div class="cart-total">
            <a href="checkout.jsp">
                <button class="checkout-btn" aria-label="Proceder al pago">
                        Ver resumen de compra
                </button>
            </a>
        </div>
    </div>

    <main>
        <section class="hero">
            <h2>Descubre Nuevas Historias</h2>
            <p>Explora nuestra colecci&oacute;n de libros cuidadosamente seleccionados</p>
        </section>

        <div style="text-align: center; margin: 20px;">
            <a href="addBook.jsp">
                <button class="checkout-btn" aria-label="Agregar nuevo libro">
                    <i class="fas fa-plus"></i> Agregar Libro
                </button>
            </a>
        </div>

        <section class="catalog">
            <h2>Cat&aacute;logo de Libros</h2>
            <div id="bookList" class="book-grid" aria-label="Lista de libros disponibles">
            </div>
        </section>
    </main>

    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h3>BookHaven</h3>
                <p>Tu destino literario favorito</p>
            </div>
            <div class="footer-section">
                <h3>Contacto</h3>
                <p>Email: <a href="mailto:info@bookhaven.com">info@bookhaven.com</a></p>
                <p>Tel: <a href="tel:+1234567890">(123) 456-7890</a></p>
            </div>
            <div class="footer-section">
                <h3>S&iacute;guenos</h3>
                <div class="social-links">
                    <a href="#" aria-label="Síguenos en Facebook">
                        <i class="fab fa-facebook" aria-hidden="true"></i>
                    </a>
                    <a href="#" aria-label="Síguenos en Twitter">
                        <i class="fab fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a href="#" aria-label="Síguenos en Instagram">
                        <i class="fab fa-instagram" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 BookHaven. Todos los derechos reservados.</p>
        </div>
    </footer>
</body>
</html>
