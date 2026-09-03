"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactMessageRoutes = void 0;
const express_1 = __importDefault(require("express"));
const contactMessage_controller_1 = require("./contactMessage.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// Public: visitors submit the quote/contact form
router.post("/", contactMessage_controller_1.ContactMessageController.createMessage);
// Admin-only: manage submitted messages
router.get("/", (0, auth_1.default)(), contactMessage_controller_1.ContactMessageController.getAllMessages);
router.get("/:id", (0, auth_1.default)(), contactMessage_controller_1.ContactMessageController.getSingleMessage);
router.patch("/:id", (0, auth_1.default)(), contactMessage_controller_1.ContactMessageController.updateMessageStatus);
router.delete("/:id", (0, auth_1.default)(), contactMessage_controller_1.ContactMessageController.deleteMessage);
exports.ContactMessageRoutes = router;
