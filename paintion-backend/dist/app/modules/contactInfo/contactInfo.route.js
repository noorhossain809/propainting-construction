"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactInfoRoutes = void 0;
const express_1 = __importDefault(require("express"));
const contactInfo_controller_1 = require("./contactInfo.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get("/", contactInfo_controller_1.ContactInfoController.getContactInfo);
router.patch("/", (0, auth_1.default)(), contactInfo_controller_1.ContactInfoController.updateContactInfo);
exports.ContactInfoRoutes = router;
