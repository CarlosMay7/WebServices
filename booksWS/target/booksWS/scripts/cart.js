async function loadCatalog() {
    try {
        const response = await fetch('/booksWS/api/books');
        if (response.ok) {
            const books = await response.json();
            displayCatalog(books);
        } else {
            console.error('Error al cargar el catálogo');
            showNotification('Error al cargar el catálogo', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error de conexión', 'error');
    }
}

async function addToCart(title) {
    try {
        const response = await fetch('/booksWS/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title })
        });

        if (response.ok) {
            showNotification('Libro añadido al carrito');
            loadCart();
        } else {
            console.error('Error al agregar al carrito');
            showNotification('Error al agregar al carrito', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error de conexión', 'error');
    }
}

async function removeFromCart(title) {
    try {
        const response = await fetch(`/booksWS/api/cart/remove/${encodeURIComponent(title)}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showNotification('Libro eliminado del carrito', 'warning');
            loadCart();
        } else {
            console.error('Error al eliminar del carrito');
            showNotification('Error al eliminar del carrito', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error de conexión', 'error');
    }
}

async function loadCart() {
    try {
        const response = await fetch('/booksWS/api/cart');
        if (response.ok) {
            const books = await response.json();
            displayCart(books);
            updateCartCount(books.length);
        } else {
            console.error('Error al cargar el carrito');
            showNotification('Error al cargar el carrito', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error de conexión', 'error');
    }
}

async function addBook(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    
    try {
        const response = await fetch('/booksWS/api/books', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            showNotification('Libro agregado correctamente');
            loadCatalog();
            event.target.reset();
        } else {
            console.error('Error al agregar el libro');
            showNotification('Error al agregar el libro', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error de conexión', 'error');
    }
}

function toggleCart() {
    loadCart();
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
}

function displayCatalog(books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    if (books.length === 0) {
        bookList.innerHTML = '<p>No hay libros disponibles.</p>';
        return;
    }

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Autor:</strong> ${book.author}</p>
            <p><strong>Precio:</strong> $${book.price}</p>
            <button onclick="addToCart('${book.title}')" class="submit-btn">
                Añadir al Carrito
            </button>
        `;
        bookList.appendChild(bookCard);
    });
}

function displayCart(books) {
    const cartItems = document.querySelector('.cart-items');
    
    if (!cartItems) {
        console.error('Elementos del carrito no encontrados');
        return;
    }
    
    cartItems.innerHTML = '';
    
    if (!books || books.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>El carrito está vacío</p>
            </div>`;
        return;
    }

    let total = 0;

    books.forEach(book => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <h4>${book.title}</h4>
                <p class="author">${book.author || 'Autor desconocido'}</p>
                <p class="price">$${(book.price || 0).toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-controls">
                    <button onclick="updateQuantity('${book.title}', 'decrease')" 
                            class="quantity-btn" 
                            aria-label="Disminuir cantidad">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">${book.quantity || 1}</span>
                    <button onclick="updateQuantity('${book.title}', 'increase')" 
                            class="quantity-btn" 
                            aria-label="Aumentar cantidad">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <button onclick="removeFromCart('${book.title}')" 
                        class="remove-btn" 
                        aria-label="Eliminar del carrito">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
        // total += (book.price || 0) * (book.quantity || 1);
    });
}

// Función complementaria para actualizar la cantidad
async function updateQuantity(title, action) {
    try {
        const response = await fetch(`/booksWS/api/cart/update-quantity?title=${encodeURIComponent(title)}&action=${action}`, {
            method: 'PUT'
        });

        if (response.ok) {
            loadCart();
        } else {
            console.error('Error al actualizar la cantidad');
            showNotification('Error al actualizar cantidad', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error de conexión', 'error');
    }
}

// Función para actualizar el contador del carrito
function updateCartCount(count) {
    const cartIcon = document.querySelector('.cart-icon');
    let cartCount = cartIcon.querySelector('.cart-count');
    
    if (!cartCount) {
        cartCount = document.createElement('span');
        cartCount.className = 'cart-count';
        cartIcon.appendChild(cartCount);
    }
    
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? 'block' : 'none';
    cartCount.setAttribute('aria-label', `${count} items en el carrito`);
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Actualizar contador del carrito
function updateCartCount(count) {
    const cartCounter = document.getElementById('cartCounter');
    if (!cartCounter) return;
    
    if (count === 0 || !count) {
        cartCounter.style.display = 'none';
    } else {
        cartCounter.style.display = 'block';
        cartCounter.textContent = count;
    }
}

// // Función para eliminar del carrito (complementaria)
// async function removeFromCart(title) {
//     try {
//         const response = await fetch('cartServlet', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             body: `title=${encodeURIComponent(title)}`
//         });

//         if (response.ok) {
//             loadCart();
//         } else {
//             console.error('Error al eliminar del carrito');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// Event listener para cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    loadCatalog();
});