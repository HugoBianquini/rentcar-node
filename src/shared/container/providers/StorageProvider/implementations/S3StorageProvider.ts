import { S3 } from "@aws-sdk/client-s3"
import fs from "fs"
import mime from "mime"
import { resolve } from "path"

import { IStorageProvider } from "../IStorageProvider";
import upload from "../../../../../config/upload";

class S3StorageProvider implements IStorageProvider {

  private client: S3

  constructor() {
    this.client = new S3({
      region: process.env.AWS_REGION
    })
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file)

    const fileContent = await fs.promises.readFile(originalName)

    const ContentType = mime.getType(originalName)

    await this.client.putObject({
      Bucket: `${process.env.AWS_BUCKET}`,
      Key: `${folder}/${file}`,
      ACL: "public-read",
      Body: fileContent,
      ContentType
    })

    await fs.promises.unlink(originalName)

    return file
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}`,
        Key: `${folder}/${file}`,
      })
  }
}

export { S3StorageProvider }