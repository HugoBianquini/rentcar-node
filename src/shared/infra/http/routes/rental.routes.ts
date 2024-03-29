import { Router } from "express";
import { CreateRentalController } from "../../../../modules/rentals/useCases/createRental/CreateRentalController";
import { checkAuthentication } from "../middlewares/checkAuthentication";
import { DevolutionRentalController } from "../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "../../../../modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

const rentalRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalsByUserController = new ListRentalsByUserController()

rentalRoutes.post("/", checkAuthentication, createRentalController.handle)
rentalRoutes.post("/devolution/:id", checkAuthentication, devolutionRentalController.handle)
rentalRoutes.get("/user", checkAuthentication, listRentalsByUserController.handle)


export { rentalRoutes }