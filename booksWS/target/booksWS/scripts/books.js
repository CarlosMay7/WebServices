// Función auxiliar para invocar el servicio SOAP
async function callSoapService(soapAction, soapBody) {
    try {
        // URL del endpoint SOAP publicado en WildFly
        const serviceUrl = 'http://127.0.0.1:8080/booksWS/BookSoapService';
        const response = await fetch(serviceUrl, { 
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml;charset=UTF-8',
                // En muchos casos, SOAPAction se puede dejar vacío o configurarse según el WSDL
                'SOAPAction': soapAction 
            },
            body: soapBody
        });
        return await response.text();
    } catch (error) {
        console.error('Error en callSoapService:', error);
        throw error;
    }
}

// Función para calcular el resumen usando SOAP para obtener precio con IVA
async function calculateSummary() {
    // Costo de envío fijo
    const shipping = 5.00;
    try {
        // Armar el SOAP Envelope para calcular precio con IVA
        const soapEnvelope = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://soap.sales.com/">
  <soapenv:Header/>
  <soapenv:Body>
    <ser:calculatePriceWithVAT/>
  </soapenv:Body>
</soapenv:Envelope>
        `;
        
        const soapResponse = await callSoapService("", soapEnvelope);
        // Parsear la respuesta XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(soapResponse, "text/xml");
        const resultNode = xmlDoc.getElementsByTagName("return")[0];
        const vatPrice = parseFloat(resultNode.textContent);

        // Actualizar la UI: se asume que el subtotal incluye IVA
        document.getElementById('subtotalValue').textContent = `$${vatPrice.toFixed(2)}`;
        document.getElementById('shippingValue').textContent = `$${shipping.toFixed(2)}`;
        document.getElementById('totalValue').textContent = `$${(vatPrice + shipping).toFixed(2)}`;
    } catch (error) {
        console.error('Error en calculateSummary:', error);
    }
}

// Función para convertir moneda mediante SOAP
async function changeCurrency(currency) {
    try {
        // Armar el SOAP Envelope para convertir a moneda; en este ejemplo, usamos el método convertToCurrency
        const soapEnvelope = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://soap.sales.com/">
  <soapenv:Header/>
  <soapenv:Body>
    <ser:convertToCurrency/>
  </soapenv:Body>
</soapenv:Envelope>
        `;
        
        const soapResponse = await callSoapService("", soapEnvelope);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(soapResponse, "text/xml");
        const resultNode = xmlDoc.getElementsByTagName("return")[0];
        const convertedPrice = parseFloat(resultNode.textContent);
        
        // Para este ejemplo, se asume que la conversión afecta únicamente al subtotal
        // y que el costo de envío se mantiene sin convertir (o bien lo puedes convertir si lo deseas)
        const shipping = 5.00;
        document.getElementById('subtotalValue').textContent = `${currencySymbol(currency)}${convertedPrice.toFixed(2)}`;
        document.getElementById('totalValue').textContent = `${currencySymbol(currency)}${(convertedPrice + shipping).toFixed(2)}`;
    } catch (error) {
        console.error('Error en changeCurrency:', error);
    }
}

// Función auxiliar para obtener el símbolo de la moneda
function currencySymbol(currency) {
    switch (currency) {
        case 'USD': return '$';
        case 'EUR': return '€';
        case 'GBP': return '£';
        case 'JPY': return '¥';
        default: return '';
    }
}

// Función para cargar el carrito y generar la vista del checkout (mantén tu implementación RESTful para los items)
async function loadCart() {
    try {
        const response = await fetch('/booksWS/api/cart');
        if (response.ok) {
            const books = await response.json();
            displayCartItems(books);
            calculateSummary(); // Actualiza el resumen usando SOAP
        } else {
            console.error('Error al cargar el carrito');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// La función displayCartItems se encarga de generar dinámicamente los elementos HTML según el carrito
function displayCartItems(books) {
    const checkoutCartItems = document.getElementById('checkoutCartItems');
    checkoutCartItems.innerHTML = '<h2 class="section-title">Carrito de Compra</h2>';
    if (!books || books.length === 0) {
        checkoutCartItems.innerHTML += '<p>El carrito está vacío</p>';
        return;
    }
    books.forEach(book => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="https://via.placeholder.com/100x140" alt="Libro" class="item-image">
            <div class="item-details">
                <h3 class="item-title">${book.title}</h3>
                <p class="item-author">${book.author}</p>
                <p class="item-price">$${book.price.toFixed(2)}</p>
                <div class="item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity('${book.title}', 'decrease')">-</button>
                    <span>${book.quantity || 1}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${book.title}', 'increase')">+</button>
                </div>
            </div>
        `;
        checkoutCartItems.appendChild(cartItem);
    });
}

// Función para actualizar la cantidad de un libro en el carrito (mediante REST)
async function updateQuantity(title, action) {
    try {
        const response = await fetch(`/booksWS/api/cart/update-quantity?title=${encodeURIComponent(title)}&action=${action}`, {
            method: 'PUT'
        });
        if (response.ok) {
            loadCart();
        } else {
            console.error('Error al actualizar la cantidad');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para proceder al pago
function proceedToPayment() {
    alert("Procediendo al pago...");
}

// Carga la información del carrito al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});
