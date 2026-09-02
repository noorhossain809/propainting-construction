"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroSlideController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const heroSlide_service_1 = require("./heroSlide.service");
const createHeroSlide = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const files = req.files;
    const backgroundImageFile = (_a = files === null || files === void 0 ? void 0 : files.backgroundImage) === null || _a === void 0 ? void 0 : _a[0];
    const mediaType = req.body.mediaType === "video" ? "video" : "image";
    if (mediaType === "image" && !backgroundImageFile) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: "Background image is required when media type is image",
            data: null,
        });
    }
    if (mediaType === "video" && !req.body.videoUrl) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: "Video URL is required when media type is video",
            data: null,
        });
    }
    const payload = Object.assign(Object.assign({}, req.body), { mediaType, order: req.body.order ? Number(req.body.order) : 0, isActive: req.body.isActive === "false" ? false : true, backgroundImage: backgroundImageFile
            ? {
                url: backgroundImageFile.path,
                alt: req.body.backgroundImageAlt || req.body.title || "",
            }
            : undefined, videoUrl: mediaType === "video" ? req.body.videoUrl : undefined });
    const result = yield heroSlide_service_1.HeroSlideService.createIntoDB(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Hero slide created successfully",
        data: result,
    });
}));
const getAllHeroSlides = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield heroSlide_service_1.HeroSlideService.getAllFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Hero slides retrieved successfully",
        data: result,
    });
}));
const getSingleHeroSlide = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield heroSlide_service_1.HeroSlideService.getOneByIdFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Hero slide retrieved successfully",
        data: result,
    });
}));
const updateHeroSlide = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const files = req.files;
    const payload = Object.assign({}, req.body);
    if (req.body.order !== undefined)
        payload.order = Number(req.body.order);
    if (req.body.isActive !== undefined)
        payload.isActive = req.body.isActive !== "false";
    const backgroundImageFile = (_a = files === null || files === void 0 ? void 0 : files.backgroundImage) === null || _a === void 0 ? void 0 : _a[0];
    if (backgroundImageFile) {
        payload.backgroundImage = {
            url: backgroundImageFile.path,
            alt: req.body.backgroundImageAlt || req.body.title || "",
        };
    }
    if (req.body.mediaType !== undefined) {
        payload.mediaType = req.body.mediaType;
        // মিডিয়া টাইপ ভিন্ন হয়ে গেলে অপ্রাসঙ্গিক field মুছে দাও
        if (req.body.mediaType === "video") {
            payload.videoUrl = req.body.videoUrl;
        }
    }
    const result = yield heroSlide_service_1.HeroSlideService.updateIntoDB(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Hero slide updated successfully",
        data: result,
    });
}));
const deleteHeroSlide = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield heroSlide_service_1.HeroSlideService.deleteFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Hero slide deleted successfully",
        data: result,
    });
}));
exports.HeroSlideController = {
    createHeroSlide,
    getAllHeroSlides,
    getSingleHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
};
