export const cart = [{
  productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
}];

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