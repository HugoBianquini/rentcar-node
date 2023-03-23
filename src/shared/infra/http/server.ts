import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors"

import swaggerUi from "swagger-ui-express"

import swaggerFile from "../../../swagger.json";

import createConnection from "../typeorm"

import "../../container"

import { router } from './routes';
import { errorMiddleware } from './middlewares/errorMiddleware';

createConnection("localhost")

const app = express()

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

app.use(errorMiddleware)

app.listen(3333, () => console.log("Server is running"))