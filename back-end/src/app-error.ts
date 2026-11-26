import type { ErrorRequestHandler } from "express";

export class AppError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export class ValidationError extends AppError {
    constructor(message: string) { super(message, 400); }
}

export class ConflictError extends AppError {
    constructor(message: string) { super(message, 409); }
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof AppError) return res.status(err.status).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: 'error' });
};