document.addEventListener("DOMContentLoaded", function() {
    // Lógica de la barra de búsqueda
    const searchIcon = document.querySelector(".search-icon");
    const searchBar = document.querySelector(".search-bar");
    const searchInput = document.querySelector(".search-bar input");

    if (searchIcon && searchBar && searchInput) {
        searchIcon.addEventListener("click", function(event) {
            event.preventDefault();
            event.stopPropagation();
            searchBar.style.display = searchBar.style.display === "none" ? "block" : "none";
            if (searchBar.style.display === "block") {
                searchInput.focus();
            }
        });

        document.addEventListener("click", function(event) {
            if (!searchBar.contains(event.target) && searchBar.style.display === "block") {
                searchBar.style.display = "none";
            }
        });

        searchBar.addEventListener("click", function(event) {
            event.stopPropagation();
        });
    }

    // Lógica del carrito de compras
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productContainer = event.target.closest('.card-article');
                const productId = productContainer.getAttribute('data-id');
                const productName = productContainer.querySelector('.card-title').textContent;
                const productPrice = productContainer.querySelector('.card-price').textContent;
                const productImage = productContainer.querySelector('.card-image').src;

                console.log('Product ID:', productId);
                console.log('Product Name:', productName);
                console.log('Product Price:', productPrice);
                console.log('Product Image:', productImage);

                const product = {
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage
                };

                addToCart(product);
            });
        });
    } else {
        console.error("No se encontraron botones de 'Añadir' en la página.");
    }

    function addToCart(product) {
        let cart = localStorage.getItem('cart');
        cart = cart ? JSON.parse(cart) : [];

        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} añadido al carrito`);
    }
});
