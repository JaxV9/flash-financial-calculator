import { ValidationError } from "../../app-error.ts";
import type { SalaryRepository } from "../../repositories/salary.repository.ts";
import type { GrossToNetResult, Salary } from "../../types.ts";

export class SalaryService {
    private readonly repo: SalaryRepository;

    constructor(repo: SalaryRepository) {
        this.repo = repo;
    }

    convertGrossToNet(salary: Salary): GrossToNetResult {

        if (salary.amount < 0 || salary.ratePAS < 0) throw new ValidationError('negative numbers are not allowed')
        if (salary.ratePAS > 100) throw new ValidationError('ratePAS too high')

        const grossYear = salary.frequency === 'month' ? salary.amount * 12 : salary.amount;
        const grossMonth = salary.frequency === 'year' ? salary.amount / 12 : salary.amount;
        const rateDues = salary.status === 'executive' ? 0.25 : 0.22;

        const netBeforeTaxesYear = grossYear * (1 - rateDues);
        const netAfterTaxesYear = netBeforeTaxesYear * (1 - salary.ratePAS / 100)

        const netBeforeTaxesMonth = grossMonth * (1 - rateDues);
        const netAfterTaxesMonth = netBeforeTaxesMonth * (1 - salary.ratePAS / 100)

        const bossCostYear = grossYear * 1.42;
        const bossCostMonth = grossMonth * 1.42;

        const result = {
            gross: salary.frequency === 'year' ? grossMonth : grossYear,
            netMonth: netAfterTaxesMonth,
            netYear: netAfterTaxesYear,
            bossCostMonth: bossCostMonth,
            bossCostYear: bossCostYear
        }

        this.repo.grossToNet(result);

        return result;
    }

}