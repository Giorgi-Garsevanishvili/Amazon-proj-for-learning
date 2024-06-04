import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import '../data/cart-class.js';
import '../data/car.js';

renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();
