import express from "express"
import { upload } from "../../middlewares/uploadFile"
import { HeroSlideController } from "./heroSlide.controller"
import auth from "../../middlewares/auth"

const router = express.Router()

router.post(
    "/",
    auth(),
    upload.fields([{ name: "backgroundImage", maxCount: 1 }]),
    HeroSlideController.createHeroSlide
)

router.get("/", HeroSlideController.getAllHeroSlides)
router.get("/:id", HeroSlideController.getSingleHeroSlide)

router.patch(
    "/:id",
    auth(),
    upload.fields([{ name: "backgroundImage", maxCount: 1 }]),
    HeroSlideController.updateHeroSlide
)

router.delete("/:id", auth(), HeroSlideController.deleteHeroSlide)

export const HeroSlideRoutes = router