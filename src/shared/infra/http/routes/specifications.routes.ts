import { Router } from "express";
import { checkAuthentication } from "../middlewares/checkAuthentication";
import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { checkAdmin } from "../middlewares/checkAdmin";

const specificationRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationRoutes.post("/", checkAuthentication, checkAdmin, createSpecificationController.handle)

export { specificationRoutes }