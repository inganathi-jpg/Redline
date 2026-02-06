document.addEventListener('DOMContentLoaded', () => {
  let cart = [];

  // POPUPS
  const policyPopup = document.getElementById('policyPopup');
  const paymentPopup = document.getElementById('paymentPopup');

  policyPopup.style.display = 'flex';

  const acceptPolicy = document.getElementById('acceptPolicy');
  const declinePolicy = document.getElementById('declinePolicy');
  const closePayment = document.getElementById('closePayment');

  acceptPolicy.addEventListener('click', () => {
    policyPopup.style.display = 'none';
    paymentPopup.style.display = 'flex';
  });

  declinePolicy.addEventListener('click', () => {
    policyPopup.style.display = 'none';
  });

  closePayment.addEventListener('click', () => {
    paymentPopup.style.display = 'none';
  });

  // ADD TO ORDER BUTTONS
  const addButtons = document.querySelectorAll('.product button');
  addButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productDiv = button.closest('.product');
      const name = productDiv.querySelector('h3').textContent;
      const size = productDiv.querySelector('select').value;

      if (!size) {
        alert("Please select a size.");
        return;
      }

      cart.push({ name, size });
      updateCart();
    });
  });

  function updateCart() {
    const cartList = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    cartList.innerHTML = '';

    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} | Size ${item.size}`;
      cartList.appendChild(li);
    });

    let total = cart.length * 550;
    if (cart.length === 2) total = 850;
    if (cart.length === 4) total = 1700;

    totalPrice.textContent = `Total: R${total}`;
  }

  // CHECKOUT
  window.checkout = function() {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    let message = "Hello, I would like to order:%0A%0A";
    cart.forEach(item => {
      message += `• ${item.name} (Size ${item.size})%0A`;
    });
    message += `%0ATotal: ${document.getElementById('totalPrice').textContent}`;

    window.open("https://wa.me/27827640601?text=" + message, "_blank");
  }
});
