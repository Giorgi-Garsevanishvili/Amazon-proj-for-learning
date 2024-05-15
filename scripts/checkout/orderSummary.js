import {cart ,removeFromCart, calculateCartQuantity, updateQuantity, deliveryOptionUpdate} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import { formatCurency } from '../utils/money.js';
import {calculateDeliveryDate, deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';



export function renderOrderSummary()
 {
  updateCartQuantity();


  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionsId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);



    cartSummaryHTML += `
      <div class="cart-item-container 
      js-cart-item-container
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="js-product-name-${matchingProduct.id} product-name">
            ${matchingProduct.name}
          </div>
          <div class="js-product-price-${matchingProduct.id} product-price">
            $${formatCurency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity js-product-quantity-${matchingProduct.id}">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
            <span class="
            js-delete-link-${matchingProduct.id} 
            delete-quantity-link link-primary js-delete-link " data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>
        <div class="delivery-options">
          <div class="delivery-options-title">
          Choose a delivery option:
          </div>
        ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
  </div>
    `;
  });

  function deliveryOptionsHTML (matchingProduct, cartItem){
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);

        const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurency(deliveryOption.priceCents)} -`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;

        html += `
      <div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" 
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input" 
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price" checked>
            ${priceString} Shipping
          </div> 
        </div>
      </div>
    `});
    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      renderCheckoutHeader();
      updateCartQuantity();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  function updateCartQuantity (){
    const cartQuantity =  calculateCartQuantity();

      document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
  }

  updateCartQuantity();

  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    });
  });


  document.querySelectorAll('.js-save-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      

      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

      const newQuantity = Number(quantityInput.value);

      if (newQuantity < 0 || newQuantity >= 1000){
        alert('Quantity must be at least 0 and less than 1000')
        return;
      }

      updateQuantity(productId, newQuantity);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');

      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
      quantityLabel.innerHTML = newQuantity;

      renderPaymentSummary();
      updateCartQuantity();
    });

    const quantityInput = link.closest('.cart-item-container').querySelector('.js-quantity-input-' + link.dataset.productId); 
  quantityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      link.click();
    }
  });  
  });


  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {

      element.addEventListener('click',() => {
        const {productId, deliveryOptionId} = element.dataset;
        deliveryOptionUpdate(productId, deliveryOptionId);
        renderPaymentSummary();
        renderOrderSummary();
      });
    });
  };

 