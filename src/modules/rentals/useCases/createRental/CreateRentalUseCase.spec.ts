import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory)
  })

  it("should be able to create new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: new Date()
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create new rental if user already has an open rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: new Date()
    })

    const rental2 = async () => await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: new Date()
    })

    expect(async () => await rental2()).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create new rental if the car already has an open rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "123",
      car_id: "test",
      expected_return_date: new Date()
    })

    const rental2 = async () => await createRentalUseCase.execute({
      user_id: "321",
      car_id: "test",
      expected_return_date: new Date()
    })

    expect(async () => await rental2()).rejects.toBeInstanceOf(AppError)
  })
})