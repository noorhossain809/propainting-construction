import express from "express"
import { upload } from "../../middlewares/uploadFile"
import { ServiceController } from "./services.controller"
import auth from "../../middlewares/auth"

const router = express.Router()

router.post(
    "/",
    auth(),
    upload.fields([
        { name: "heroImage", maxCount: 1 },
        { name: "contentImage", maxCount: 1 },
    ]),
    ServiceController.createService
)

router.get("/", ServiceController.getAllServices)
router.get("/:id", ServiceController.getSingleService)

router.patch(
    "/:id",
    auth(),
    upload.fields([
        { name: "heroImage", maxCount: 1 },
        { name: "contentImage", maxCount: 1 },
    ]),
    ServiceController.updateService
)

router.delete("/:id", auth(), ServiceController.deleteService)

export const ServiceRoutes = router