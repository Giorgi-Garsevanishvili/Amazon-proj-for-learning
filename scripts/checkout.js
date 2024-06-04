import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import '../data/cart-class.js';
import '../data/car.js';

loadProducts(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

