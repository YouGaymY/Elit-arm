document.addEventListener('DOMContentLoaded', function() {
    // A animação de carregamento dura 5 segundos (5000ms)
    setTimeout(function() {
        // Esconde o ícone de carregamento
        document.getElementById('loading-icon').style.display = 'none';
        
        // Exibe o ícone de check
        let checkIcon = document.createElement('div');
        checkIcon.className = 'check-icon';
        checkIcon.innerHTML = '✔'; // Símbolo de check
        document.querySelector('.loading-container').appendChild(checkIcon);

        // Muda o texto para "Cadastro concluído com sucesso"
        document.getElementById('status-text').innerText = "Cadastro concluído com sucesso!";
        
        // Exibe o ícone de check
        checkIcon.style.display = 'block';

        // Após 3 segundos, redireciona para a página index.html
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 3000); // 3 segundos após o símbolo de conferência

    }, 5000); // 5 segundos de animação
});