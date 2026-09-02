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
// src/scripts/seedContactInfo.ts — একবার চালিয়ে ডিলিট করে দিন
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const contactInfo_model_1 = __importDefault(require("../app/modules/contactInfo/contactInfo.model"));
dotenv_1.default.config();
const seedContactInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.DATABASE_URL);
        console.log("Database connected");
        const existing = yield contactInfo_model_1.default.findOne();
        const contactData = {
            phoneOne: "+1 (917) 539-8168",
            phoneTwo: "+1 (212) 380-3751",
            workingHours: "Mon-Fri 7AM-6PM",
            email: "mrh_nyc@yahoo.com",
            location: "4017, ave D, Brooklyn New York, 11203",
            licenseNumber: "2105436-DCA",
            insuranceText: "Fully insured for your protection",
        };
        if (existing) {
            // আগে থেকে document থাকলে সেটাই আপডেট করে দাও, duplicate না বানিয়ে
            yield contactInfo_model_1.default.findByIdAndUpdate(existing._id, contactData, {
                new: true,
                runValidators: true,
            });
            console.log("Existing Contact Info updated successfully");
        }
        else {
            yield contactInfo_model_1.default.create(contactData);
            console.log("Contact Info created successfully");
        }
        process.exit(0);
    }
    catch (err) {
        console.error("Error seeding contact info:", err);
        process.exit(1);
    }
});
seedContactInfo();
