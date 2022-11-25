const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: String
})

const Role = mongoose.model('Role', RoleSchema)

module.exports = {
    Role,
    RoleSchema
}