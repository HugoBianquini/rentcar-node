import { Router } from "express"
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController"
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController"
import { checkAdmin } from "../middlewares/checkAdmin"
import { checkAuthentication } from "../middlewares/checkAuthentication"

const carsRoutes = Router()

let createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()

carsRoutes.post("/", checkAuthentication, checkAdmin, createCarController.handle)

carsRoutes.get("/available", listAvailableCarsController.handle)

export { carsRoutes }