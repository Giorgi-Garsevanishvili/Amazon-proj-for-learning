import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import '../data/cart-class.js';
import '../data/car.js';
import { loadCart } from "../data/cart.js";

async function loadPage () {
  await loadProductsFetch();

  await new Promise((resolve) => {
        loadCart(() => {
          resolve();
        });
      })

      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
}

loadPage()



// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   })

// ]).then(() => {
//   renderCheckoutHeader();
//   renderOrderSummary();
//   renderPaymentSummary();
// });


/*
loadProducts(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/
