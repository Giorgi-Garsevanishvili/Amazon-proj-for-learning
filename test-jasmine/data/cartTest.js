import { addToCart, cart } from "../../data/cart.js";


describe('test suite: addToCart', () => {
 it('adds and existing product to the cart', () => {

 });

 it('adds the new product to the cart', () => {
  
  addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  expect(cart.length).toEqual(1);
 });
});