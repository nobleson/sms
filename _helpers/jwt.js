const expressJwt = require('express-jwt');
const config = require('../config.json');
const userService = require('../services/user/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/',
            '/public',
            '/user/authenticate',
            '/user/register'
        ]
    });
}
/* 'public/assets/css',
'public/assets/css/bootstrap',
'public/assets/css/bootstrap/mixins',
'public/assets/css/bootstrap/utilities',
'public/assets/css/components',
'public/assets/fonts/fontawesome/css',
'/public/assets/fonts/ionicons/css',
'/public/assets/fonts/ionicons/fonts',
'/public/assets/fonts/slick',
'/public/assets/images/',
'/public/assets/js/',
'/public/assets/js/custom/',
'/public/assets/scss/',
'/public/assets/scss/',
'/public/assets/scss/bootstrap/mixins/',
'/public/assets/scss/bootstrap/utilities/',
'/public/assets/scss/components/',
'/public/assets/scss/mixins/', */
async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};