import { inject } from "tsyringe";
import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  userId: string;
  avatarFile: string;
}

class UpdateUserAvatarUseCase {

  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository
  ) { }

  async execute({ userId, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    user.avatar = avatarFile

    await this.usersRepository.create(user)
  }
}

export { UpdateUserAvatarUseCase }