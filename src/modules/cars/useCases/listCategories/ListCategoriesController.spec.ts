import request from "supertest"
import { Connection } from "typeorm"
import { hash } from "bcryptjs"
import { v4 as uuidV4 } from "uuid"

import { app } from "../../../../shared/infra/http/app"
import createConnection from "../../../../shared/infra/typeorm"

let conn: Connection

describe("List Categories Controller", () => {

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

  it("should be able to list categories", async () => {

    const responseToken = await request(app).post("/sessions")
      .send({
        email: "admin@rentcar.com",
        password: "admin"
      })

    const { token } = responseToken.body

    await request(app).post("/categories").send({
      name: "test",
      description: "test"
    }).set({
      Authorization: `Bearer ${token}`
    })

    const response = await request(app).get("/categories")

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0]).toHaveProperty("id")
    expect(response.body[0].name).toEqual("test")

  })
})