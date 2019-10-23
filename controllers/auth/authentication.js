const authService = require('../../services/auth/authentication');

exports.authenticate = function(req, res, next) {
    authService.authenticate(req.body) 
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

 exports.register = function(req, res, next) {
    authService.create(req.body)
        .then(function(data) {
        console.log('data',JSON.stringify(data))
         res.status(200).send(data)
        })
        .catch(err => next(err));
}

exports.getAll = function(req, res, next) {
    authService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

exports.getCurrent = function(req, res, next) {
    authService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

exports.getById = function(req, res, next) {
    authService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

exports.update = function(req, res, next) {
    authService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

exports._delete = function(req, res, next) {
    authService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

