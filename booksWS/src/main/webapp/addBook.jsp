<!DOCTYPE html> 
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agregar Libro - BookHaven</title>
    <link rel="stylesheet" href="styles/style.css">
    <link rel="stylesheet" href="styles/addBook.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>

    <nav class="navbar">
        <div class="nav-brand">
            <i class="fas fa-book-open" aria-hidden="true"></i>
            <h1>BookHaven</h1>
        </div>
        <div class="nav-links">
            <a href="index.jsp" class="active" aria-current="page">Inicio</a>
            <a href="#" aria-label="Ver categor&iacute;as">Categor&iacute;as</a>
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

    <a href="index.jsp" class="back-button" style="margin: 1rem; display: inline-block;">
        <i class="fas fa-arrow-left"></i> Atr&aacute;s
    </a>

    <div class="container">
        <div class="form-container">
            <h1><i class="fas fa-book"></i> Agregar Nuevo Libro</h1>
            
            <form id="addBookForm" class="book-form">
                <div class="form-group">
                    <label for="title">
                        <i class="fas fa-heading"></i> T&iacute;tulo
                    </label>
                    <input type="text" 
                           id="title" 
                           name="title" 
                           required 
                           placeholder="Ingrese el t&iacute;tulo del libro">
                </div>

                <div class="form-group">
                    <label for="author">
                        <i class="fas fa-user-edit"></i> Autor
                    </label>
                    <input type="text" 
                           id="author" 
                           name="author" 
                           required 
                           placeholder="Ingrese el nombre del autor">
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="price">
                            <i class="fas fa-tag"></i> Precio
                        </label>
                        <div class="price-input">
                            <span class="currency">$</span>
                            <input type="number" 
                                   id="price" 
                                   name="price" 
                                   step="0.01" 
                                   required 
                                   placeholder="0.00">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="quantity">
                            <i class="fas fa-boxes"></i> Cantidad
                        </label>
                        <input type="number" 
                               id="quantity" 
                               name="quantity" 
                               required 
                               placeholder="Cantidad disponible">
                    </div>
                </div>

                <div class="form-actions">
                    <button type="submit" class="submit-btn">
                        <i class="fas fa-plus"></i> Agregar Libro
                    </button>
                    <button type="reset" class="reset-btn">
                        <i class="fas fa-undo"></i> Limpiar
                    </button>
                </div>
            </form>
        </div>
    </div>

    <div id="notification" class="notification"></div>

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
                    <a href="#" aria-label="S&iacute;guenos en Facebook">
                        <i class="fab fa-facebook" aria-hidden="true"></i>
                    </a>
                    <a href="#" aria-label="S&iacute;guenos en Twitter">
                        <i class="fab fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a href="#" aria-label="S&iacute;guenos en Instagram">
                        <i class="fab fa-instagram" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 BookHaven. Todos los derechos reservados.</p>
        </div>
    </footer>

    <script src="scripts/addBook.js"></script>
</body>
</html>