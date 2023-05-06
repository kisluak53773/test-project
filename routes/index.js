const Router = require("express");
const router = Router();
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const typeRouter = require("./typeRouter");
const orderRouter = require("./orderRouter");

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/type", typeRouter);
router.use("/order", orderRouter);

module.exports = router;
