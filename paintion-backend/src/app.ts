import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';


import cookieParser from 'cookie-parser';

const app: Application = express();

// Allowed browser origins (site + admin, local + production). Extra origins can
// be added via the CORS_ORIGINS env var (comma-separated) without a code change.
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://propaintconstruction.com',
  'https://www.propaintconstruction.com',
  'https://admin.propaintconstruction.com',
  ...(process.env.CORS_ORIGINS?.split(',').map(o => o.trim()).filter(Boolean) ?? []),
];

app.use(cors({
  origin(origin, callback) {
    // Allow non-browser clients (no Origin header) and any whitelisted origin.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);


//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
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

export default app;
