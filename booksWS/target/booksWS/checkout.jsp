<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout - BookHaven</title>
    <link rel="stylesheet" href="styles/checkout.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
    <div class="checkout-container">
        <div class="cart-items">
            <h2 class="section-title">Carrito de Compra</h2>
            
            <!-- Item 1 -->
            <div class="cart-item">
                <img src="https://via.placeholder.com/100x140" alt="Libro" class="item-image">
                <div class="item-details">
                    <h3 class="item-title">El Nombre del Viento</h3>
                    <p class="item-author">Patrick Rothfuss</p>
                    <p class="item-price">$29.99</p>
                    <div class="item-quantity">
                        <button class="quantity-btn">-</button>
                        <span>1</span>
                        <button class="quantity-btn">+</button>
                    </div>
                </div>
            </div>

            <!-- Item 2 -->
            <div class="cart-item">
                <img src="https://via.placeholder.com/100x140" alt="Libro" class="item-image">
                <div class="item-details">
                    <h3 class="item-title">Dune</h3>
                    <p class="item-author">Frank Herbert</p>
                    <p class="item-price">$24.99</p>
                    <div class="item-quantity">
                        <button class="quantity-btn">-</button>
                        <span>2</span>
                        <button class="quantity-btn">+</button>
                    </div>
                </div>
            </div>

            <!-- Item 3 -->
            <div class="cart-item">
                <img src="https://via.placeholder.com/100x140" alt="Libro" class="item-image">
                <div class="item-details">
                    <h3 class="item-title">1984</h3>
                    <p class="item-author">George Orwell</p>
                    <p class="item-price">$19.99</p>
                    <div class="item-quantity">
                        <button class="quantity-btn">-</button>
                        <span>1</span>
                        <button class="quantity-btn">+</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="order-summary">
            <h2 class="section-title">Resumen del Pedido</h2>

            <!-- Añade esto después del título "Resumen del Pedido" -->
        <div class="currency-selector">
            <label for="currency">Moneda:</label>
            <select id="currency" onchange="changeCurrency(this.value)">
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
            </select>
        </div>
            
            <div class="summary-item">
                <span>Subtotal</span>
                <span>$74.97</span>
            </div>
            
            <div class="summary-item">
                <span>Envío</span>
                <span>$5.00</span>
            </div>
            
            <div class="summary-item">
                <span>Impuestos</span>
                <span>$7.50</span>
            </div>
            
            <div class="summary-total">
                <span>Total</span>
                <span>$87.47</span>
            </div>

            <button class="checkout-btn">
                <i class="fas fa-lock"></i> Proceder al Pago
            </button>
        </div>
    </div>
    <script src="soapFunctions.js"></script>
</body>
</html>