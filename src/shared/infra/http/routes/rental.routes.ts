import { Router } from "express";
import { CreateRentalController } from "../../../../modules/rentals/useCases/createRental/CreateRentalController";
import { checkAuthentication } from "../middlewares/checkAuthentication";

const rentalRoutes = Router()

const createRentalController = new CreateRentalController()

rentalRoutes.post("/", checkAuthentication, createRentalController.handle)

export { rentalRoutes }