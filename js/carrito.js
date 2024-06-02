document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card-article');
            const product = {
                id: card.getAttribute('data-id'),
                name: card.querySelector('.card-title').innerText,
                price: card.querySelector('.card-price').innerText,
                image: card.querySelector('.card-image').src,
                paymentButton: card.querySelector('.payment-button-container').innerHTML
            };
            addToCart(product);
        });
    });

    function addToCart(product) {
        let cart = localStorage.getItem('cart');
        cart = cart ? JSON.parse(cart) : [];

        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            product.quantity = 1;
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }

    function loadCart() {
        let cart = localStorage.getItem('cart');
        cart = cart ? JSON.parse(cart) : [];

        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center">El carrito está vacío.</p>';
            return;
        }

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item', 'list-group-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Precio: ${item.price}</p>
                    ${item.paymentButton}
                </div>
                <div class="cart-item-quantity">
                    <span>Cantidad: ${item.quantity}</span>
                </div>
            `;

            cartItemsContainer.appendChild(itemElement);
        });
    }

    document.getElementById('empty-cart').addEventListener('click', function() {
        localStorage.removeItem('cart');
        loadCart();
    });

    loadCart();
});


/* 
// Integración con MercadoPago
const mp = new MercadoPago('TEST-ac5d7020-d41e-4cda-88a7-8b3c2ebf44e6', {
    locale: 'es-AR'
});

document.getElementById("buy-cart").addEventListener("click", async () => {
    try {
        // Recuperar el carrito del localStorage
        let cart = localStorage.getItem('cart');
        cart = cart ? JSON.parse(cart) : [];

        // Crear datos de la orden
        const orderData = cart.map(item => ({
            title: item.name,
            quantity: item.quantity,
            price: item.price
        }));

        const response = await fetch("http://localhost:3000/create_preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData)
        });

        const preference = await response.json();
        createCheckoutButton(preference.id);

    } catch (error) {
        alert("Error :(");
    }
});

const createCheckoutButton = (preferenceId) => {
    const bricksBuilder = mp.bricks();

    const renderComponent = async () => {
        if (window.CheckoutButton) window.CheckoutButton.unmount();
        await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId,
            },
        });
    };

    renderComponent();
};
 */