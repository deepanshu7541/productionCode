const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    techUsed: [],
    demo: {
        type: String
    }
});

module.exports = mongoose.model('ProjectModel', ProjectSchema);
