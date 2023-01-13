import { AuthLogin, AuthDto, AuthSignIn } from '../core/dto/Auth';
import AuthRepository from '../core/repositories/auth.repository';
import { User } from '@prisma/client';
import { prisma } from '../config/db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { Result } from '../core/types/response';
import { NotFountError } from '../errors/not-found-error';
import { BadRequestError } from '../errors/bad-request-error';

export default class AuthDatasource implements AuthRepository {
  public async login(data: AuthLogin): Promise<Result<AuthDto>> {
    //Check que user no exista en la db
    //TODO: se podria hacerun try catch en la consulta a la db
    const existUser = await prisma.user.findUnique({
      where: { email: data.email },
      include: {
        role: true,
      },
    });
    if (!existUser) {
      return { success: false, err: new NotFountError() };
    }

    const isMatch = await this.matchPassword(existUser, data.password);
    if (!isMatch) {
      return {
        success: false,
        err: new BadRequestError('Erorr en usuario o contraseña'),
      };
    }

    const token = this.getSignedToken(existUser);

    return {
      success: true,
      result: {
        userId: existUser.id,
        name: existUser.name,
        email: existUser.email,
        token,
        expiresIn: 60 * 60 * 1000,
        role: {
          roleId: existUser.roleId,
          roleName: existUser.role.role,
        },
      },
    };
  }
  public async signin(data: AuthSignIn): Promise<Result<AuthDto>> {
    // Check que user no exista en la db
    const existUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existUser) {
      return {
        success: false,
        err: new BadRequestError('Este usuario ya existe'),
      };
    }
    // Crear un hash del password
    const salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(data.password, salt);

    // Crear User
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashPassword,
        roleId: data.roleId,
      },
      include: {
        role: true,
      },
    });

    const token = this.getSignedToken(user);

    return {
      success: true,
      result: {
        userId: user.id,
        name: user.name,
        email: user.email,
        token,
        expiresIn: 60 * 60 * 1000,
        role: {
          roleId: user.roleId,
          roleName: user.role.role,
        },
      },
    };
  }

  private getSignedToken(user: User): string {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRE!,
    });
  }

  private async matchPassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }
}
