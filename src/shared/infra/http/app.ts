import "dotenv/config"
import express from 'express';

import "express-async-errors"

import swaggerUi from "swagger-ui-express"

import swaggerFile from "../../../swagger.json";

import createConnection from "../typeorm"

import "../../container"

import { router } from './routes';
import { errorMiddleware } from './middlewares/errorMiddleware';
import upload from "../../../config/upload";

createConnection("database")

const app = express()

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`))
app.use("/cars", express.static(`${upload.tmpFolder}/cars`))


app.use(router)

app.use(errorMiddleware)

export { app }