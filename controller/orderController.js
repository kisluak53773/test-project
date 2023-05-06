const { OrderProduct, Order, Product } = require("../models/models");
const errorHandler = require("../error/errorHandler");

async function createOrder(req, res, next) {
  try {
    const { id, products, comment, payment, name, city, phone, address } =
      req.body;
    if (!id || !products || !payment || !name || !city || !phone || !address) {
      return next(errorHandler.badRequest("User id or products are absent"));
    }
    console.log("create order");
    const order = await Order.create({
      userId: id,
      comment,
      payment,
      name,
      city,
      phone,
      address,
    });
    for (const product of products) {
      const orderProduct = await OrderProduct.create({
        productId: product.id,
        orderId: order.id,
        quantity: product.quantity,
      });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return next(errorHandler.internalError("Something went wrong"));
  }
}

async function getAllOrders(req, res, next) {
  try {
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    const orderData = [];
    const { count, rows } = await Order.findAndCountAll({ limit, offset });
    for (const order of rows) {
      const allProducts = [];
      const orderProducts = await OrderProduct.findAll({
        where: { orderId: order.id },
      });
      for (const orderProduct of orderProducts) {
        const products = await Product.findByPk(orderProduct.productId);
        allProducts.push({
          quantity: orderProduct.quantity,
          ...products.dataValues,
        });
      }
      orderData.push({ ...order.dataValues, products: allProducts });
    }
    return res.json({ count, orders: orderData });
  } catch (error) {
    return next(errorHandler.internalError("Something went wrong"));
  }
}

async function updateState(req, res, next) {
  try {
    const { status, id } = req.body;
    if (!status || !id) {
      return next(errorHandler.badRequest("Id is absent"));
    }
    const data = await Order.update({ finished: status }, { where: { id } });
    return res.status(200).json(data);
  } catch (error) {
    return next(errorHandler.internalError("Something went wrong"));
  }
}

module.exports = { createOrder, getAllOrders, updateState };
