document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    
    const validEmail = "usuario@wallet.com";
    const validPass = "1234";

    if (email === validEmail && pass === validPass) {
        
        Swal.fire({
            title: "¡Bienvenido!",
            text: "Credenciales correctas, ingresando a tu billetera...",
            icon: "success",
            iconColor: "#DF69FA",
            confirmButtonColor: "#dc78d7ff",
        
            confirmButtonText: "Ir al Menú"
        }).then((result) => {
            
            if (result.isConfirmed) {
                window.location.href = "menu.html";
            }
        });

    } else {
        // Alerta de Error
        Swal.fire({
            title: "Error",
            text: "El correo o la contraseña no coinciden.",
            icon: "error",
            iconColor: "#2b0769",
            confirmButtonColor: "#dc78d7ff"
        });
        
        document.getElementById('password').value = "";
    }
});