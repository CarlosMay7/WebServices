// soapFunctions.js

async function generateISBN() {
    const response = await fetch('soapServlet', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'action=generateISBN'
    });
    const isbn = await response.text();
    console.log('ISBN generado:', isbn);
    // Aquí podrías mostrarlo en pantalla
}

async function getPriceWithVAT(price) {
    const response = await fetch('soapServlet', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `action=priceWithVAT&price=${price}`
    });
    const priceWithVat = await response.text();
    console.log('Precio con IVA:', priceWithVat);
}

async function convertCurrency(price, toCurrency) {
    const response = await fetch('soapServlet', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `action=convertCurrency&price=${price}&currency=${toCurrency}`
    });
    const converted = await response.text();
    console.log(`Precio en ${toCurrency}:`, converted);
}
