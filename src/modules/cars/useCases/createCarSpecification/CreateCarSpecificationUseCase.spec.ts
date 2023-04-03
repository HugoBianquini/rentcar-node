import { AppError } from "../../../../shared/errors/AppError"
import { SpecificationRepository } from "../../infra/typeorm/repositories/SpecificationRepository"
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationRepositoryInMemory"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationRepositoryInMemory: SpecificationRepositoryInMemory

describe("Create Car Specification", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationRepositoryInMemory)
  })

  it("should be able to add a new speification to the car", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "car name",
      description: "description",
      daily_rate: 100,
      license_plate: "222",
      fine_amount: 10,
      brand: "brand",
      category_id: "id category"
    })

    const specification = await specificationRepositoryInMemory.create({
      description: "test",
      name: "test"
    })

    const specifications_id = [specification.id]


    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id, specifications_id
    })

    expect(specificationCars).toHaveProperty("specifications")
    expect(specificationCars.specifications.length).toBe(1)

  })

  it("should not be able to add a new speification to nonexistent car", async () => {

    const car_id = "1234"
    const specifications_id = ["54321"]

    expect(async () =>
      await createCarSpecificationUseCase.execute({ car_id, specifications_id })
    ).rejects.toBeInstanceOf(AppError)
  })
})