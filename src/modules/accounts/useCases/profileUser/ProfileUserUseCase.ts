import { inject, injectable } from "tsyringe";
import { User } from "../../infra/typeorm/entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IUserResponseDTO } from "../../dtos/IUserResponseDTO";
import { UserMap } from "../../mappers/UserMap";

@injectable()
class ProfileUserUseCase {

  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository
  ) { }

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id)
    return UserMap.toDTO(user)
  }
}

export { ProfileUserUseCase }