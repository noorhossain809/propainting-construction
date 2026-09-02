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
// src/scripts/seedAdmin.ts
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_modal_1 = __importDefault(require("../app/modules/user/user.modal"));
dotenv_1.default.config();
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.DATABASE_URL);
        console.log("Database connected");
        const existing = yield user_modal_1.default.findOne({ email: "noorhossainvip809@gmail.com" });
        if (existing) {
            console.log("Admin already exists, skipping.");
            process.exit(0);
        }
        // bcrypt.hash() এখানে করা হচ্ছে না — model এর pre("save") hook নিজে hash করে দেবে
        yield user_modal_1.default.create({
            name: "Admin",
            email: "noorhossainvip809@gmail.com",
            password: "admin1234",
            role: "admin",
        });
        console.log("Admin created successfully");
        process.exit(0);
    }
    catch (err) {
        console.error("Error seeding admin:", err);
        process.exit(1);
    }
});
seedAdmin();
