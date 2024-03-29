import { container } from "tsyringe"

import "./providers/index"

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
import { IRentalsRepository } from "../../modules/rentals/repositories/IRentalsRepository"
import { RentalsRepository } from "../../modules/rentals/infra/typeorm/repositories/RentalsRepository"
import { IUsersTokensRepository } from "../../modules/accounts/repositories/IUsersTokensRepository"
import { UsersTokensRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository"

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

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
)


container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  CarsRepository
)

container.registerSingleton<ICarImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
)

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
)


