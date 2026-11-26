import { Router } from "express";
import type { SalaryService } from "./services/salary/salary.service.ts";
import { SalaryController } from "./controllers/salary/salary.controller.ts";


export const routes = (salaryService: SalaryService) => {
    const router = Router()
    const salaryController = new SalaryController(salaryService);

    router.post('/grosstonet', salaryController.convertGrossToNet)

    return router;
}