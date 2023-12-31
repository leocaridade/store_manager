const camelize = require('camelize');
const connection = require('./connection');
const {
  getFormattedColumnNames,
  getPlaceholdersForInsertSales,
} = require('../utils/generateFormattedQuery');

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

const insertSales = async (salesData) => {
  const [{ insertId }] = await connection
  .execute('INSERT INTO sales (date) VALUES (CURRENT_TIMESTAMP());');

  const columns = `sale_id, ${getFormattedColumnNames(salesData[0])}`;
  const placeholders = getPlaceholdersForInsertSales(salesData);
  const values = salesData.flatMap(({ productId, quantity }) => [insertId, productId, quantity]);

  const query = `INSERT INTO sales_products (${columns}) VALUES ${placeholders};`;
  await connection.execute(query, [...values]);
  
  return insertId;
};

const deleteSale = async (saleId) => {
  const result = await connection.execute('DELETE FROM sales WHERE id = ?', [saleId]);
  return result;
};

const findByProductId = async (productId) => {
  const [[sale]] = await connection.execute(
    `SELECT sp.sale_id, sp.product_id, sp.quantity, s.date
      FROM sales_products AS sp 
      LEFT JOIN sales AS s ON sp.sale_id = s.id
      WHERE sp.product_id = ?
      ORDER BY sp.sale_id, sp.product_id;`,
      [productId],
  );
  
  return camelize(sale);
};

const updateSalesProduct = async (quantity, saleId, productId) => {
  const query = 'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?;';

  const result = await connection.execute(query, [quantity, saleId, productId]);
  return result;
};

findByProductId(2);

module.exports = {
  findAll,
  findById,
  insertSales,
  deleteSale,
  findByProductId,
  updateSalesProduct,
};