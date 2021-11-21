import express from 'express';
import controller from '../controllers/user';

const router = express.Router();

router.post('/register', controller.register);

router.post('/login', controller.login);

router.get('/logout', controller.logout);

router.get('/isLoggedIn', controller.isLoggedIn);

module.exports = router;
