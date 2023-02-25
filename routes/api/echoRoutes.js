const router = require("express").Router();
const {
  getAllEchos,
  getEchoById,
  createEcho,
  updateEcho,
  deleteEcho,
  addEchoEcho,
  deleteEchoEcho,
} = require("../../controllers/echoController");

// /api/echos
router.route("/").get(getAllEchos).post(createEcho);

// /api/echos/:id
router.route("/:id") .get(getEchoById).put(updateEcho).delete(deleteEcho);

// /api/echos/:id/echoecho
router.route("/:id/echoecho").post(addEchoEcho);

// /api/echos/:id/echoecho/:echoEchoId
router.route("/:id/echoecho/:echoEchoId").delete(deleteEchoEcho);

module.exports = router;