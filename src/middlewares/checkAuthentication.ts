import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserRepository } from "../modules/accounts/repositories/implementations/UserRepository";

interface IPayload {
  sub: string
}

export async function checkAuthentication(req: Request, res: Response, next: NextFunction) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing")
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(token, "secret_key") as IPayload

    const usersRepository = new UserRepository()
    const userExists = await usersRepository.findById(user_id)

    if (!userExists) {
      throw new Error("User does not exist")
    }

    next()

  } catch {
    throw new Error("Invalid token!")
  }

}