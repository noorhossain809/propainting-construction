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
exports.ServiceController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const services_service_1 = require("./services.service");
const parseJSONField = (field) => {
    if (typeof field === "string") {
        if (!field.trim())
            return undefined;
        try {
            return JSON.parse(field);
        }
        catch (err) {
            return undefined;
        }
    }
    return field;
};
const createService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const files = req.files;
    const heroImageFile = (_a = files === null || files === void 0 ? void 0 : files.heroImage) === null || _a === void 0 ? void 0 : _a[0];
    const contentImageFile = (_b = files === null || files === void 0 ? void 0 : files.contentImage) === null || _b === void 0 ? void 0 : _b[0];
    if (!heroImageFile || !contentImageFile) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: "Hero Image এবং Content Image দুটোই আবশ্যক",
            data: null,
        });
    }
    const payload = Object.assign(Object.assign({}, req.body), { order: req.body.order ? Number(req.body.order) : 0, isActive: req.body.isActive === "false" ? false : true, heroImage: {
            url: heroImageFile.path,
            alt: req.body.heroImageAlt || req.body.title || "",
        }, contentImage: {
            url: contentImageFile.path,
            alt: req.body.contentImageAlt || req.body.title || "",
        }, seo: parseJSONField(req.body.seo) });
    const result = yield services_service_1.ServiceService.createIntoDB(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Service created successfully",
        data: result,
    });
}));
const getAllServices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_service_1.ServiceService.getAllFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Services retrieved successfully",
        data: result,
    });
}));
const getSingleService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield services_service_1.ServiceService.getOneByIdFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Service retrieved successfully",
        data: result,
    });
}));
const updateService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id } = req.params;
    const files = req.files;
    const payload = Object.assign({}, req.body);
    if (req.body.order !== undefined)
        payload.order = Number(req.body.order);
    if (req.body.isActive !== undefined)
        payload.isActive = req.body.isActive !== "false";
    const heroImageFile = (_a = files === null || files === void 0 ? void 0 : files.heroImage) === null || _a === void 0 ? void 0 : _a[0];
    if (heroImageFile) {
        payload.heroImage = {
            url: heroImageFile.path,
            alt: req.body.heroImageAlt || req.body.title || "",
        };
    }
    const contentImageFile = (_b = files === null || files === void 0 ? void 0 : files.contentImage) === null || _b === void 0 ? void 0 : _b[0];
    if (contentImageFile) {
        payload.contentImage = {
            url: contentImageFile.path,
            alt: req.body.contentImageAlt || req.body.title || "",
        };
    }
    if (req.body.seo !== undefined) {
        payload.seo = parseJSONField(req.body.seo);
    }
    const result = yield services_service_1.ServiceService.updateIntoDB(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Service updated successfully",
        data: result,
    });
}));
const deleteService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield services_service_1.ServiceService.deleteFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Service deleted successfully",
        data: result,
    });
}));
exports.ServiceController = {
    createService,
    getAllServices,
    getSingleService,
    updateService,
    deleteService,
};
