import { verify, sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository"
import auth from "../../../../config/auth"
import { AppError } from "../../../../shared/errors/AppError"
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider"

interface ITokenResponse {
  token: string;
  refresh_token: string
}
interface IPayload {
  sub: string;
  email: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) { }

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload

    const user_id = sub

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token)

    if (!userToken) {
      throw new AppError("Refresh Token does not exist!")
    }

    await this.usersTokensRepository.deleteById(userToken.id)

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token
    })

    const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)

    await this.usersTokensRepository.create({
      user_id,
      expires_date,
      refresh_token
    })

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token
    })

    return { token: newToken, refresh_token }

  }
}

export { RefreshTokenUseCase }