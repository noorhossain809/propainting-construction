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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const logger_1 = require("../shared/logger");
// Cached transporter so we don't rebuild the SMTP connection per email.
let transporter = null;
const getTransporter = () => {
    const { host, port, user, pass } = config_1.default.smtp;
    // Email is optional: if SMTP isn't configured, we skip sending (and log)
    // rather than failing the request that triggered it.
    if (!host || !user || !pass) {
        return null;
    }
    if (!transporter) {
        const portNum = Number(port) || 587;
        transporter = nodemailer_1.default.createTransport({
            host,
            port: portNum,
            secure: portNum === 465, // 465 = implicit TLS, otherwise STARTTLS
            auth: { user, pass },
        });
    }
    return transporter;
};
/**
 * Send an email. Never throws — email is a best-effort side effect, so a
 * mailer failure must not break the API request that invoked it.
 */
const sendEmail = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const tx = getTransporter();
    const to = payload.to || config_1.default.smtp.to;
    if (!tx || !to) {
        logger_1.logger.info('Email skipped: SMTP not configured (set SMTP_HOST/SMTP_USER/SMTP_PASS/MAIL_TO).');
        return;
    }
    try {
        yield tx.sendMail({
            from: config_1.default.smtp.from || config_1.default.smtp.user,
            to,
            subject: payload.subject,
            html: payload.html,
            replyTo: payload.replyTo,
        });
        logger_1.logger.info(`Email sent to ${to}: ${payload.subject}`);
    }
    catch (error) {
        logger_1.errorlogger.error('Failed to send email', error);
    }
});
exports.sendEmail = sendEmail;
