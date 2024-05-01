import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();