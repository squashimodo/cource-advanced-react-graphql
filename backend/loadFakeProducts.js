require('dotenv').config({path: './.env'});
const db = require('./src/db');
const faker = require('faker');
const testUserEmail = 'test@user.com';
const setup = async () => {
  let testUser;
  testUser = await db.query.user({
    where: {
      email: testUserEmail
    }
  });

  if (!testUser) {
    testUser = await db.mutation.createUser({
      data: {
        name: 'Testuser',
        email: testUserEmail,
        password: 'secretpassword'
      }
    })
  }

  if (!testUser) throw new Error('Something went wrong when creating the test user');

  
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
        })(),
        user: {
          connect: {
            id: testUser.id
          }
        }
      }
    });
  })
  
}

setup();