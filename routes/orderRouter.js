const Router = require("express");
const router = new Router();
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  createOrder,
  getAllOrders,
  updateState,
} = require("../controller/orderController");

router.post("/", roleMiddleware("ADMIN"), createOrder);
router.get("/", roleMiddleware("ADMIN"), getAllOrders);
router.patch("/", roleMiddleware("ADMIN"), updateState);

module.exports = router;
