document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    const submitBtn = document.getElementById('submit-btn');

    // Função para validar se todos os campos foram preenchidos
    function validateForm() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const purchase = document.getElementById('purchase').value;

        // Verificar se todos os campos estão preenchidos
        if (name && email && password && purchase) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    // Validar formulário ao digitar nos campos
    form.addEventListener('input', validateForm);

    // Evento de envio do formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio tradicional
        window.location.href = 'concluido.html'; // Redireciona para a página concluído
    });

    // Inicialmente, o botão "Confirmar" fica desabilitado
    submitBtn.disabled = true;
});