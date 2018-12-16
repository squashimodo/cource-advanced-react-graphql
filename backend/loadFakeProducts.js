require('dotenv').config({path: './.env'});
const db = require('./src/db');
const faker = require('faker');

const setup = async () => {
  Array.from({length: 10}).forEach(() => {
    db.mutation.createItem({
      data: {
        title: `${faker.commerce.productAdjective()} ${faker.commerce.product()} (${faker.commerce.productMaterial()})`,
        description: faker.lorem.paragraph(),
        price: faker.commerce.price(),
        ...(() => {
          const image = `${faker.random.image()}?cachebust=${faker.random.number(100)}`;
          return {
            image: image,
            largeImage: image,
          }
        })()
      }
    });
  })
  
}

setup();