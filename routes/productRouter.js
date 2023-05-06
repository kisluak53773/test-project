const Router = require("express");
const router = new Router();
const { create, getAll, getById, deleteById } = require("../controller/productController");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/", roleMiddleware("ADMIN"), create);
router.get("/", getAll);
router.get("/:id", getById);
router.delete("/:id",roleMiddleware("ADMIN"),deleteById)

module.exports = router;
