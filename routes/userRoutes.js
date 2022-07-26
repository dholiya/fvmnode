const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/all', userController.users);
router.post('/',  userController.user_register);
router.get('/', userController.user_login);

router.delete('/', userController.user_delete);
router.patch('/', userController.user_update_password);

module.exports = router;