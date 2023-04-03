import { container } from "tsyringe"
import { IUserRepository } from "../../modules/accounts/repositories/IUserRepository"
import { UserRepository } from "../../modules/accounts/infra/typeorm/repositories/UserRepository"
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository"
import { CategoryRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository"
import { SpecificationRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationRepository"
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository"
import { ICarsRepository } from "../../modules/cars/repositories/ICarsRepository"
import { CarsRepository } from "../../modules/cars/infra/typeorm/repositories/CarsRepository"
import { ICarImagesRepository } from "../../modules/cars/repositories/ICarImagesRepository"
import { CarsImagesRepository } from "../../modules/cars/infra/typeorm/repositories/CarsImagesRepository"

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

container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  CarsRepository
)

container.registerSingleton<ICarImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
)

