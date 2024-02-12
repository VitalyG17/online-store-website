/*****Cart*****/
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// Open
cartIcon.onclick = () => {
  cart.classList.add('active');
};
// Close
closeCart.onclick = () => {
  cart.classList.remove('active');
};

// Checking page loading
document.readyState == 'loading'
  ? document.addEventListener('DOMContentLoaded', ready)
  : ready();

function ready() {
  formatingPriceCard()
  let removeCartButtons = document.getElementsByClassName('cart-remove');
  console.log(removeCartButtons);
  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener('click', removeCartItem);
  }
  let quantityInputs = document.getElementsByClassName('cart-quantity');
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener('change', ChekingQuantityChanged);
  }
}

//Сhecking data, calling price update
function ChekingQuantityChanged(event) {
  let input = event.target;
  if (input.value == NaN || input.value <= 0) input.value = 1;
  updateTotalPrice();
}

// Removing a button element
function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotalPrice();
}

// Update total price
function updateTotalPrice() {
  let cartContent = document.getElementsByClassName('cart-content')[0];
  let cartBoxes = cartContent.getElementsByClassName('cart-box');
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName('price')[0];
    let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    let price = parseFloat(priceElement.innerText.replace(/\s/g, ''));
    let quantity = quantityElement.value;
    total += price * quantity;
  }
  // Total price display formatting
  let formattedTotal = total.toLocaleString('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  document.getElementsByClassName('total-price')[0].innerText =
    formattedTotal + ' ₽';
}

// Price products card formatting
function formatingPriceCard() {
  let prices = document.querySelectorAll('.price');
  prices.forEach((price) => {
    let value = parseFloat(price.innerText.replace(' ₽', ''));
    price.innerText = value.toLocaleString('ru-RU') + ' ₽';
  });
}