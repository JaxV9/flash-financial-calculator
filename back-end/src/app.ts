import express, { type Express } from 'express';
import type { SalaryService } from './services/salary/salary.service.ts';
import { routes } from './routes.ts';

export interface AppDependencies {
    salaryService: SalaryService;
}

export const createApp = ({ salaryService }: AppDependencies): Express => {
    const app: Express = express();
    app.use(express.json());
    app.use(routes(salaryService))
    return app;
}