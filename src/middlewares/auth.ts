import { Request, Response, NextFunction } from 'express';
import interactors from '../core/interactors';
import { NotAuthorizedError } from '../errors/not-authorized';
import jwt from 'jsonwebtoken';

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = '';
  // 1- verificar que en el Obj Request exista en el header de Authorization y este tenga el token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new NotAuthorizedError());
  }

  // 2- verificar que el token sea un token valido
  try {
    const decode: any = jwt.verify(token, process.env.JWT_SECRET!);

    let user = await interactors.GetUserByIdInteractor(decode.id);
    if (!user) {
      return next(new NotAuthorizedError());
    }
    req.user = user;
    return next();
  } catch (error) {
    return next(new NotAuthorizedError());
  }

  // 3- si el token es valido, inyectamos el user alobj request y continuamos la cadena de middlewares / Si no es valido, tiramos un error de NotAuthorizedError
};

export const authorized =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    let userRole = req.user?.role.roleName ? req.user.role.roleName : '';
    if (!roles.includes(userRole)) {
      return next(new NotAuthorizedError());
    }
    return next();
  };
