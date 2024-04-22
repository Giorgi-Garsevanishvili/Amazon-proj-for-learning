export const cart = [];

export function addToCart(productId) {
  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = Number(quantitySelector.value);
      let matchingitem;
    
      cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
          matchingitem = cartItem;
        }
      });

      if (matchingitem){
        matchingitem.quantity += quantity;
      } else {
        cart.push({
          productId,
          quantity 
        });
      }
}