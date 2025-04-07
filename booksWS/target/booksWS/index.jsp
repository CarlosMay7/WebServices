<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BookHaven - Tu Librería Digital</title>
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
            <a href="#" aria-label="Ver categorias">Categorias</a>
            <a href="#" aria-label="Ver ofertas">Ofertas</a>
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
            <p>Explora nuestra coleccion de libros cuidadosamente seleccionados</p>
        </section>

        <section class="catalog">
            <h2>Catalogo de Libros</h2>

            <div id="bookList" class="book-grid" aria-label="Lista de libros disponibles">
            </div>
        </section>

        <!-- <section class="add-book-section">
            <h2>Agregar Nuevo Libro</h2>
            <form class="add-book-form" onsubmit="addBook(event)" aria-label="Formulario para agregar nuevo libro">
                <div class="form-group">
                    <label for="title">Título:</label>
                    <input type="text" 
                           id="title" 
                           name="title" 
                           required 
                           aria-required="true">
                </div>

                <div class="form-group">
                    <label for="author">Autor:</label>
                    <input type="text" 
                           id="author" 
                           name="author" 
                           required 
                           aria-required="true">
                </div>

                <div class="form-group">
                    <label for="price">Precio:</label>
                    <input type="number" 
                           id="price" 
                           name="price" 
                           step="0.01" 
                           required 
                           aria-required="true">
                </div>

                <div id="formMessage" class="message" aria-live="polite"></div>

                <button type="submit" class="submit-btn">Agregar</button>
                <button type="reset" class="reset-btn">Limpiar</button>
            </form>
        </section> -->
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
                <h3>Síguenos</h3>
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