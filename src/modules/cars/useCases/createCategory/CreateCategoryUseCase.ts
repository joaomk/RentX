import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExist = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExist) {
      throw new AppError("Category already exist!");
    }
    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
