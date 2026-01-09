const SALDO_INICIAL = 60000;

const guardarContacto = contacto => {
    let agenda = JSON.parse(localStorage.getItem('agendaContactos')) || [];
    agenda.push(contacto);
    localStorage.setItem('agendaContactos', JSON.stringify(agenda));
};

const renderizarContacto = c => {
    const lista = document.getElementById('contactList');
    const li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
        <div>
            <strong>${c.nombre}</strong><br>
            <small>CBU: ${c.cbu} | Alias: ${c.alias} | Banco: ${c.banco}</small>
        </div>
        <input type="radio" name="contactSelect" value="${c.nombre}">
    `;
    lista.appendChild(li);
};

const cargarContactos = () => {
    const agenda = JSON.parse(localStorage.getItem('agendaContactos')) || [];
    agenda.forEach(renderizarContacto);
};

document.getElementById('btnAddContact').onclick = async () => {
    const { value: form } = await Swal.fire({
        title: 'Nuevo Contacto',
        html: `
            <input id="n-name" class="swal2-input" placeholder="Nombre">
            <input id="n-cbu" class="swal2-input" placeholder="CBU">
            <input id="n-alias" class="swal2-input" placeholder="Alias">
            <input id="n-bank" class="swal2-input" placeholder="Banco">`,
        showCancelButton: true,
        confirmButtonColor: "#7c3aed",
        preConfirm: () => ({
            nombre: document.getElementById('n-name').value,
            cbu: document.getElementById('n-cbu').value,
            alias: document.getElementById('n-alias').value,
            banco: document.getElementById('n-bank').value
        })
    });

    if (form && form.nombre) {
        guardarContacto(form);
        renderizarContacto(form);
        Swal.fire("Éxito", "Contacto guardado", "success");
    }
};

document.getElementById('btnSendMoney').onclick = async () => {
    const seleccionado = document.querySelector('input[name="contactSelect"]:checked');
    if (!seleccionado) {
        return Swal.fire("Error", "Selecciona un contacto", "error");
    }

    const { value: monto } = await Swal.fire({
        title: `Enviar a ${seleccionado.value}`,
        input: 'number',
        inputLabel: 'Monto',
        showCancelButton: true,
        confirmButtonColor: "#7c3aed"
    });

    if (monto > 0) {
        let saldoActual = parseFloat(localStorage.getItem('walletBalance')) || SALDO_INICIAL;

        if (monto > saldoActual) {
            Swal.fire("Error", "Saldo insuficiente", "error");
        } else {
            // Guardar saldo
            localStorage.setItem('walletBalance', saldoActual - monto);

            // Guardar historial
            const mov = {
                tipo: `Envío a ${seleccionado.value}`,
                valor: `-$${parseFloat(monto).toLocaleString()}`,
                fecha: new Date().toLocaleDateString()
            };

            let historial = JSON.parse(localStorage.getItem('historial')) || [];
            historial.unshift(mov);
            localStorage.setItem('historial', JSON.stringify(historial));

            window.dispatchEvent(new Event('saldoActualizado'));

            Swal.fire("Éxito", "Transferencia realizada", "success")
                .then(() => window.location.href = "menu.html");
        }
    }
};

document.addEventListener('DOMContentLoaded', cargarContactos);
