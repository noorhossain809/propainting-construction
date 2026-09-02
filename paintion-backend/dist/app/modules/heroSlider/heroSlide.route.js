"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroSlideRoutes = void 0;
const express_1 = __importDefault(require("express"));
const uploadFile_1 = require("../../middlewares/uploadFile");
const heroSlide_controller_1 = require("./heroSlide.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(), uploadFile_1.upload.fields([{ name: "backgroundImage", maxCount: 1 }]), heroSlide_controller_1.HeroSlideController.createHeroSlide);
router.get("/", heroSlide_controller_1.HeroSlideController.getAllHeroSlides);
router.get("/:id", heroSlide_controller_1.HeroSlideController.getSingleHeroSlide);
router.patch("/:id", (0, auth_1.default)(), uploadFile_1.upload.fields([{ name: "backgroundImage", maxCount: 1 }]), heroSlide_controller_1.HeroSlideController.updateHeroSlide);
router.delete("/:id", (0, auth_1.default)(), heroSlide_controller_1.HeroSlideController.deleteHeroSlide);
exports.HeroSlideRoutes = router;
