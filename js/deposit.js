const SALDO_INICIAL = 60000;
const depositForm = document.getElementById('depositForm');

depositForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const inputMonto = document.getElementById('depositAmount');
    const montoIngresado = parseFloat(inputMonto.value);

    if (montoIngresado > 0) {
        let saldoActual = parseFloat(localStorage.getItem('walletBalance')) || SALDO_INICIAL;
        let nuevoSaldo = saldoActual + montoIngresado;

        // Guardar saldo
        localStorage.setItem('walletBalance', nuevoSaldo);

        // Guardar movimiento
        const movimiento = {
            tipo: "Depósito realizado",
            valor: `+$${montoIngresado.toLocaleString()}`,
            fecha: new Date().toLocaleDateString()
        };

        let historial = JSON.parse(localStorage.getItem('historial')) || [];
        historial.unshift(movimiento);
        localStorage.setItem('historial', JSON.stringify(historial));

        window.dispatchEvent(new Event('saldoActualizado'));

        Swal.fire({
            title: "¡Éxito!",
            text: `Has depositado $${montoIngresado.toLocaleString()}`,
            icon: "success",
            iconColor: "#DF69FA",
            confirmButtonColor: "#7c3aed"
        }).then(() => {
            window.location.href = "menu.html";
        });

    } else {
        Swal.fire({
            title: "Error",
            text: "El monto debe ser mayor a cero",
            icon: "error",
            iconColor: "#2b0769",
            confirmButtonColor: "#7c3aed"
        });
    }
});
