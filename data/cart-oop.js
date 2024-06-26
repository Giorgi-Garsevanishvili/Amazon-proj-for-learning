import {validDeliveryOption} from './deliveryOptions.js';

function Cart (localStorageKey) {
  const cart = {
    cartItems: undefined,
  
    loadFromStorage() {
      this.cartItems = 
    JSON.parse(localStorage.getItem(localStorageKey)) ;
    
    if (!this.cartItems) {
      this.cartItems = [{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionsId: '1'
      }, {
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 2,
        deliveryOptionsId: '3'
      }];
    } 
    }, 
  
    calculateCartQuantity (){
      let cartQuantity = 0;
    
        this.cartItem.forEach((cartitem) => {
          cartQuantity += cartitem.quantity;
        });
        
        return cartQuantity;
    },
  
    saveToStorage (){
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
  
    addToCart(productId) {
      let matchingitem;
    
      this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId){
          matchingitem = cartItem;
        }
      });
  
      if (matchingitem){
        matchingitem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionsId : '1'
        });
      }
  
      this.saveToStorage();
  },
  
  removeFromCart(productId){
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });
  
    cart = newCart;
    this.saveToStorage();
  },
  
  updateQuantity (productId, newQuantity){
    let matchingItem;
  
   this.cartItems.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
   });
   matchingItem.quantity = newQuantity;
   
   this.saveToStorage();
  },
  
  deliveryOptionUpdate(productId, deliveryOptionId) {
    let matchingItem;
  
   this.cartItems.forEach((cartItem) => {
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
  this.saveToStorage(); 
  }
  
  
  };

  return cart;
};

const cart = Cart('cart-oop');
const businessCart = Cart('business-cart')

cart.loadFromStorage();
businessCart.loadFromStorage();



console.log(cart);
console.log(businessCart);
