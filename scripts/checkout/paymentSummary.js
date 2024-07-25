import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurency } from "../utils/money.js";
import { cart } from '../../data/cart-class.js'
import { addOrder } from "../../data/orders.js";


 
 
 export function renderPaymentSummary (){

  let productPriceCents = 0;
  let ShippingPriceCents = 0;

  cart.cartItems.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);
    ShippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + ShippingPriceCents; 
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  let cartQuantity = 0;

  cart.cartItems.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  const paymentSummaryHTML = `
      <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div class="js-item-cart">Items (${cartQuantity}):</div>
      <div class="payment-summary-money">$${formatCurency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-payment-summary-shipping">$${formatCurency(ShippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-payment-summary-total">$${formatCurency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
    </div>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order').addEventListener('click', async () => {

    try {
      const response = await fetch('https://supersimplebackend.dev/orders', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });
  
       const order = await response.json();
       addOrder(order);

      } catch {
        console.log('Unexpected Error. Try again later.')
      }

      window.location.href = 'orders.html'
  });
}

