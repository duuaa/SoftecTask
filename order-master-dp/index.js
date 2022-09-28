const users = refactorData('"Id":', require('./users.json'));
const products = refactorData('"ProductId":', require('./products.json'));
const orders = refactorData('"OrderId":', require('./orders.json'));

function refactorData(currentValue, responselist ){
  return JSON.parse(JSON.stringify(responselist).split(currentValue).join('"id":'))
}
module.exports = () => ({
  users: users,
  products: products,
  orders: orders
});

