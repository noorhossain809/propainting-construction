import nodemailer from 'nodemailer';
import config from '../config';
import { logger, errorlogger } from '../shared/logger';

type MailPayload = {
  to?: string;
  subject: string;
  html: string;
  replyTo?: string;
};

// Cached transporter so we don't rebuild the SMTP connection per email.
let transporter: nodemailer.Transporter | null = null;

const getTransporter = (): nodemailer.Transporter | null => {
  const { host, port, user, pass } = config.smtp;

  // Email is optional: if SMTP isn't configured, we skip sending (and log)
  // rather than failing the request that triggered it.
  if (!host || !user || !pass) {
    return null;
  }

  if (!transporter) {
    const portNum = Number(port) || 587;
    transporter = nodemailer.createTransport({
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
export const sendEmail = async (payload: MailPayload): Promise<void> => {
  const tx = getTransporter();
  const to = payload.to || config.smtp.to;

  if (!tx || !to) {
    logger.info(
      'Email skipped: SMTP not configured (set SMTP_HOST/SMTP_USER/SMTP_PASS/MAIL_TO).'
    );
    return;
  }

  try {
    await tx.sendMail({
      from: config.smtp.from || config.smtp.user,
      to,
      subject: payload.subject,
      html: payload.html,
      replyTo: payload.replyTo,
    });
    logger.info(`Email sent to ${to}: ${payload.subject}`);
  } catch (error) {
    errorlogger.error('Failed to send email', error);
  }
};
