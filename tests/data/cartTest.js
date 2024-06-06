import { cart } from "../../data/cart-class.js";

describe('test suite: addToCart', () => {

  let quantitySelectorMock;

  beforeEach(() => {
    // Create a mock for the quantity selector
    quantitySelectorMock = jasmine.createSpyObj('HTMLInputElement', ['value']);
    quantitySelectorMock.value = '1'; // Mock the value as 1
    spyOn(document, 'querySelector').and.returnValue(quantitySelectorMock);
  });
  
 it('adds an existing product to the cart', () => {
  spyOn(localStorage, 'setItem');
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionsId: '1'
    }];
  
  cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  expect(cart.cartItems.length).toEqual(1);
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionsId: '1'
  }]));
  expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  expect(cart.cartItems[0].quantity).toEqual(2);
 });

 it('adds the new product to the cart', () => {
  spyOn(localStorage, 'setItem');
  cart.cartItems = [];

  cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  expect(cart.cartItems.length).toEqual(1);
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  expect(cart.cartItems[0].quantity).toEqual(1);
  
 });
});

describe('test tuite: removeFromCart', () => {
  it('remove a product that is in the cart', () => {
    spyOn(localStorage, 'setItem');
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionsId: '1'
    }];
    cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([]));
  });

  it('remove a productId that is not in the cart', () => {
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionsId: '1'
    }];
    spyOn(localStorage, 'setItem');

   

    cart.removeFromCart('does not exist');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionsId: '1'
    }]));
  });
});

describe('test suite: updateDeliveryOption', () => {

  it('update the delivery option of a product in a cart', () => {
    spyOn(localStorage, 'setItem');
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionsId: '1'
    }];
    

    cart.deliveryOptionUpdate('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionsId).toEqual('3');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionsId: '3'
    }]));
  });

  it('does nothing if the product is not in the cart', () => {
    spyOn(localStorage, 'setItem');
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionsId: '1'
    }];
    
  

    cart.deliveryOptionUpdate('does-not-exist', '3');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1)
    expect(cart.cartItems[0].deliveryOptionsId).toEqual('1')
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it('does nothing if the delivery option does not exist', () => {
    spyOn(localStorage, 'setItem');
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionsId: '1'
    }];
    

    cart.deliveryOptionUpdate('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 'does-not-exist')
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionsId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});