const mongoose = require('mongoose')

const schoolSchema = new mongoose.Schema({
    
    name: String,
    allias: String,
    type: String,
    aboutSchool: String,
    contactAddress: String,
    phoneNumber: String,
    email: String,
    dateRegistered: String
    
}) 

module.exports = mongoose.model('School', schoolSchema)