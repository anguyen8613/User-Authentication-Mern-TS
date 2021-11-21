import express from 'express';
import auth from '../middleware/auth';
import controller from '../controllers/customer';

const router = express.Router();
router.post('/', auth, controller.createCustomer);

router.get('/', auth, controller.getCustomer);

module.exports = router;
