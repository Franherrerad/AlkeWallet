const SALDO_INICIAL = 60000;


const actualizarSaldoUI = () => {
    const balanceDisplay = document.getElementById('balanceAmount');
    const saldo = localStorage.getItem('walletBalance') || SALDO_INICIAL;
    balanceDisplay.textContent = `$${parseFloat(saldo).toLocaleString()}`;
};

document.addEventListener('DOMContentLoaded', () => {

    
    $('.glass-card').hide().fadeIn(800);

    
    actualizarSaldoUI();

    
    const irA = (url, destino) => {
        Swal.fire({
            title: "Cargando...",
            text: `Redirigiendo a ${destino}`,
            icon: "info",
            iconColor: "#E3307D",
            timer: 1000,
            showConfirmButton: false,
            timerProgressBar: true,
            confirmButtonColor: "#7c3aed"
        }).then(() => {
            window.location.href = url;
        });
    };

    // Eventos de navegación
    document.getElementById('btnDeposit').addEventListener('click', e => {
        e.preventDefault();
        irA("deposit.html", "Depósitos");
    });

    document.getElementById('btnSend').addEventListener('click', e => {
        e.preventDefault();
        irA("sendmoney.html", "Transferencias");
    });

    document.getElementById('btnTransactions').addEventListener('click', e => {
        e.preventDefault();
        irA("transactions.html", "Movimientos");
    });
});


window.addEventListener('saldoActualizado', actualizarSaldoUI);
