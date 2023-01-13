import { CategoryDto } from '../dto/CategoryDto';
import { Result } from '../types/response';

export default interface CategoryRepository {
  getCategory(): Promise<Result<CategoryDto[]>>;
  createCategory(category: string): Promise<Result<CategoryDto>>;
}
