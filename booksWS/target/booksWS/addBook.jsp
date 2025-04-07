<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agregar Libro - BookHaven</title>
    <link rel="stylesheet" href="styles/addBook.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>

    <a href="/booksWS" class="back-button">
        <i class="fas fa-home"></i> Inicio
    </a>


    <div class="container">
        <div class="form-container">
            <h1><i class="fas fa-book"></i> Agregar Nuevo Libro</h1>
            
            <form id="addBookForm" class="book-form">
                <div class="form-group">
                    <label for="title">
                        <i class="fas fa-heading"></i> Título
                    </label>
                    <input type="text" 
                           id="title" 
                           name="title" 
                           required 
                           placeholder="Ingrese el título del libro">
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

    <script src="scripts/addBook.js"></script>
</body>
</html>