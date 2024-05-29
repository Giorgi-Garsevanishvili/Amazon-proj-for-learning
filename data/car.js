class Car {
  #brand;
  #model;
  speed;
  isTrunkOpen;


  constructor (productDetails) {
    this.#brand = productDetails.brand;
    this.#model = productDetails.model;
    this.speed = productDetails.speed;
    this.isTrunkOpen = false;
  }


  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';
    console.log(`${this.#brand} ${this.#model} speed: ${this.speed} km/h Trunk: ${trunkStatus}`);
  }

  
  go(){
    if (this.isTrunkOpen === false){
    this.speed += 5;
    }


    if(this.speed > 200)
      {this.speed = 200;} 
    } 

  break () {
    this.speed -= 5;

    if(this.speed < 0)
      {this.speed = 0;}
  }

  openTrunk () {
    if (this.speed === 0){
    this.isTrunkOpen = true;
    }

  
  }

  closeTrunk () {
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car {
  acceleration;
  constructor(productDetails){
    super(productDetails);
    this.acceleration = productDetails.acceleration;
  }

  go(){
    this.speed += this.acceleration;

    if(this.speed > 300){
      this.speed = 300;
    }
  }

  openTrunk(){
    console.log('Race car do not have trunk.')
  }

  closeTrunk(){
    console.log('Race car do not have trunk.')
  }
}

const brand = new Car (
  {
  brand: 'toyota',
  model: 'Corola',
  speed: 0
}
);

const brand1 = new Car(
  {
    brand: 'Tesla',
    model: 'Model 3',
    speed: 0
  }
);

const brand2 = new RaceCar(
  {
    brand: 'McLaren',
    model: 'F1',
    speed: 0,
    acceleration: 20
  }
);






brand2.go();

brand.openTrunk();
brand.closeTrunk();
brand.go();
brand.go();


brand1.openTrunk();
brand1.closeTrunk();
brand1.break();
brand1.break();
brand1.go();

brand.displayInfo();
brand1.displayInfo();
brand2.displayInfo();



