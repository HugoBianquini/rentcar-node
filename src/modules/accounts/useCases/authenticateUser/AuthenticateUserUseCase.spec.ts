import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersTokensRepository } from "../../infra/typeorm/repositories/UsersTokensRepository";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticaterUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: IDateProvider
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    authenticaterUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider)
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

    expect(authenticate()).rejects.toEqual(new AppError("Email or password incorrect"))
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

    expect(authenticate()).rejects.toEqual(new AppError("Email or password incorrect"))
  })
})