let cart = JSON.parse(localStorage.getItem('cart')) || []; // Recupera o carrinho do localStorage
const cartCount = document.querySelector('#cart-count'); // Contador de itens no carrinho
const cartContainer = document.querySelector('#cart-container'); // Container do carrinho

// Função para atualizar o contador do carrinho
function updateCartCount() {
    cartCount.textContent = cart.length; // Atualiza o número no carrinho
    if (cart.length === 0) {
        document.getElementById('cart-count-container').style.display = 'none'; // Esconde bolinha se estiver vazio
    } else {
        document.getElementById('cart-count-container').style.display = 'block'; // Exibe bolinha se houver itens
    }
}

// Verifica em qual página estamos
const currentPage = window.location.pathname.split('/').pop();

// Se estamos na página index.html, mostramos a bolinha, mas só se houver itens no carrinho
if (currentPage === "index.html") {
    updateCartCount(); // Atualiza o contador do carrinho na página index.html
}

// Se estamos na página carrinho.html, escondemos a bolinha
if (currentPage === "carrinho.html") {
    document.getElementById('cart-count-container').style.display = 'none';
}

// Função para adicionar produto ao carrinho
function addToCart(product) {
    cart.push(product); // Adiciona produto ao carrinho
    localStorage.setItem('cart', JSON.stringify(cart)); // Atualiza o carrinho no localStorage
    updateCartCount(); // Atualiza o contador
    animateProductToCart(product); // Animação de produto indo para o carrinho
}

// Função para animar o produto indo para o carrinho
function animateProductToCart(product) {
    const productClone = product.cloneNode(true);
    document.body.appendChild(productClone);
    productClone.style.position = 'absolute';
    productClone.style.transition = 'transform 0.5s ease';

    // Posição inicial
    const rect = product.getBoundingClientRect();
    productClone.style.top = `${rect.top}px`;
    productClone.style.left = `${rect.left}px`;

    // Após 10ms, anima o produto para o carrinho
    setTimeout(() => {
        const cartRect = document.getElementById('cart-count-container').getBoundingClientRect();
        productClone.style.transform = `translate(${cartRect.left - rect.left}px, ${cartRect.top - rect.top}px)`; // Animação para o carrinho
    }, 10);

    // Após 1 segundo, remove o clone
    setTimeout(() => {
        productClone.remove();
    }, 1000);
}

// Adiciona evento de clique para o botão "Comprar" dos produtos de airsoft
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const product = e.target.closest('.product');
        const productName = product.querySelector('.product-name').textContent;
        const productPrice = product.querySelector('.product-price').textContent;
        const productImage = product.querySelector('img').src;

        const productInfo = {
            name: productName,
            price: productPrice,
            image: productImage
        };

        addToCart(productInfo); // Adiciona o produto ao carrinho
    });
});

// Adiciona evento de clique para o botão "Comprar" dos produtos da seção de gel (horizontal)
document.querySelectorAll('.product-horizontal .add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const product = e.target.closest('.product-horizontal');
        const productName = product.querySelector('h3').textContent;
        const productPrice = product.querySelector('p').textContent;
        const productImage = product.querySelector('img').src;

        const productInfo = {
            name: productName,
            price: productPrice,
            image: productImage
        };

        addToCart(productInfo); // Adiciona o produto de gel ao carrinho
    });
});

// Atualiza o contador quando a página carrega
window.onload = updateCartCount;