const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config.json');

const authSchema = mongoose.Schema({ 
    displayName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    phoneNumber:
    {
        type: String
    },
    userClaims: {
        isEmailVerified: {
            type: Boolean,
            default: false 
        },
        userRole: [{ 
            type: Object
        }]
            
    },
    dateRegistered:{
        type: Date,
        default: Date.now 
    }

})
authSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

authSchema.methods.generateAuthToken = async function() { 
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, config.secret)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

authSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await Authentication.findOne({ email} )
    if (!user) { 
        throw new Error({ error: 'Invalid login credentials' })
    }
    console.log('compare',user.password) 
    console.log('password',password) 
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
} 



authSchema.set('toJSON', { virtuals: true });


const Authentication = mongoose.model('Authentication', authSchema)

module.exports = Authentication