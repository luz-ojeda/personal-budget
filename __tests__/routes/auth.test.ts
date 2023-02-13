import { Server } from "http"
import supertest from "supertest"
import createApp from "../../createApp"
import { getPool } from "../../src/db"

const route = "/auth"

describe("POST", () => {
  let app = createApp()
  let server: Server

  const user = {
    username: "authTestUser",
    password: "password",
  }

  beforeAll(() => {
    server = app.listen()
  })

  afterAll(() => {
    server.close()
    getPool().end()
  })

  it("should let user sign up", async () => {
    const response = await supertest(app).post(`${route}/signup`).send(user)

    expect(response.statusCode).toEqual(201)
  })

  it("should let user sign in", async () => {
    const response = await supertest(app)
      .post(`${route}/signin`)
      .send({ username: user.username, password: user.password  })

    expect(response.statusCode).toEqual(200)
  })
})
