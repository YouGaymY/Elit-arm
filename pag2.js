document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('payment-form');
    const confirmBtn = document.getElementById('confirm-btn');
    const valorInput = document.getElementById('valor');
    const errorMessage = document.getElementById('error-message');

    // Lista de valores aceitos e páginas correspondentes
    const pagamentos = {
        "59,99": "pix1.html",
        "329,99": "pix2.html",
        "402,50": "pix3.html",
        "85,00": "pix4.html",
        "250,90": "pix5.html",
        "99,99": "pix6.html",
        "69,00": "pix7.html",
        "159,99": "pix8.html",
        "121,90": "pix9.html",
        "189,00": "pix10.html"
    };

    // Validação do formato do valor
    function validarValor() {
        const valor = valorInput.value.trim();
        const regex = /^\d{1,3},\d{2}$/; // Formato correto: 999,99
        confirmBtn.disabled = !regex.test(valor);
    }

    // Evento para validar entrada do usuário
    valorInput.addEventListener('input', validarValor);

    // Evento de envio do formulário
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const valor = valorInput.value.trim();

        if (pagamentos.hasOwnProperty(valor)) {
            window.location.href = pagamentos[valor]; // Redireciona para a página correta
        } else {
            errorMessage.textContent = "Não temos produtos com esse valor.";
        }
    });
});