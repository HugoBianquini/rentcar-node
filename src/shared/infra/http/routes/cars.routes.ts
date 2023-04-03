import { Router } from "express"
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController"
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController"
import { CreateCarSpecificationUseCase } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationUseCase"
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController"
import { checkAdmin } from "../middlewares/checkAdmin"
import { checkAuthentication } from "../middlewares/checkAuthentication"

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()

carsRoutes.post("/", checkAuthentication, checkAdmin, createCarController.handle)

carsRoutes.get("/available", listAvailableCarsController.handle)

carsRoutes.post("/specifications/:id", checkAuthentication, checkAdmin, createCarSpecificationController.handle)

export { carsRoutes }