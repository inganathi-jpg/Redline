document.addEventListener('DOMContentLoaded', () => {
  let cart = [];

  // POPUPS
  const policyPopup = document.getElementById('policyPopup');
  const paymentPopup = document.getElementById('paymentPopup');

  policyPopup.style.display = 'flex';

  document.getElementById('acceptPolicy').onclick = () => {
    policyPopup.style.display = 'none';
    paymentPopup.style.display = 'flex';
  };

  document.getElementById('declinePolicy').onclick = () => {
    policyPopup.style.display = 'none';
  };

  document.getElementById('closePayment').onclick = () => {
    paymentPopup.style.display = 'none';
  };

  // ADD TO CART
  document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', () => {
      const product = button.closest('.product');
      const name = product.querySelector('h3').textContent;
      const size = product.querySelector('select').value;

      if (!size) {
        alert('Please select a size.');
        return;
      }

      cart.push({ name, size });
      updateCart();
    });
  });

  // SPECIAL PRICING LOGIC
  function updateCart() {
    const list = document.getElementById('cartItems');
    const totalEl = document.getElementById('totalPrice');

    list.innerHTML = '';

    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} | Size ${item.size}`;
      list.appendChild(li);
    });

    const totalItems = cart.length;
    const pairs = Math.floor(totalItems / 2);
    const singles = totalItems % 2;

    const total = (pairs * 850) + (singles * 550);
    totalEl.textContent = `Total: R${total}`;
  }

  // WHATSAPP CHECKOUT
  window.checkout = function () {
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    let message = 'Hello, I would like to order:%0A%0A';
    cart.forEach(item => {
      message += `• ${item.name} (Size ${item.size})%0A`;
    });

    message += `%0A${document.getElementById('totalPrice').textContent}`;

    window.open(
      'https://wa.me/27827640601?text=' + message,
      '_blank'
    );
  };

  // SEARCH FUNCTION
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase();
    document.querySelectorAll('.product').forEach(product => {
      const name = product.querySelector('h3').textContent.toLowerCase();
      product.style.display = name.includes(value) ? 'block' : 'none';
    });
  });
});
