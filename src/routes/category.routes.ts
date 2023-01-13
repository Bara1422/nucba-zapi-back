import { Router } from 'express';
import {
  createCategory,
  getCategory,
} from '../controllers/category.controller';

import { authorized, protect } from '../middlewares/auth';

const router = Router();

router
  .get('/', getCategory)
  .post('/', protect, authorized('admin'), createCategory);

export default router;
