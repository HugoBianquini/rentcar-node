
import fs from "fs"
import handlebars from "handlebars"
import nodemailer, { Transporter } from "nodemailer"
import { IMailProvider } from "../IMailProvider";

class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })

      this.client = transporter
    }).catch(err => console.error(err))

  }

  async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {

    const templateFileContent = fs.readFileSync(path).toString("utf-8")

    const parseTemplate = handlebars.compile(templateFileContent)

    const templateHTML = parseTemplate(variables)

    const message = await this.client.sendMail({
      to,
      from: "RentCar <noreply@rentcar.com.br>",
      subject,
      html: templateHTML
    })

    console.log("Message sent: %s", message.messageId)
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message))

  }

}

export { EtherealMailProvider }