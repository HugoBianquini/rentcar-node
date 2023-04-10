import { inject, injectable } from "tsyringe";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { hash } from "bcryptjs";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUseCase {

  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("UserRepository")
    private usersRepository: IUserRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) { }

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token)

    if (!userToken) {
      throw new AppError("Token invalid!")
    }

    if (this.dateProvider.isExpired(
      userToken.expires_date,
      this.dateProvider.dateNow()
    )) {
      throw new AppError("Token expired!")
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    user.password = await hash(password, 8)

    await this.usersRepository.create(user)

    await this.usersTokensRepository.deleteById(userToken.id)
  }
}

export { ResetPasswordUseCase }