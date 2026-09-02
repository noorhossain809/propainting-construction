"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstructionProjectRoutes = void 0;
const express_1 = __importDefault(require("express"));
const uploadFile_1 = require("../../middlewares/uploadFile");
const ConstructionProject_controller_1 = require("./ConstructionProject.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(), uploadFile_1.upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
]), ConstructionProject_controller_1.ConstructionProjectController.createProject);
router.get("/", ConstructionProject_controller_1.ConstructionProjectController.getAllProjects);
router.get("/:id", ConstructionProject_controller_1.ConstructionProjectController.getSingleProject);
router.patch("/:id", (0, auth_1.default)(), uploadFile_1.upload.fields([{ name: "gallery", maxCount: 10 }]), ConstructionProject_controller_1.ConstructionProjectController.updateProject);
router.delete("/:id", (0, auth_1.default)(), ConstructionProject_controller_1.ConstructionProjectController.deleteProject);
exports.ConstructionProjectRoutes = router;
