const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (_req, res) => {
  const { data } = await salesService.findAll();

  return res.status(200).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.findById(Number(id));

  if (status !== 'SUCCESSFUL') return res.status(404).json(data);

  return res.status(200).json(data);
};

const createSale = async (req, res) => {
  const { status, data } = await salesService.createSale(req.body);

  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.deleteSale(id);

  if (data) return res.status(mapStatusHTTP(status)).json(data);

  return res.status(mapStatusHTTP(status)).json();
};

const updateSalesProduct = async (req, res) => {
  // const { saleId, productId } = req.params;
  // const { quantity } = req.body;

  const { status, data } = await salesService.updateSalesProduct({ ...req.body, ...req.params });

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAll,
  findById,
  createSale,
  deleteSale,
  updateSalesProduct,
};