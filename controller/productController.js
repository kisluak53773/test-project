const { Product } = require("../models/models");
const uuid = require("uuid");
const path = require("path");
const errorHandler = require("../error/errorHandler");
const fs = require("fs");

async function create(req, res, next) {
  try {
    console.log("body:" + req.body);
    let { name, price, typeId, compound } = req.body;
    const { img } = req.files;
    let fileName = uuid.v4() + ".jpg";
    const product = await Product.create({
      name,
      price,
      typeId,
      img: fileName,
      compound,
    });
    img.mv(path.resolve(__dirname, "..", "static", fileName));
    return res.json(product);
  } catch (e) {
    next(errorHandler.badRequest(e.message));
  }
}

async function getAll(req, res) {
  let { typeId } = req.query;
  if (!typeId) {
    const products = await Product.findAll();
    return res.json(products);
  } else {
    const products = await Product.findAll({
      where: { typeId },
    });
    return res.json(products);
  }
}

async function getById(req, res) {
  const { id } = req.params;
  const product = await Product.findOne({ where: { id } });
  return res.json(product);
}

async function deleteById(req, res) {
  const { id } = req.params;
  const imgPath = await Product.findOne({ where: { id } });
  fs.unlinkSync(path.resolve(__dirname, "..", "static", imgPath.img));
  const product = await Product.destroy({ where: { id } });
  return res.json(product);
}

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
};
