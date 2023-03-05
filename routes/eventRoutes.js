const express = require("express");
const router = express.Router();

const {
  setEvent,
  getSpecificEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

// tikrinama ar public ar private access, kokias funkcijas agles daryti tam tikras useris (pgl admin arba simple role)
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getEvents)
  .post(protect, setEvent);
router
  .route("/:id")
  .put(protect, updateEvent)
  .delete(protect, deleteEvent)
  .get(protect, getSpecificEvent);

module.exports = router;
