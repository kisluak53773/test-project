const { Type } = require("../models/models");

async function create(req, res) {
  const { name } = req.body;
  const type = await Type.create({ name });
  return res.json(type);
}

async function getAll(req, res) {
  const types = await Type.findAll();
  return res.json(types);
}

async function deleteById(req, res) {
  const { id } = req.params;
  console.log("data" + id);
  const type = await Type.destroy({ where: { id } });
  return res.json(type);
}

module.exports = {
  create,
  getAll,
  deleteById,
};
