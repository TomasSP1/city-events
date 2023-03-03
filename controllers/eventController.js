const asyncHandler = require('express-async-handler');

const Event = require('../models/eventModel');

// @desc Get goals
// @route GET /api/goals
// @access PRIVATE
const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find({ user: req.user.id })
    res.status(200).json(events)
})

// @desc Set events
// @route POST /api/events
// @access PRIVATE
const setEvent = asyncHandler(async (req, res) => {
    if (!req.body.name || !req.body.description || !req.body.price) {
        res.status(400)
        throw new Error('Please add a required fields')
    }
    const event = await Event.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        user: req.user.id
    })
    res.status(200).json(event)
})

// @desc Update goal
// @route PUT /api/goals/:id
// @access PRIVATE
const updateEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)

    if (!event) {
        res.status(400)
        throw new Error('Event not found')
    }

    // check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the logged in user matches the goal user
    if (event.user.toString() !== req.user.id && req.user.role !== "admin") {
        res.status(401)
        throw new Error('User not authorized')
    }

    //if admin or event creator can update
    if (req.user.role === "admin" || event.user.toString() === req.user.id) {
        const updateEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.status(200).json(updateEvent)
    }
})

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access PRIVATE
const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)

    if (!event) {
        res.status(400)
        throw new Error('Event not found')
    }

    // check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the logged in user matches the goal user
    if (event.user.toString() !== req.user.id && req.user.role !== "admin") {
        res.status(401)
        throw new Error('User not authorized')
    }

    if (req.user.role === "admin" || event.user.toString() === req.user.id) {
        await event.remove()
        res.status(200).json({ id: req.params.id })
    }


})

module.exports = {
    getEvents,
    setEvent,
    updateEvent,
    deleteEvent
}