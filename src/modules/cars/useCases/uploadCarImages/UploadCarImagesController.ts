import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
  filename: string
}

class UplocadCarImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const images = req.files as IFiles[]

    const uploadCarImagesuseCase = container.resolve(UploadCarImagesUseCase)

    const images_name = images.map((file) => file.filename)

    await uploadCarImagesuseCase.execute({
      car_id: id,
      images_name,
    })

    return res.status(201).send()
  }
}

export { UplocadCarImagesController }