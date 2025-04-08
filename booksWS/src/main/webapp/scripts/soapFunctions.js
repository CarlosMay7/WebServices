function createSoapEnvelope(methodName, subtotal) {
    return `<?xml version="1.0" encoding="UTF-8"?>
        <soap:Envelope 
            xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
            xmlns:tns="http://soap.sales.com/">
            <soap:Body>
                <tns:${methodName}>
                    <subtotal>${subtotal}</subtotal>
                </tns:${methodName}>
            </soap:Body>
        </soap:Envelope>`;
}

async function callSoapService(methodName, subtotal) {
    try {
        const response = await fetch('http://localhost:8080/booksWS/BooksSoap', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml;charset=UTF-8',
                'SOAPAction': ''
            },
            body: createSoapEnvelope(methodName, subtotal)
        });

        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");

        const result = xmlDoc.getElementsByTagNameNS("*", "return")[0].textContent;
        return parseFloat(result);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function calculateTotals() {
    try {
        loadCart();
        const subtotalText = document.getElementById('subtotal').textContent.replace(/[^0-9.]/g, '');
        const subtotal = parseFloat(subtotalText);

        const totalWithVAT = await callSoapService('applyVAT', subtotal);
        document.getElementById('totalWithVAT').textContent = `$${totalWithVAT.toFixed(2)}`;

        const totalInMXN = await callSoapService('convertToCurrency', subtotal);
        document.getElementById('totalInMXN').textContent = `$${totalInMXN.toFixed(2)}`;
    } catch (error) {
        console.error('Error al calcular totales:', error);
    }
}

async function loadCart() {
    try {
        const response = await fetch('cartServlet');
        if (response.ok) {
            const books = await response.json();
            const container = document.getElementById('cartItemsContainer');
            container.innerHTML = '<h2 class="section-title">Carrito de Compra</h2>';

            let subtotal = 0;

            books.forEach(book => {
                subtotal += book.price * (book.quantity || 1);

                const bookCard = document.createElement('div');
                bookCard.className = 'cart-item';
                bookCard.innerHTML = `
                    <div class="item-details">
                        <h3 class="item-title">${book.title}</h3>
                        <p class="item-author">${book.author}</p>
                        <p class="item-price">$${book.price.toFixed(2)}</p>
                        <div class="item-quantity">
                            <span>${book.quantity || 1}</span>
                        </div>
                    </div>
                `;
                container.appendChild(bookCard);
            });

            document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;

            const shipping = 5.00;
            const taxes = 7.50;
            const total = subtotal + shipping + taxes;
            
            const totalWithVAT = await callSoapService('applyVAT', total);
            const totalInMXN = await callSoapService('convertToCurrency', totalWithVAT);
            
            document.getElementById('total').textContent = `$${total.toFixed(2)}`;
            document.getElementById('totalWithVAT').textContent = `$${totalWithVAT.toFixed(2)}`;
            document.getElementById('totalInMXN').textContent = `$${totalInMXN.toFixed(2)}`;

        }
    } catch (error) {
        console.error('Error al cargar el carrito:', error);
    }
}


// Cargar totales iniciales cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    calculateTotals();
});