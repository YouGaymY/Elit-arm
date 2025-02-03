function copyPixKey() {
    const pixKey = "exemplo@pix.com"; // Substitua pela sua chave Pix
    navigator.clipboard.writeText(pixKey).then(function() {
        alert("Chave Pix copiada para a área de transferência!");
    }).catch(function() {
        alert("Erro ao copiar a chave Pix.");
    });
}