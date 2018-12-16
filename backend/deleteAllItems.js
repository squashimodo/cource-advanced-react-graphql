require('dotenv').config({path: './.env'});
const db = require('./src/db');

const setup = async () => {
    const items = await db.query.items();  
    const res = await db.mutation.deleteManyItems({
      where: {
        id_in: items.map(i => i.id)
      }
    });
}

setup();