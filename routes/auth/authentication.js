const express = require('express');
const router = express.Router();
const auth = require('../../controllers/auth/authentication');


// routes
router.post('/authenticate', auth.authenticate);
router.post('/create', auth.register);
router.get('/', auth.getAll);
router.get('/current', auth.getCurrent);
router.get('/:id', auth.getById);
router.put('/:id', auth.update);
router.delete('/:id', auth._delete);

module.exports = router;
