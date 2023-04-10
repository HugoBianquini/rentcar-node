import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UserRepository";
import { UsersTokensRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "../../../../config/auth";

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
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload

    req.user = {
      id: user_id
    }

    next()

  } catch {
    throw new AppError("Token missing", 401)
  }

}