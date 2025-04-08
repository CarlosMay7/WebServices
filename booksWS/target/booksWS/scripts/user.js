
function showNotification(message, type = 'success') {
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

async function loadUsers() {
    try {
        const response = await fetch('/booksWS/api/usuarios');  
        if (response.ok) {
            const users = await response.json();
            const tbody = document.getElementById('usersBody');
            tbody.innerHTML = '';

            users.forEach(user => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.nombre}</td>
                    <td>${user.correo}</td>
                    <td>${user.rol || 'N/A'}</td>
                    <td>
                        <!-- Llamada a deleteUser con un ícono de basurero -->
                        <button class="delete-btn" onclick="deleteUser(${user.id})" aria-label="Eliminar usuario">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            console.error('Error al cargar los usuarios:', response.status);
        }
    } catch (error) {
        console.error('Error en loadUsers:', error);
    }
}

async function addUser(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const clave = document.getElementById('clave').value;
    const rol = document.getElementById('rol').value;

    const newUser = { nombre, correo, clave, rol };

    try {
        const response = await fetch('/booksWS/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        if (response.ok) {
            const usuarioGuardado = await response.json();
            showNotification('Usuario agregado con éxito', 'success');
            document.getElementById('userForm').reset();
            loadUsers();
        } else {
            showNotification('Error al agregar el usuario', 'error');
            console.error('Error en POST usuario:', response.status);
        }
    } catch (error) {
        showNotification('Error en la conexión', 'error');
        console.error('Error en addUser:', error);
    }
}

async function deleteUser(id) {
    if(!confirm("¿Seguro que deseas eliminar este usuario?")){
        return;
    }
    try {
        const response = await fetch(`/booksWS/api/usuarios/${id}`, {
            method: 'DELETE'
        });
        if(response.ok) {
            showNotification('Usuario eliminado con éxito', 'success');
            loadUsers();
        } else {
            showNotification('Error al eliminar el usuario', 'error');
            console.error('Error al eliminar:', response.status);
        }
    } catch (error) {
        showNotification('Error en la conexión', 'error');
        console.error('Error en deleteUser:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('usersBody')) {
        loadUsers();
    }
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', addUser);
    }
});
