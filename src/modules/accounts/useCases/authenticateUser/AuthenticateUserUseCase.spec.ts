import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticaterUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    authenticaterUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
  })

  it("should authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "0004321",
      email: "user@test.com",
      password: "1234",
      name: "User test"
    }

    await createUserUseCase.execute(user)

    const result = await authenticaterUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty("token")

  })

  it("should not authenticate an nonexistent user", async () => {

    const authenticate = async () => {
      await authenticaterUserUseCase.execute({
        email: "false@email.com",
        password: "password"
      })
    }

    expect(authenticate()).rejects.toBeInstanceOf(AppError)
  })

  it("should not authenticate user with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "0004321",
      email: "user@test.com",
      password: "1234",
      name: "User test"
    }

    const authenticate = async () => {
      await createUserUseCase.execute(user)

      await authenticaterUserUseCase.execute({
        email: user.email,
        password: "password_wrong"
      })
    }

    expect(authenticate()).rejects.toBeInstanceOf(AppError)
  })
})