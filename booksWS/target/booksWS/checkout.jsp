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
    <!-- Sección de Carrito de Compra -->
    <div class="cart-items" id="checkoutCartItems">
      <h2 class="section-title">Carrito de Compra</h2>
      <!-- Los items se cargarán dinámicamente -->
    </div>

    <!-- Sección de Resumen del Pedido -->
    <div class="order-summary" id="orderSummary">
      <h2 class="section-title">Resumen del Pedido</h2>
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
        <span>Subtotal (con IVA)</span>
        <span id="subtotalValue">$0.00</span>
      </div>
      <div class="summary-item">
        <span>Envío</span>
        <span id="shippingValue">$5.00</span>
      </div>
      <div class="summary-total">
        <span>Total</span>
        <span id="totalValue">$0.00</span>
      </div>
      <button class="checkout-btn" onclick="proceedToPayment()">
        <i class="fas fa-lock"></i> Proceder al Pago
      </button>
    </div>
  </div>
  
  <!-- Incluye el script para el checkout -->
  <script src="scripts/books.js"></script>
</body>
</html>
