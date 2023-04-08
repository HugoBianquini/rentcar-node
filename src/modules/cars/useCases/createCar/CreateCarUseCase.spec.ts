import { AppError } from "../../../../shared/errors/AppError"
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Car", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "car name",
      description: "description",
      daily_rate: 100,
      license_plate: "222",
      fine_amount: 10,
      brand: "brand",
      category_id: "id categoria"
    })

    expect(car).toHaveProperty("id")
  })

  it("should not be able to create a car with existing license plate", async () => {

    const createRepeatedCar = async () => {
      await createCarUseCase.execute({
        name: "car name",
        description: "description",
        daily_rate: 100,
        license_plate: "123",
        fine_amount: 10,
        brand: "brand",
        category_id: "id categoria"
      })

      await createCarUseCase.execute({
        name: "car name",
        description: "description",
        daily_rate: 100,
        license_plate: "123",
        fine_amount: 10,
        brand: "brand",
        category_id: "id categoria"
      })

    }

    expect(async () => {
      await createRepeatedCar()
    }).rejects.toEqual(new AppError("Car already exists!"))
  }),


    it("should be able to create a car with available true by default", async () => {
      const car = await createCarUseCase.execute({
        name: "Car Available",
        description: "description car",
        daily_rate: 100,
        license_plate: "ABC",
        fine_amount: 10,
        brand: "brand",
        category_id: "id categoria"
      })

      expect(car.available).toBe(true)
    })
})