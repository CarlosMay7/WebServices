<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Carrito de Compra</title>
    <link rel="stylesheet" href="styles/checkout.css">
</head>
<body onload="loadCart()">
    <div class="container">
        <h1>Mi Carrito</h1>
        <div class="cart-items" id="cartItemsContainer">
            <h2 class="section-title">Carrito de Compra</h2>
        </div>
        <div class="cart-summary">
            <p class="summary-line">Subtotal: <span id="subtotal" class="summary-price">$0.00</span></p>
            <p class="summary-line">Envío: <span class="shipping-fee">$5.00</span></p>
            <p class="summary-line">Impuestos: <span class="tax-fee">$7.50</span></p>
        
            <h3 class="total-main">Total: <span id="total" class="total-amount">$0.00</span></h3>
        
            <p class="summary-line total-extra">Total con IVA: <span id="totalWithVAT" class="vat-amount">$0.00</span></p>
            <p class="summary-line total-extra">Total en MXN: <span id="totalInMXN" class="mxn-amount">$0.00</span></p>
        </div>
        <div class="return-button-container">
            <a href="/booksWS" class="return-button">Volver al Inicio</a>
        </div>        
    </div>

    <script src="scripts/soapFunctions.js"></script>
</body>
</html>
