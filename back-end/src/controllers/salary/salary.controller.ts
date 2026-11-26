import type { NextFunction, Request, Response, } from "express";
import type { SalaryService } from "../../services/salary/salary.service.ts";

export class SalaryController {
    private readonly salaryService: SalaryService;

    constructor(salaryService: SalaryService) {
        this.salaryService = salaryService;
    }

    convertGrossToNet = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(await this.salaryService.convertGrossToNet(req.body))
        } catch (e) {
            next(e)
        }
    }
}