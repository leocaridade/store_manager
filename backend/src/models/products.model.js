const camelize = require('camelize');
const connection = require('./connection');
const {
  getFormattedColumnNames,
  getFormattedPlaceholders,
} = require('../utils/generateFormattedQuery');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products;');
  return camelize(products);
};

const findById = async (productId) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?;', [productId]);
  return camelize(product);
};

const insert = async (productData) => {
  const columns = getFormattedColumnNames(productData);
  const placeholders = getFormattedPlaceholders(productData);
  const query = `INSERT INTO products (${columns}) VALUES (${placeholders});`;

  const [{ insertId }] = await connection.execute(query, [...Object.values(productData)]);

  return insertId;
};

const update = async (productId, productData) => {
  const columns = getFormattedColumnNames(productData);
  const placeholders = getFormattedPlaceholders(productData);
  const query = `UPDATE products SET ${columns} = ${placeholders} WHERE id = ?;`;
  
  await connection.execute(query, [...Object.values(productData), productId]);
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
};