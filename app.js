const products = [
    { id: 1, name: 'Product 1', price: 15, image: 'https://via.placeholder.com/200', category: 'under-20' },
    { id: 2, name: 'Product 2', price: 25, image: 'https://via.placeholder.com/200', category: '20-30' },
    { id: 3, name: 'Product 3', price: 35, image: 'https://via.placeholder.com/200', category: 'above-30' },
    { id: 4, name: 'Product 4', price: 20, image: 'https://via.placeholder.com/200', category: '20-30' },
    { id: 5, name: 'Product 5', price: 10, image: 'https://via.placeholder.com/200', category: 'under-20' }
];

let cart = [];

// Load Products when the page loads
window.onload = function() {
    displayProducts(products);  // Display all products initially
};

// Display Products on the page
function displayProducts(productList) {
    const productListElem = document.getElementById('product-list');
    productListElem.innerHTML = ''; // Clear previous products

    // Check if the product list is empty
    if (productList.length === 0) {
        productListElem.innerHTML = '<p>No products available in this category.</p>';
    } else {
        productList.forEach(product => {
            let productCard = document.createElement('div');
            productCard.classList.add('product');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Price: $${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productListElem.appendChild(productCard);
        });
    }
    productListElem.classList.add('show');  // Make sure products fade in
}

// Toggle Dark Mode
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Add to Cart Functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingProduct = cart.find(item => item.id === productId);
    
    if (existingProduct) {
        existingProduct.quantity++;  // If the product already exists in the cart, increase its quantity
    } else {
        cart.push({ ...product, quantity: 1 });  // Add new product to the cart with a quantity of 1
    }
    updateCart();  // Update the cart display
}

// Update Cart Count in Header
function updateCart() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);  // Calculate the total number of items in the cart
    document.getElementById('cart').innerHTML = `Cart (${cartCount})`;  // Display the cart count in the header
}

// Show Cart Modal
function showCart() {
    document.getElementById('cart-modal').classList.add('show');  // Open the cart modal
    displayCartItems();  // Display the items currently in the cart
}

// Close Cart Modal
function closeCart() {
    document.getElementById('cart-modal').classList.remove('show');  // Close the cart modal
}

// Display Cart Items in the Modal
function displayCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';  // Clear the previous cart items
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';  // Display message if cart is empty
    } else {
        cart.forEach(item => {
            let listItem = document.createElement('li');
            listItem.innerHTML = `
                ${item.name} - $${item.price} 
                <button onclick="decreaseQuantity(${item.id})">-</button> ${item.quantity} 
                <button onclick="increaseQuantity(${item.id})">+</button>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartItems.appendChild(listItem);
            total += item.price * item.quantity;  // Calculate the total price
        });
    }

    document.getElementById('cart-total').innerText = total;  // Update the total price in the modal
}

// Increase Quantity of Item in Cart
function increaseQuantity(productId) {
    const product = cart.find(p => p.id === productId);
    product.quantity++;
    displayCartItems();  // Update the cart modal with new quantities
    updateCart();  // Update the cart count in the header
}

// Decrease Quantity of Item in Cart
function decreaseQuantity(productId) {
    const product = cart.find(p => p.id === productId);
    if (product.quantity > 1) {
        product.quantity--;  // Decrease the quantity if greater than 1
    } else {
        removeFromCart(productId);  // If quantity is 1, remove the item from the cart
    }
    displayCartItems();  // Update the cart modal
    updateCart();  // Update the cart count in the header
}

// Remove Item from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);  // Remove the item from the cart
    displayCartItems();  // Update the cart modal
    updateCart();  // Update the cart count in the header
}
