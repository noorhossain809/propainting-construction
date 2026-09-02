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
exports.ContactInfoService = void 0;
const contactInfo_model_1 = __importDefault(require("./contactInfo.model"));
const getFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield contactInfo_model_1.default.findOne();
    if (!result) {
        result = yield contactInfo_model_1.default.create({
            phoneOne: "",
            phoneTwo: "",
            workingHours: "",
            email: "",
            location: "",
            licenseNumber: "",
            insuranceText: "",
        });
    }
    return result;
});
const updateIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield contactInfo_model_1.default.findOne();
    if (!existing) {
        const result = yield contactInfo_model_1.default.create(payload);
        return result;
    }
    const result = yield contactInfo_model_1.default.findByIdAndUpdate(existing._id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.ContactInfoService = {
    getFromDB,
    updateIntoDB,
};
