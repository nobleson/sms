const mongoose = require('mongoose')

const smsUserSchema = mongoose.Schema({
     _id: {
        type: String
    }, 
    photo: {
        type: String
    },
    schools: [{
        school: {
            type: String
        }
    }], 
    services: [{
        service: {
            type: String
        }
    }],
    billings: [{
        billing: {
            type: String
        }
    }],
    analytics: [{
        analytic: {
            type: String
        }
    }],
    payments: [{
        payment: {
            type: String
        }
    }],
    auditTrials: [{
        auditTrial: {
            type: String
        }
    }],
    dateRegistered:{
        type: Date,
        default: Date.now 
    }
})



smsUserSchema.set('toJSON', { virtuals: true });


const SMSUser = mongoose.model('SMSUser', smsUserSchema)

module.exports = SMSUser