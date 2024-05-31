import { Product, Clothing, Appliance } from "../../data/products.js"

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
    
  });

  it('gets Stars URL', () => {
    expect(product.getStarsUrl()).toEqual('images/ratings/rating-40.png');
  });
  
  it('extra info HTML (empty)', () => {
    expect(product.extraInfoHTML()).toEqual('');
  });

  it('get price', () => {
    expect(product.getPrice()).toEqual('$20.95');
  });
});

describe('test suite: clothing', () => {
  let clothing;

beforeEach(() => {
  clothing = new Clothing(
    {
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799,
      keywords: [
        "tshirts",
        "apparel",
        "mens"
      ],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png"
    }
  )
});

  it('has proper properties', () => {
    expect(clothing.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e')
    expect(clothing.image).toEqual('images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg')
    expect(clothing.name).toEqual('Adults Plain Cotton T-Shirt - 2 Pack')
    expect(clothing.sizeChartLink).toEqual('images/clothing-size-chart.png');
  });

  it('displays a size chart link', () => {
    expect(clothing.extraInfoHTML()).toContain('<a href="images/clothing-size-chart.png" target="_blank"')
    expect(clothing.extraInfoHTML()).toContain('Size Chart');
  });
});


describe('test suite: appliance', () => {
  let appliance;

  beforeEach(() => {
    appliance = new Appliance ({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197
      },
      priceCents: 1899,
      keywords: [
        "toaster",
        "kitchen",
        "appliances"
      ],
      type: 'appliance',
      instructionLink: 'images/appliance-instructions.png',
      warrantyLink: 'images/appliance-warranty.png'
    });
  });
    it('has proper properties', () => {
      expect(appliance.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
      expect(appliance.name).toEqual('2 Slot Toaster - Black');
      expect(appliance.rating).toEqual({ stars: 5, count: 2197 });
      expect(appliance.priceCents).toEqual(1899);
    });

    it('extra info HTML', () => {
      expect(appliance.extraInfoHTML()).toContain('<a href="images/appliance-instructions.png" target="_blank">');

      expect(appliance.extraInfoHTML()).toContain('instructions');
      expect(appliance.extraInfoHTML()).toContain(
        `<a href="images/appliance-warranty.png" target="_blank">`
      );
      expect(appliance.extraInfoHTML()).toContain('Warranty');
    });
});