import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UserRepository";
import { AppError } from "../../../errors/AppError";

export async function checkAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user

  const usersRepository = new UserRepository()
  const user = await usersRepository.findById(id)

  if (!user.isAdmin) {
    throw new AppError("User is not an admin")
  }

  return next()
}