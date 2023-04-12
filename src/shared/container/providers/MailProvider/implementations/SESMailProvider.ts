
import fs from "fs"
import handlebars from "handlebars"
import { SES } from "@aws-sdk/client-ses"
import nodemailer, { Transporter } from "nodemailer"
import { IMailProvider } from "../IMailProvider";

class SESMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION
      })
    })
  }

  async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {

    const templateFileContent = fs.readFileSync(path).toString("utf-8")

    const parseTemplate = handlebars.compile(templateFileContent)

    const templateHTML = parseTemplate(variables)

    await this.client.sendMail({
      to,
      from: "RentCar <noreply@rentcar.com.br>",
      subject,
      html: templateHTML
    })
  }

}

export { SESMailProvider }