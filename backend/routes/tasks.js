const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Task = require('../models/Task');
const { protect, authorize } = require('../middleware/auth');

// 1. Create Project (Only Admin)
router.post('/projects', protect, authorize(['Admin']), async(req, res) => {
    try {
        const project = new Project({...req.body, admin: req.user.id });
        await project.save();
        res.status(201).json(project);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// 2. Create Task (Only Admin)
router.post('/tasks', protect, authorize(['Admin']), async(req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// 3. Update Task Status (Both Admin & Member)
router.patch('/tasks/:id', protect, async(req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(task);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;