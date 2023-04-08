import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {

  create({ expires_date, refresh_token, user_id }: ICreateUserTokentDTO): Promise<UserTokens>;

}

export { IUsersTokensRepository }