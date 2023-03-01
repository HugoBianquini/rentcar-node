import { container } from "tsyringe"
import { IUserRepository } from "../../modules/accounts/repositories/IUserRepository"
import { UserRepository } from "../../modules/accounts/repositories/implementations/UserRepository"
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository"
import { CategoryRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository"
import { SpecificationRepository } from "../../modules/cars/repositories/implementations/SpecificationRepository"
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository"

container.registerSingleton<ICategoriesRepository>(
  "CategoryRepository",
  CategoryRepository
)

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
)

container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserRepository
)

