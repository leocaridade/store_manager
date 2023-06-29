const { salesService } = require('../services');

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

module.exports = {
  findAll,
  findById,
};