function cargarMovimientos() {
    const listaUI = document.getElementById('listaTransacciones');
    const historial = JSON.parse(localStorage.getItem('historial')) || [];

    listaUI.innerHTML = "";

    if (historial.length === 0) {
        listaUI.innerHTML = '<li class="list-group-item text-center">No hay movimientos registrados</li>';
        return;
    }

    historial.forEach(mov => {
        const li = document.createElement('li');
        const color = mov.valor.includes('+') ? 'text-success' : 'text-danger';

        li.className = "list-group-item d-flex justify-content-between align-items-center mb-2";
        li.innerHTML = `
            <div>
                <strong>${mov.tipo}</strong><br>
                <small>${mov.fecha}</small>
            </div>
            <span class="${color}">${mov.valor}</span>
        `;
        listaUI.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', cargarMovimientos);
