import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe("Create category", () => {

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
  })

  it("should be able to create a new category", async () => {

    const category = {
      name: "Category Test",
      description: "Category description Test",
    }

    await createCategoryUseCase.execute(category)

    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)

    expect(categoryCreated).toHaveProperty("id")
  })


  it("should not create a new category if name already exists", async () => {

    const createDuplicatedCategory = async () => {
      const category = {
        name: "Category Test",
        description: "Category description Test",
      }

      await createCategoryUseCase.execute(category)

      await createCategoryUseCase.execute(category)
    }

    expect(createDuplicatedCategory()).rejects.toEqual(new AppError("Category Already exists!"))

  })
})