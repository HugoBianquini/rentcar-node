import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid"
import { resolve } from "path"

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
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) { }

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email)

    const templatePath = resolve(__dirname, "..", "..", "views", "mails", "forgotPassword.hbs")

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

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_PASS_MAIL_URL}${token}`
    }

    await this.mailProvider.sendMail(email, "Recuperação de senha", variables, templatePath)

  }
}

export { SendForgotPasswordMailUseCase }