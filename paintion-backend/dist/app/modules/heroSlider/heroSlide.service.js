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
exports.HeroSlideService = void 0;
const heroSlide_model_1 = __importDefault(require("./heroSlide.model"));
const createIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield heroSlide_model_1.default.create(payload);
    return result;
});
const getAllFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield heroSlide_model_1.default.find().sort({ order: 1, createdAt: -1 });
    return result;
});
const getOneByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield heroSlide_model_1.default.findById(id);
    return result;
});
const updateIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield heroSlide_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield heroSlide_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.HeroSlideService = {
    createIntoDB,
    getAllFromDB,
    getOneByIdFromDB,
    updateIntoDB,
    deleteFromDB,
};
