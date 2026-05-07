const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Jisne project banaya
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Team members
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);