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
exports.ConstructionProjectController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const constructionProject_service_1 = require("./constructionProject.service");
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
// const createProject = catchAsync(async (req: Request, res: Response) => {
//     const files = req.files as { [fieldname: string]: Express.Multer.File[] }
//     const parseJSONField = (field: unknown) => {
//         if (typeof field === "string") {
//             if (!field.trim()) return undefined
//             try {
//                 return JSON.parse(field)
//             } catch (err) {
//                 return undefined
//             }
//         }
//         return field
//     }
//     const payload = {
//         ...req.body,
//         mainImage: parseJSONField(req.body.mainImage),
//         gallery: files?.gallery?.map((file) => file.path) || [],
//         results: req.body.results ? req.body.results.split("\n") : [],
//         testimonial: parseJSONField(req.body.testimonial),
//         seo: parseJSONField(req.body.seo),
//     }
//     const result = await ConstructionProjectService.createIntoDB(payload)
//     sendResponse(res, {
//         statusCode: httpStatus.CREATED,
//         success: true,
//         message: "Project created successfully",
//         data: result,
//     })
// })
const createProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const files = req.files;
    const mainImageFile = (_a = files === null || files === void 0 ? void 0 : files.mainImage) === null || _a === void 0 ? void 0 : _a[0];
    const payload = Object.assign(Object.assign({}, req.body), { mainImage: mainImageFile
            ? {
                url: mainImageFile.path, // Cloudinary URL, multer-storage-cloudinary থেকে
                alt: req.body.mainImageAlt || req.body.title || "",
            }
            : undefined, gallery: ((_b = files === null || files === void 0 ? void 0 : files.gallery) === null || _b === void 0 ? void 0 : _b.map((file) => file.path)) || [], results: req.body.results ? req.body.results.split("\n") : [], testimonial: parseJSONField(req.body.testimonial), seo: parseJSONField(req.body.seo) });
    const result = yield constructionProject_service_1.ConstructionProjectService.createIntoDB(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Project created successfully",
        data: result,
    });
}));
const getAllProjects = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield constructionProject_service_1.ConstructionProjectService.getAllFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Projects retrieved successfully",
        data: result,
    });
}));
const getSingleProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield constructionProject_service_1.ConstructionProjectService.getOneByIdFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Project retrieved successfully",
        data: result,
    });
}));
const updateProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id } = req.params;
    const files = req.files;
    const payload = Object.assign({}, req.body);
    const mainImageFile = (_a = files === null || files === void 0 ? void 0 : files.mainImage) === null || _a === void 0 ? void 0 : _a[0];
    if (mainImageFile) {
        payload.mainImage = {
            url: mainImageFile.path,
            alt: req.body.mainImageAlt || req.body.title || "",
        };
    }
    else if (req.body.mainImage !== undefined) {
        // যদি নতুন file না দেয়, কিন্তু alt টেক্সট বা অন্য কিছু body তে থাকে
        payload.mainImage = parseJSONField(req.body.mainImage);
    }
    if (req.body.testimonial !== undefined) {
        payload.testimonial = parseJSONField(req.body.testimonial);
    }
    if (req.body.seo !== undefined) {
        payload.seo = parseJSONField(req.body.seo);
    }
    if (req.body.results !== undefined) {
        payload.results = req.body.results ? req.body.results.split("\n") : [];
    }
    if ((_b = files === null || files === void 0 ? void 0 : files.gallery) === null || _b === void 0 ? void 0 : _b.length) {
        payload.gallery = files.gallery.map((file) => file.path);
    }
    const result = yield constructionProject_service_1.ConstructionProjectService.updateIntoDB(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Project updated successfully",
        data: result,
    });
}));
const deleteProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield constructionProject_service_1.ConstructionProjectService.deleteFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Project deleted successfully",
        data: result,
    });
}));
exports.ConstructionProjectController = {
    createProject,
    getAllProjects,
    getSingleProject,
    updateProject,
    deleteProject
};
