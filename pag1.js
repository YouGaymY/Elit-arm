document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('address-form');
    const confirmBtn = document.getElementById('confirm-btn');
    const inputs = form.querySelectorAll('input');

    // Função para validar se todos os campos estão preenchidos corretamente
    function validateForm() {
        let allFilled = true;

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                allFilled = false;
            }
        });

        // Valida o CEP (apenas números e exatamente 8 dígitos)
        const cep = document.getElementById('cep');
        if (!/^\d{8}$/.test(cep.value)) {
            allFilled = false;
        }

        // Valida o Número da casa (apenas números e até 4 dígitos)
        const numero = document.getElementById('numero');
        if (!/^\d{1,4}$/.test(numero.value)) {
            allFilled = false;
        }

        // Habilita ou desabilita o botão de confirmação
        confirmBtn.disabled = !allFilled;
    }

    // Aplica a validação sempre que houver mudança nos inputs
    inputs.forEach(input => {
        input.addEventListener('input', validateForm);
    });

    // Evento de envio do formulário
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio tradicional
        // Redireciona para a próxima página (pag2.html) após o sucesso
        window.location.href = 'pag2.html';
    });
});