import { Router } from "express";
import { CreateRentalController } from "../../../../modules/rentals/useCases/createRental/CreateRentalController";
import { checkAuthentication } from "../middlewares/checkAuthentication";
import { DevolutionRentalController } from "../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController";

const rentalRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()

rentalRoutes.post("/", checkAuthentication, createRentalController.handle)
rentalRoutes.post("/devolution/:id", checkAuthentication, devolutionRentalController.handle)


export { rentalRoutes }