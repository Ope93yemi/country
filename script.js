
document.querySelectorAll('.addtoCartBtn').forEach(button => {
    button.addEventListener('click', (e) => {
        const productDetails = e.target.closest('.details');
        const productName = productDetails.querySelector('h3').textContent;
        const productPrice = parseFloat(productDetails.querySelector('h4').textContent.replace('$', ''));
        const productImage = productDetails.querySelector('img').src;

        addToCart(productName, productPrice, productImage);

    });
});


let cart = []; 


function addToCart(productName, productPrice, productImage) {
    const existingItem = cart.find(item => item.name === productName);
    document.querySelector('.container2').style.display = 'none';
    const container3 = document.querySelector('.container3');
    container3.style.display = 'block';
    if (existingItem) {
        // If item is already in the cart, increase the quantty
        existingItem.quantity += 1;
    } else {
        // Add new item to the cart
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1,
            image: productImage
        });
    }
    updateCartDisplay();
}


function updateCartDisplay() {
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart_change').textContent = `(${cartCount})`;

    const totalOrder = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    document.getElementById('totalOrder').textContent = totalOrder.toFixed(2);


    const productList = document.querySelector('.listProduct');
    productList.innerHTML = ''; 
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.name} <br> ${item.quantity}x  @$${item.price.toFixed(2)} 
        `;
        productList.appendChild(listItem);
    });

}


document.getElementById('confirmOrder').addEventListener('click', confirmOrder);

function confirmOrder() {
    document.querySelector('.container3').style.display = 'none';
    const container4 = document.querySelector('.container4');
    container4.style.display = 'flex';

    const productOrders = container4.querySelector('.productOrders');
    productOrders.innerHTML = ''; 

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${item.image}" width="30px" alt="${item.name}">
            ${item.name} <br> ${item.quantity}x @$${item.price.toFixed(2)} 
        `;
        productOrders.appendChild(listItem);
    });

    const finalPriceSpan = container4.querySelector('.finalPrice');
    const totalOrder = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    finalPriceSpan.textContent = totalOrder.toFixed(2);
}



document.addEventListener('click', function(e) {
    if (e.target.closest('.increment')) {
        const productName = e.target.closest('.details').querySelector('h3').textContent;
        addToCart(productName);
    } else if (e.target.closest('.decrement')) {
        const productName = e.target.closest('.details').querySelector('h3').textContent;
        removeFromCart(productName); 
    }
});


function removeFromCart(productName) {
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
            cart = cart.filter(item => item.name !== productName); 
        }
        updateCartDisplay(productName);
    }
}


document.getElementById('newOrder').addEventListener('click', newOrder);


function newOrder() {
    cart = []; // Clear the cart
    updateCartDisplay(); 

    const container2 = document.querySelector('.container2');
    container2.style.display = 'block';
    document.querySelector('.container4').style.display = 'none';
}