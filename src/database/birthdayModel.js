const mongoose = require('mongoose');

const birthdaySchema = new mongoose.Schema({
    GuildId: String,
    User: String,
    Username: String,
    Birthday: String,
    Day: String,
    Month: String,
    Year: String,
    Age: String,
})

module.exports = mongoose.model("birthday", birthdaySchema);