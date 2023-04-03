import { Router } from "express"
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController"
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController"
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController"
import { checkAdmin } from "../middlewares/checkAdmin"
import { checkAuthentication } from "../middlewares/checkAuthentication"
import { UplocadCarImagesController } from "../../../../modules/cars/useCases/uploadCarImages/UploadCarImagesController"
import multer from "multer"
import uploadConfig from "../../../../config/upload"

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImageController = new UplocadCarImagesController()

const uploadCarImages = multer(uploadConfig.upload("./tmp/cars"))

carsRoutes.post("/", checkAuthentication, checkAdmin, createCarController.handle)

carsRoutes.get("/available", listAvailableCarsController.handle)

carsRoutes.post("/specifications/:id", checkAuthentication, checkAdmin, createCarSpecificationController.handle)

carsRoutes.post("/images/:id", checkAuthentication, checkAdmin, uploadCarImages.array("images"), uploadCarImageController.handle)

export { carsRoutes }