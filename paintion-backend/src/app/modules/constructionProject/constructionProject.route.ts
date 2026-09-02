import express from "express"
import { upload } from "../../middlewares/uploadFile"
import { ConstructionProjectController } from "./ConstructionProject.controller"
import auth from "../../middlewares/auth"


const router = express.Router()

router.post(
    "/",
    auth(),
    upload.fields([
        { name: "mainImage", maxCount: 1 },
        { name: "gallery", maxCount: 10 },
    ]),
    ConstructionProjectController.createProject
)

router.get("/", ConstructionProjectController.getAllProjects)
router.get("/:id", ConstructionProjectController.getSingleProject)
router.patch(
    "/:id",
    auth(),
    upload.fields([{ name: "gallery", maxCount: 10 }]),
    ConstructionProjectController.updateProject
)

router.delete("/:id", auth(), ConstructionProjectController.deleteProject)

export const ConstructionProjectRoutes = router