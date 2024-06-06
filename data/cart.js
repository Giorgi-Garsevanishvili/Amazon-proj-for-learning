import {validDeliveryOption} from './deliveryOptions.js';

export let cart;

loadFromStorage();

export function loadFromStorage () {
  cart = 
JSON.parse(localStorage.getItem('cart')) ;

if (!cart) {
  cart = [{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 1,
    deliveryOptionsId: '1'
  }, {
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 2,
    deliveryOptionsId: '3'
  }];
} 
}

export function calculateCartQuantity (){
  let cartQuantity = 0;

    cart.forEach((cartitem) => {
      cartQuantity += cartitem.quantity;
    });
    
    return cartQuantity;
};

export function saveToStorage (){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
      let matchingitem;
    
      cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
          matchingitem = cartItem;
        }
      });

      if (matchingitem){
        matchingitem.quantity += 1;
      } else {
        cart.push({
          productId: productId,
          quantity: 1,
          deliveryOptionsId : '1'
        });
      }

      saveToStorage();
}

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}

export function updateQuantity (productId, newQuantity){
  let matchingItem;

 cart.forEach((cartItem) => {
  if(productId === cartItem.productId){
    matchingItem = cartItem;
  }
 });
 matchingItem.quantity = newQuantity;
 
 saveToStorage();
};

export function deliveryOptionUpdate (productId, deliveryOptionId) {
  let matchingItem;

 cart.forEach((cartItem) => {
  if(productId === cartItem.productId){
    matchingItem = cartItem;
  }
 });

 if (!matchingItem) {
  return;
}

if (!validDeliveryOption(deliveryOptionId)) {
  return;
}

matchingItem.deliveryOptionsId = deliveryOptionId;
saveToStorage(); 
} 

export function loadCart(fun){

  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
   console.log('load')
    fun();
  });
 
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
};