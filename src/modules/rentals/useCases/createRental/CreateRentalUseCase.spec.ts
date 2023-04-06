import dayjs from "dayjs";
import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider

describe("Create Rental", () => {

  const date = dayjs().add(1, "day").toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory)
  })

  it("should be able to create new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: date
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create new rental if user already has an open rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: date
    })

    const rental2 = async () => await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: date
    })

    expect(async () => await rental2()).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create new rental if the car already has an open rental", async () => {
    await createRentalUseCase.execute({
      user_id: "123",
      car_id: "test",
      expected_return_date: date
    })

    const rental2 = async () => await createRentalUseCase.execute({
      user_id: "321",
      car_id: "test",
      expected_return_date: date
    })

    expect(async () => await rental2()).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create new rental with less than 24 hours", async () => {
    const rental = async () => await createRentalUseCase.execute({
      user_id: "123",
      car_id: "test",
      expected_return_date: dayjs().toDate()
    })

    expect(async () => await rental()).rejects.toBeInstanceOf(AppError)
  })
})