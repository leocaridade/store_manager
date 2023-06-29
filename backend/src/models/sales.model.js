const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sp.*, s.date
      FROM sales_products AS sp 
      LEFT JOIN sales AS s ON sp.sale_id = s.id
      ORDER BY sp.sale_id, sp.product_id;`,
);
  return camelize(sales);
};

const findById = async (salesId) => {
  const [sales] = await connection.execute(
    `SELECT sp.product_id, sp.quantity, s.date
      FROM sales_products AS sp 
      LEFT JOIN sales AS s ON sp.sale_id = s.id
      WHERE sp.sale_id = ?
      ORDER BY sp.sale_id, sp.product_id;`,
      [salesId],
  );
  return camelize(sales);
};

module.exports = {
  findAll,
  findById,
};