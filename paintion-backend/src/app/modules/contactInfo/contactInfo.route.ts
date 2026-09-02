import express from "express"
import { ContactInfoController } from "./contactInfo.controller"
import auth from "../../middlewares/auth"

const router = express.Router()

router.get("/", ContactInfoController.getContactInfo)
router.patch("/", auth(), ContactInfoController.updateContactInfo)

export const ContactInfoRoutes = router