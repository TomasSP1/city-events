const asyncHandler = require("express-async-handler");

const Event = require("../models/eventModel");

// @desc Get events
// @route GET /api/events
// @access PRIVATE
const getEvents = asyncHandler(async (req, res) => {
  // kadangi .find({ user: req.user.id }) nurodyta user id, tai del to butina nurodyti headeryje userio token
  const events = await Event.find({ user: req.user.id });
  res.status(200).json(events);
});

//============================================================//

const getSpecificEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(400);
    throw new Error("Event not found");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // make sure the logged in user matches the events user
  if (event.user.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(401);
    throw new Error("User not authorized");
  }

  res.status(200).json(event);
});

//============================================================//
// @desc Set events
// @route POST /api/events
// @access PRIVATE
const setEvent = asyncHandler(async (req, res) => {
  if (
    !req.body.title ||
    !req.body.category ||
    !req.body.place ||
    !req.body.time ||
    !req.body.photo
  ) {
    res.status(400);
    // klases pagrindu kuriamas naujas objektas
    throw new Error("Please add a required fields");
  }
  const event = await Event.create({
    title: req.body.title,
    category: req.body.category,
    place: req.body.place,
    time: req.body.time,
    photo: req.body.photo,
    user: req.user.id,
  });
  res.status(200).json(event);
});

//============================================================//
// @desc Update event
// @route PUT /api/events/:id
// @access PRIVATE
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(400);
    throw new Error("Event not found");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // make sure the logged in user matches the events user
  if (event.user.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(401);
    throw new Error("User not authorized");
  }

  if (req.user.role === "admin" || event.user.toString() === req.user.id) {
    // response turi grazinti atnaujinta skelbima
    const updateEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updateEvent);
  }
});

//============================================================//
// @desc Delete Event
// @route DELETE /api/events/:id
// @access PRIVATE
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(400);
    throw new Error("event not found");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // make sure the logged in user matches the event user
  if (event.user.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(401);
    throw new Error("User not authorized");
  }

  if (req.user.role === "admin" || event.user.toString() === req.user.id) {
    console.log(event);

    await Event.deleteOne({ _id: req.params.id });

    res.status(200).json({ id: req.params.id });
  }
});

module.exports = {
  getEvents,
  getSpecificEvent,
  setEvent,
  updateEvent,
  deleteEvent,
};
