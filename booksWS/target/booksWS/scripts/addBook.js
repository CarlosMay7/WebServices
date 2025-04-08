document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addBookForm');

    // Manejo del formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(form);
            const data = new URLSearchParams(formData);

            const response = await fetch('catalogServlet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: data
            });

            const result = await response.json();

            if (response.ok) {
                showNotification(result.message, 'success');
                form.reset();
            } else {
                showNotification(result.message || 'Error al agregar el libro', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Error al agregar el libro', 'error');
        }
    });
});

// Función para mostrar notificaciones
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Validación de precio
document.getElementById('price').addEventListener('input', function(e) {
    let value = e.target.value;
    if (value && value < 0) {
        e.target.value = 0;
    }
});

// Validación de cantidad
document.getElementById('quantity').addEventListener('input', function(e) {
    let value = e.target.value;
    if (value && value < 0) {
        e.target.value = 0;
    }
});