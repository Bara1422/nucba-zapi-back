import { Router } from 'express';
import { createOrder } from '../controllers/order.controller';

import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { protect } from '../middlewares/auth';

const router = Router();

router.post(
  '/',

  body('userId').notEmpty().withMessage('Nombre obligatorio'),
  body('shippingDetails').isObject().notEmpty(),
  body('items').isArray().notEmpty(),
  body('shippingPrice').isNumeric().notEmpty(),
  body('subtotal').isNumeric().notEmpty(),
  body('total').isNumeric().notEmpty(),
  validateRequest,
  protect,
  createOrder
);
//verbo GET -> controller (getOrder)
export default router;
