"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamRoutes = void 0;
const express_1 = __importDefault(require("express"));
const uploadFile_1 = require("../../middlewares/uploadFile");
const team_controller_1 = require("./team.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(), uploadFile_1.upload.fields([{ name: "image", maxCount: 1 }]), team_controller_1.TeamController.createTeamMember);
router.get("/", team_controller_1.TeamController.getAllTeamMembers);
router.get("/:id", team_controller_1.TeamController.getSingleTeamMember);
router.patch("/:id", (0, auth_1.default)(), uploadFile_1.upload.fields([{ name: "image", maxCount: 1 }]), team_controller_1.TeamController.updateTeamMember);
router.delete("/:id", (0, auth_1.default)(), team_controller_1.TeamController.deleteTeamMember);
exports.TeamRoutes = router;
