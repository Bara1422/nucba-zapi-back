import { Request, Response, NextFunction } from 'express';
import { nextTick } from 'process';
import interactors from '../core/interactors';

export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categories = await interactors.GetCategoryInteractor();

  if (!categories.success) {
    return next(categories.err);
  }

  res.status(200).json({ state: 'success', data: categories });
};
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryName } = req.body;
  const category = await interactors.CreateCategoryInteractor(categoryName);

  if (!category.success) {
    return next(category.err);
  }

  res.status(200).json({ state: 'success', data: category });
};
