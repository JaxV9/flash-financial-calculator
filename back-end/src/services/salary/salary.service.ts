import { ValidationError } from "../../app-error.ts";
import type { SalaryRepository } from "../../repositories/salary.repository.ts";
import type { GrossToNetResult, Salary } from "../../types.ts";

// Barème progressif de l'impôt sur le revenu 2026 (revenus 2025) pour 1 part
const INCOME_TAX_BRACKETS: ReadonlyArray<{ limit: number; rate: number }> = [
    { limit: 11600, rate: 0 },
    { limit: 29579, rate: 0.11 },
    { limit: 84577, rate: 0.30 },
    { limit: 181917, rate: 0.41 },
    { limit: Infinity, rate: 0.45 },
];

const STANDARD_DEDUCTION_RATE = 0.10;

function roundCents(value: number): number {
    return Math.round(value * 100) / 100;
}

function calculateIncomeTax(netBeforeTaxesYear: number, taxParts: number): number {
    const taxablePerPart = (netBeforeTaxesYear * (1 - STANDARD_DEDUCTION_RATE)) / taxParts;
    let taxPerPart = 0;
    let previousLimit = 0;

    for (const bracket of INCOME_TAX_BRACKETS) {
        if (taxablePerPart <= previousLimit) break;
        const taxableInBracket = Math.min(taxablePerPart, bracket.limit) - previousLimit;
        taxPerPart += taxableInBracket * bracket.rate;
        previousLimit = bracket.limit;
    }

    return roundCents(taxPerPart * taxParts);
}

export class SalaryService {
    private readonly repo: SalaryRepository;

    constructor(repo: SalaryRepository) {
        this.repo = repo;
    }

    convertGrossToNet(salary: Salary): GrossToNetResult {

        if (salary.amount < 0 || salary.ratePAS < 0) throw new ValidationError('negative numbers are not allowed')
        if (salary.ratePAS > 100) throw new ValidationError('ratePAS too high')

        const taxParts = salary.taxParts ?? 1;
        if (taxParts <= 0) throw new ValidationError('taxParts must be greater than 0')

        const grossYear = salary.frequency === 'month' ? salary.amount * 12 : salary.amount;
        const grossMonth = salary.frequency === 'year' ? salary.amount / 12 : salary.amount;
        const rateDues = salary.status === 'executive' ? 0.25 : 0.22;

        const netBeforeTaxesYear = grossYear * (1 - rateDues);
        const netAfterTaxesYear = netBeforeTaxesYear * (1 - salary.ratePAS / 100)

        const netBeforeTaxesMonth = grossMonth * (1 - rateDues);
        const netAfterTaxesMonth = netBeforeTaxesMonth * (1 - salary.ratePAS / 100)

        const incomeTaxYear = calculateIncomeTax(netBeforeTaxesYear, taxParts);
        const incomeTaxMonth = roundCents(incomeTaxYear / 12);

        const netAfterIncomeTaxYear = roundCents(netBeforeTaxesYear - incomeTaxYear);
        const netAfterIncomeTaxMonth = roundCents(netBeforeTaxesMonth - incomeTaxMonth);

        const bossCostYear = grossYear * 1.42;
        const bossCostMonth = grossMonth * 1.42;

        const result = {
            gross: roundCents(salary.frequency === 'year' ? grossMonth : grossYear),
            netMonth: roundCents(netAfterTaxesMonth),
            netYear: roundCents(netAfterTaxesYear),
            incomeTaxMonth,
            incomeTaxYear,
            netAfterIncomeTaxMonth,
            netAfterIncomeTaxYear,
            bossCostMonth: roundCents(bossCostMonth),
            bossCostYear: roundCents(bossCostYear)
        }

        this.repo.grossToNet(result);

        return result;
    }

}