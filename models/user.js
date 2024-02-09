const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    projects: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Project',
        },
      ],
});

module.exports = mongoose.model("User", userSchema);