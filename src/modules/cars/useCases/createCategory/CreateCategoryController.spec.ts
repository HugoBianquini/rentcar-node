import request from "supertest"
import { Connection } from "typeorm"
import { hash } from "bcryptjs"
import { v4 as uuidV4 } from "uuid"

import { app } from "../../../../shared/infra/http/app"
import createConnection from "../../../../shared/infra/typeorm"

let conn: Connection

describe("Create Category Controller", () => {

  beforeAll(async () => {
    conn = await createConnection()
    await conn.runMigrations()

    const id = uuidV4()
    const password = await hash("admin", 8)

    await conn.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentcar.com', '${password}', true, 'now()', 'NNNN')`
    )
  })

  afterAll(async () => {
    await conn.dropDatabase()
    await conn.close()
  })

  it("should be able to create a new category", async () => {

    const responseToken = await request(app).post("/sessions")
      .send({
        email: "admin@rentcar.com",
        password: "admin"
      })

    const { refresh_token } = responseToken.body

    const response = await request(app).post("/categories").send({
      name: "test",
      description: "test"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    })

    expect(response.status).toBe(201)
  })

  it("should not be able to create a new category with existent name", async () => {

    const responseToken = await request(app).post("/sessions")
      .send({
        email: "admin@rentcar.com",
        password: "admin"
      })

    const { refresh_token } = responseToken.body

    const response = await request(app).post("/categories").send({
      name: "test",
      description: "test"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    })

    expect(response.status).toBe(400)
  })
})