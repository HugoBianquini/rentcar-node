import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/AppError";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoriesRepository: ICategoriesRepository) { }

  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new AppError("Category Already exists!");
    }

    this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryUseCase }