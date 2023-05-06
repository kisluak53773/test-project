const Router = require("express");
const router = new Router();
const { create, getAll, deleteById } = require("../controller/typeController");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/", roleMiddleware("ADMIN"), create);
router.get("/", getAll);
router.delete("/:id",roleMiddleware("ADMIN"),deleteById)

module.exports = router;
