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
exports.ConstructionProjectService = void 0;
const constructionProject_modal_1 = __importDefault(require("./constructionProject.modal"));
const createIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield constructionProject_modal_1.default.create(payload);
    return result;
});
const getAllFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield constructionProject_modal_1.default.find();
    return result;
});
const getOneByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield constructionProject_modal_1.default.findById({ _id: id });
    console.log('result Project', result);
    return result;
});
const updateIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield constructionProject_modal_1.default.findByIdAndUpdate(id, payload, {
        new: true, // updated document return করবে
        runValidators: true, // schema validation চালাবে update-এর সময়ও
    });
    return result;
});
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield constructionProject_modal_1.default.findByIdAndDelete(id);
    return result;
});
exports.ConstructionProjectService = {
    createIntoDB,
    getAllFromDB,
    getOneByIdFromDB,
    updateIntoDB,
    deleteFromDB
};
