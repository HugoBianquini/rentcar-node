import { inject, injectable } from "tsyringe";
import { deleteFile } from "../../../../utils/file";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {

  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) { }

  async execute({ userId, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`)
    }

    await this.storageProvider.save(avatarFile, "avatar")

    user.avatar = avatarFile

    await this.usersRepository.create(user)
  }
}

export { UpdateUserAvatarUseCase }