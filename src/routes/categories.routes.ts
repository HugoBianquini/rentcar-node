import { Router } from 'express'
import { CategoryRepository } from '../modules/cars/repositories/implementations/CategoriesRepository';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();
const categoriesRepository = new CategoryRepository();


categoriesRoutes.post("/", (req, res) => {
  return createCategoryController.handle(req, res)
})

categoriesRoutes.get("/", (req, res) => {
  return listCategoriesController.handle(req, res)
})

export { categoriesRoutes }