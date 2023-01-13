import { CategoryDto } from '../core/dto/CategoryDto';
import CategoryRepository from '../core/repositories/category.repository';
import { Result } from '../core/types/response';
import { prisma } from '../config/db';
import { BadRequestError } from '../errors/bad-request-error';
import { ServerError } from '../errors/server-error';

export default class CategoryDataSource implements CategoryRepository {
  public async getCategory(): Promise<Result<CategoryDto[]>> {
    try {
      const categories = await prisma.category.findMany({
        include: {
          products: true,
        },
      });

      return { success: true, result: categories };
    } catch (error) {
      let err = new ServerError('Algo salio mal al traer categorias!');
      return { success: false, err };
    }
  }
  public async createCategory(
    categoryName: string
  ): Promise<Result<CategoryDto>> {
    try {
      const category = await prisma.category.create({
        data: {
          category: categoryName,
        },
        include: {
          products: true,
        },
      });
      return { success: true, result: category };
    } catch (error) {
      //El error real, deberiamos loggearlo a la consola o un file .log (para info nuestra)
      let err = new BadRequestError('Error al crear Categoria!');
      return { success: false, err };
    }
  }
}
