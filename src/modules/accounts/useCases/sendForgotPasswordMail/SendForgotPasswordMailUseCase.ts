import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid"

import { IUserRepository } from "../../repositories/IUserRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";

@injectable()
class SendForgotPasswordMailUseCase {

  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) { }

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("User does not exist!")
    }

    const token = uuidV4()

    const expires_date = this.dateProvider.addHours(3)

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date
    })

    await this.mailProvider.sendMail(email, "Recuperação de senha", `O link para o reset é ${token}`)

  }
}

export { SendForgotPasswordMailUseCase }