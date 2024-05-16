import { addToCart, cart, loadFromStorage, removeFromCart, deliveryOptionUpdate } from "../../data/cart.js";


describe('test suite: addToCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });
  
 it('adds and existing product to the cart', () => {

  
  spyOn(localStorage, 'getItem').and.callFake(() => {
    return JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }]);
  });

  loadFromStorage();

  addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  expect(cart.length).toEqual(1);
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }]));
  expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  expect(cart[0].quantity).toEqual(2);
 });

 it('adds the new product to the cart', () => {
  spyOn(localStorage, 'getItem').and.callFake(() => {
    return JSON.stringify([]);
  });

  loadFromStorage();

  
  
  addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  expect(cart.length).toEqual(1);
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  expect(cart[0].quantity).toEqual(1);
  
 });
});

describe('test tuite: removeFromCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();
  });

  it('remove a product that is in the cart', () => {
    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
  });

  it('remove a productId that is not in the cart', () => {
    removeFromCart('does not exist');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }]));
  });
});

describe('test suite: updateDeliveryOption', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('update the delivery option of a product in a cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionsId: '1'
      }]);
    });
    loadFromStorage();

    deliveryOptionUpdate('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionsId).toEqual('3');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionsId: '3'
    }]));
  });

  it('does nothing if the product is not in the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionsId: '1'
      }]);
    });
    loadFromStorage();

    deliveryOptionUpdate('does-not-exist', '3');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1)
    expect(cart[0].deliveryOptionsId).toEqual('1')
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});