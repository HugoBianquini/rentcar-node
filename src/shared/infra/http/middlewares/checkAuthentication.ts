import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UserRepository";

interface IPayload {
  sub: string
}

export async function checkAuthentication(req: Request, res: Response, next: NextFunction) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(token, "secret_key") as IPayload

    const usersRepository = new UserRepository()
    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new AppError("Token missing", 401)
    }

    req.user = {
      id: user.id
    }

    next()

  } catch {
    throw new AppError("Token missing", 401)
  }

}