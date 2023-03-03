import { request, Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(req: Request, res: Response) {
    const { id } = request.user

    const avatarFile = null

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)

    await updateUserAvatarUseCase.execute({ userId: id, avatarFile })

    return res.status(204).send()
  }
}

export { UpdateUserAvatarController }