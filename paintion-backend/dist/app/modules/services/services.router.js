"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const uploadFile_1 = require("../../middlewares/uploadFile");
const services_controller_1 = require("./services.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(), uploadFile_1.upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "contentImage", maxCount: 1 },
]), services_controller_1.ServiceController.createService);
router.get("/", services_controller_1.ServiceController.getAllServices);
router.get("/:id", services_controller_1.ServiceController.getSingleService);
router.patch("/:id", (0, auth_1.default)(), uploadFile_1.upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "contentImage", maxCount: 1 },
]), services_controller_1.ServiceController.updateService);
router.delete("/:id", (0, auth_1.default)(), services_controller_1.ServiceController.deleteService);
exports.ServiceRoutes = router;
