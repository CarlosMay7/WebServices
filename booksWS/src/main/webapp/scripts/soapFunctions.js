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


// Función para llamar al servicio SOAP
// async function callSoapService(methodName) {
//     try {
//         const response = await fetch('http://localhost:8080/booksWS/BooksSoap', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'text/xml;charset=UTF-8',
//                 'SOAPAction': ''
//             },
//             body: createSoapEnvelope(methodName)
//         });

//         const xmlText = await response.text();
//         console.log(xmlText);
//         const parser = new DOMParser();
//         const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        
//         // const result = xmlDoc.getElementsByTagName(methodName + "Response")[0]
//         //                    .getElementsByTagName("return")[0]
//         //                    .textContent;
//         const result = xmlDoc.getElementsByTagNameNS("*", "return")[0].textContent;
//         console.log(result)
                           
//         return parseFloat(result);
//     } catch (error) {
//         console.error('Error:', error);
//         throw error;
//     }
// }

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


// Función para calcular y mostrar los totales
async function calculateTotals() {
    try {

        loadCart();
        // Obtener total con IVA
        const totalWithVAT = await callSoapService('calculatePriceWithVAT');
        document.getElementById('totalWithVAT').textContent = 
            `$${totalWithVAT.toFixed(2)}`;

        // Obtener total en MXN
        const totalInMXN = await callSoapService('convertToCurrency');
        console.log(totalInMXN);
        document.getElementById('totalInMXN').textContent = 
            `$${totalInMXN.toFixed(2)}`;

        // Mostrar notificación de éxito
        showNotification('Totales calculados correctamente', 'success');
    } catch (error) {
        console.error('Error al calcular totales:', error);
        showNotification('Error al calcular totales', 'error');
    }
}

// Función para cambiar la moneda
function changeCurrency(currency) {
    const elements = document.querySelectorAll('.summary-item span:last-child, .summary-total span:last-child');
    const exchangeRates = {
        USD: 1,
        EUR: 0.85,
        GBP: 0.73,
        JPY: 110.42,
        MXN: 20.44
    };

    const symbols = {
        USD: '$',
        EUR: '€',
        GBP: '£',
        JPY: '¥',
        MXN: '$' 
    };

    elements.forEach(element => {
        if (element.dataset.originalValue === undefined) {
            element.dataset.originalValue = parseFloat(element.textContent.replace(/[^0-9.-]+/g, ''));
        }

        const originalValue = parseFloat(element.dataset.originalValue);
        const convertedValue = originalValue * exchangeRates[currency];
        element.textContent = `${symbols[currency]}${convertedValue.toFixed(2)}`;
    });

    // Recalcular totales SOAP si es necesario
    if (currency === 'MXN') {
        calculateTotals();
    }
}

// Función para mostrar notificaciones
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

async function loadCart() {
    try {
        const response = await fetch('cartServlet');
        if (response.ok) {
            const books = await response.json();

            // Calcular subtotal en JS
            const subtotal = books.reduce((sum, book) => sum + book.price, 0);

            // Actualizar totales usando SOAP
            const totalWithVAT = await callSoapService('applyVAT', subtotal);
            const totalInMXN = await callSoapService('convertToMXN', subtotal);

            document.getElementById('totalWithVAT').textContent = `$${totalWithVAT.toFixed(2)}`;
            document.getElementById('totalInMXN').textContent = `$${totalInMXN.toFixed(2)}`;

            showNotification('Totales calculados correctamente', 'success');
        }
    } catch (error) {
        console.error('Error al cargar el carrito:', error);
        showNotification('Error al calcular totales', 'error');
    }
}

// Cargar totales iniciales cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    calculateTotals();
});