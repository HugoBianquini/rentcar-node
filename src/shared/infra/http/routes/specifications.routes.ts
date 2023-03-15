import { Router } from "express";
import { checkAuthentication } from "../middlewares/checkAuthentication";
import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationRoutes.use(checkAuthentication)
specificationRoutes.post("/", createSpecificationController.handle)

export { specificationRoutes }