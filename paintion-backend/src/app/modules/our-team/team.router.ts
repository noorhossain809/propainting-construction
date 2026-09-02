import express from "express"
import { upload } from "../../middlewares/uploadFile"
import { TeamController } from "./team.controller"
import auth from "../../middlewares/auth"

const router = express.Router()

router.post(
    "/",
    auth(),
    upload.fields([{ name: "image", maxCount: 1 }]),
    TeamController.createTeamMember
)

router.get("/", TeamController.getAllTeamMembers)
router.get("/:id", TeamController.getSingleTeamMember)

router.patch(
    "/:id",
    auth(),
    upload.fields([{ name: "image", maxCount: 1 }]),
    TeamController.updateTeamMember
)

router.delete("/:id", auth(), TeamController.deleteTeamMember)

export const TeamRoutes = router