import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory"
import { AppError } from "../../../../shared/errors/AppError"
import { UserRepository } from "../../infra/typeorm/repositories/UserRepository"
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UserRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider
let mailProvider: MailProviderInMemory

describe("Send Forgot Mail", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    mailProvider = new MailProviderInMemory()
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    )

  })

  it("should be able to sent to forgot password mail to user", async () => {

    const sendMail = jest.spyOn(mailProvider, "sendMail")

    await usersRepositoryInMemory.create({
      driver_license: "1234",
      email: "test@test.com",
      name: "test user",
      password: "1234"
    })

    await sendForgotPasswordMailUseCase.execute("test@test.com")

    expect(sendMail).toHaveBeenCalled()

  })

  it("should not send email if user does not exist", async () => {


    await expect(
      sendForgotPasswordMailUseCase.execute("nonexistent@test.com")
    ).rejects.toEqual(new AppError("User does not exist!"))

  })

  it("should be able to create an user token", async () => {

    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create")

    await usersRepositoryInMemory.create({
      driver_license: "1234",
      email: "test@test.com",
      name: "test user",
      password: "1234"
    })

    await sendForgotPasswordMailUseCase.execute("test@test.com")

    expect(generateTokenMail).toHaveBeenCalled()
  })

})