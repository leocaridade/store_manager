const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (_req, res) => {
  const { data } = await productsService.findAll();

  return res.status(200).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.findById(Number(id));

  if (status !== 'SUCCESSFUL') return res.status(404).json(data);

  return res.status(200).json(data);
};

const createProduct = async (req, res) => {
  const { status, data } = await productsService.insert(req.body);

  return res.status(mapStatusHTTP(status)).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.update(id, req.body);

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAll,
  findById,
  createProduct,
  update,
};