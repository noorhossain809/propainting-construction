"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// Allowed browser origins (site + admin, local + production). Extra origins can
// be added via the CORS_ORIGINS env var (comma-separated) without a code change.
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://propaintconstruction.com',
    'https://www.propaintconstruction.com',
    'https://admin.propaintconstruction.com',
    ...((_b = (_a = process.env.CORS_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(',').map(o => o.trim()).filter(Boolean)) !== null && _b !== void 0 ? _b : []),
];
app.use((0, cors_1.default)({
    origin(origin, callback) {
        // Allow non-browser clients (no Origin header) and any whitelisted origin.
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1', routes_1.default);
//global error handler
app.use(globalErrorHandler_1.default);
//handle not found
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
    next();
});
exports.default = app;
