let cart = JSON.parse(localStorage.getItem('cart')) || []; // Recupera o carrinho do localStorage, se existir
const cartCount = document.querySelector('#cart-count');
const cartContainer = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');
const continueContainer = document.querySelector('#continue-container');
const continueButton = document.querySelector('#continue-btn'); // Botão de continuar

let selectedProductIndex = null; // Índice do produto selecionado

// Função para atualizar a contagem de itens no carrinho
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Função para atualizar o total com base no produto selecionado
function updateCartTotal() {
    if (selectedProductIndex !== null) {
        let selectedItem = cart[selectedProductIndex];
        let total = parseFloat(selectedItem.price.replace('R$ ', '').replace(',', '.'));
        cartTotal.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
    } else {
        cartTotal.textContent = "Total: R$ 0,00";
    }
}

// Função para renderizar os itens no carrinho
function renderCartItems() {
    cartContainer.innerHTML = ''; // Limpa o carrinho antes de renderizar

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        // Criação do elemento de checkbox para seleção única
        const selectItem = document.createElement('div');
        selectItem.classList.add('select-item');
        selectItem.dataset.index = index; // Adiciona um índice para identificação

        // Define o estado inicial do item selecionado
        if (index === selectedProductIndex) {
            selectItem.classList.add('selected');
        }

        // Evento para selecionar apenas um item por vez
        function selectProduct() {
            document.querySelectorAll('.select-item').forEach(el => el.classList.remove('selected'));
            selectItem.classList.add('selected');
            selectedProductIndex = index;

            // Atualiza o total e o botão "Continuar"
            updateCartTotal();
            continueButton.href = `pag1.html?produto=${encodeURIComponent(item.name)}`;
            continueContainer.style.display = 'block';
        }

        // Permite que o usuário clique no produto ou no quadrado para selecionar
        selectItem.addEventListener('click', selectProduct);
        cartItem.addEventListener('click', selectProduct);

        // Criação do HTML do produto no carrinho
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price}</div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">Excluir</button>
        `;

        // Adiciona o checkbox de seleção ao lado da imagem
        const productContainer = document.createElement('div');
        productContainer.classList.add('product-container');
        productContainer.appendChild(selectItem);
        productContainer.appendChild(cartItem);

        cartContainer.appendChild(productContainer);
    });

    updateCartTotal();
    updateCartCount();
}

// Função para remover um produto do carrinho
function removeFromCart(index) {
    cart.splice(index, 1); // Remove o item do carrinho
    localStorage.setItem('cart', JSON.stringify(cart)); // Atualiza o carrinho no localStorage

    // Se o produto removido for o selecionado, desativa a seleção
    if (selectedProductIndex === index) {
        selectedProductIndex = null;
        continueContainer.style.display = 'none';
    }

    renderCartItems(); // Re-renderiza os itens do carrinho
}

// Função para adicionar produtos ao carrinho ao clicar no botão "Comprar"
function addToCart(image, name, price) {
    // Cria um novo item do carrinho
    const newItem = {
        image: image,
        name: name,
        price: price
    };

    // Adiciona o item ao carrinho
    cart.push(newItem);
    
    // Atualiza o carrinho no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Atualiza a contagem de itens no carrinho e renderiza os itens
    updateCartCount();
    renderCartItems();
}

// Adiciona os produtos ao carrinho ao clicar no botão "Comprar"
const productButtons = document.querySelectorAll('.product-horizontal button');
productButtons.forEach(button => {
    button.addEventListener('click', function() {
        const product = button.closest('.product-horizontal');
        const image = product.querySelector('img').src;
        const name = product.querySelector('h3').textContent;
        const price = product.querySelector('p').textContent;

        // Verifica se as informações estão sendo capturadas corretamente
        console.log("Imagem: ", image);
        console.log("Nome: ", name);
        console.log("Preço: ", price);

        // Adiciona o produto ao carrinho
        addToCart(image, name, price);
    });
});

// Renderiza os itens ao carregar a página
renderCartItems();