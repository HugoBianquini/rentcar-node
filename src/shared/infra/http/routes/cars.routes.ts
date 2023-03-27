import { Router } from "express"
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController"
import { checkAdmin } from "../middlewares/checkAdmin"
import { checkAuthentication } from "../middlewares/checkAuthentication"

const carsRoutes = Router()

let createCarController = new CreateCarController()

carsRoutes.post("/", checkAuthentication, checkAdmin, createCarController.handle)

export { carsRoutes }