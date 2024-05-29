import { Product, Clothing, Appliance, products } from "../../data/products.js"

describe('test suite: Products', () => {
  let product;

  beforeEach(() => {
    product = new Product(
      {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        image: "images/products/intermediate-composite-basketball.jpg",
        name: "Intermediate Size Basketball",
        rating: {
          stars: 4,
          count: 127
        },
        priceCents: 2095,
        keywords: [
          "sports",
          "basketballs"
        ]
      }
    )
  });

  it('have correct properties', () => {
    expect(product.id).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(product.image).toEqual('images/products/intermediate-composite-basketball.jpg');
    expect(product.name).toEqual('Intermediate Size Basketball');
    expect(product.getPrice()).toEqual('$20.95');
  });

  it('gets Stars URL', () => {
    expect(product.getStarsUrl()).toEqual('images/ratings/rating-40.png');
  });
  
  it('extra info HTML', () => {
    expect(product.extraInfoHTML()).toEqual('');
  });
});

