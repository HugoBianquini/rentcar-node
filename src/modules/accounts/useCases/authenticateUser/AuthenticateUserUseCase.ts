import { compare } from "bcryptjs"
import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken"
import { IUserRepository } from "../../repositories/IUserRepository";


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error("Email or password incorrect")
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error("Email or password incorrect")
    }

    const token = sign({}, "secret_key", {
      subject: user.id,
      expiresIn: "1d"
    })

    return {
      user: {
        name: user.name,
        email: user.email
      },
      token
    }
  }
}

export { AuthenticateUserUseCase }