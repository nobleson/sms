const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SMSUser = require('../../models/user/SMSUser');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete 
};

async function getAll() {
    return await SMSUser.find();
}

async function getById(id) {
    return await SMSUser.findById(id);
}

async function create(userParam) {

    const user = new SMSUser(userParam);

    return  await user.save();
}

async function update(id, userParam) {
    const user = await SMSUser.findById(id);

    // validate
    if (!user) throw 'User not found';

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await SMSUser.findOneAndDelete(id);
}