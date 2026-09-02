import express from "express"
import { ContactMessageController } from "./contactMessage.controller"
import auth from "../../middlewares/auth"

const router = express.Router()

// Public: visitors submit the quote/contact form
router.post("/", ContactMessageController.createMessage)

// Admin-only: manage submitted messages
router.get("/", auth(), ContactMessageController.getAllMessages)
router.get("/:id", auth(), ContactMessageController.getSingleMessage)
router.patch("/:id", auth(), ContactMessageController.updateMessageStatus)
router.delete("/:id", auth(), ContactMessageController.deleteMessage)

export const ContactMessageRoutes = router
