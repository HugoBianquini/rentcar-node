import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { IUserRepository } from "../../../repositories/IUserRepository";

class UserRepository implements IUserRepository {

  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User)
  }

  async create({ name, email, driver_license, password, avatar, id }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      avatar,
      id,
    })

    await this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email })
    return user
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user
  }

}

export { UserRepository }