import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it("should be able to list all available cars", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car description",
      daily_rate: 110.00,
      license_plate: "DEF-4321",
      fine_amount: 100,
      brand: "Car brand",
      category_id: "category_id"
    })

    const cars = await listCarsUseCase.execute({})

    expect(cars).toEqual([car])

  });

  it("should be able to list all available cars by brand", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Car description",
      daily_rate: 110.00,
      license_plate: "DEF-4321",
      fine_amount: 100,
      brand: "Car brand test",
      category_id: "category_id"
    })

    const cars = await listCarsUseCase.execute({ brand: "Car brand test" })

    expect(cars).toEqual([car])

  });

  it("should be able to list all available cars by name", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Car 3",
      description: "Car description",
      daily_rate: 110.00,
      license_plate: "DEF-1345",
      fine_amount: 100,
      brand: "Car brand test",
      category_id: "12345"
    })

    const cars = await listCarsUseCase.execute({ category_id: "12345" })

    expect(cars).toEqual([car])

  });
})