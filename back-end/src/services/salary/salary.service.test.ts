import { beforeEach, describe, expect, it } from "vitest";
import { SalaryService } from "./salary.service.ts";
import { SalaryRepositoryMemory } from "../../repositories/salary.repository.ts";


describe('SalaryService.create', () => {

    let service: SalaryService;

    beforeEach(() => {
        service = new SalaryService(new SalaryRepositoryMemory());
    });

    it('gross to net for non-executive without PAS', () => {
        const salary = service.convertGrossToNet({
            amount: 36000,
            frequency: 'year',
            status: 'non-executive',
            ratePAS: 0
        })

        expect(salary).toEqual({
            gross: 3000,
            netMonth: 2340,
            netYear: 28080,
            incomeTaxMonth: 125.33,
            incomeTaxYear: 1503.92,
            netAfterIncomeTaxMonth: 2214.67,
            netAfterIncomeTaxYear: 26576.08,
            bossCostMonth: 4260,
            bossCostYear: 51120
        })
    })

    it('gross to net for monthly executive with PAS', () => {
        const salary = service.convertGrossToNet({
            amount: 4000,
            frequency: 'month',
            status: 'executive',
            ratePAS: 10
        })

        expect(salary).toEqual({
            gross: 48000,
            netMonth: 2700,
            netYear: 32400,
            incomeTaxMonth: 235.33,
            incomeTaxYear: 2823.99,
            netAfterIncomeTaxMonth: 2764.67,
            netAfterIncomeTaxYear: 33176.01,
            bossCostMonth: 5680,
            bossCostYear: 68160
        })
    })

    it('returns strictly 0 for zero salary', () => {
        const salary = service.convertGrossToNet({
            amount: 0,
            frequency: 'month',
            status: 'executive',
            ratePAS: 15
        })

        expect(salary).toEqual({
            gross: 0,
            netMonth: 0,
            netYear: 0,
            incomeTaxMonth: 0,
            incomeTaxYear: 0,
            netAfterIncomeTaxMonth: 0,
            netAfterIncomeTaxYear: 0,
            bossCostMonth: 0,
            bossCostYear: 0
        })
    })

    it('computes income tax with multiple tax parts', () => {
        const salary = service.convertGrossToNet({
            amount: 4000,
            frequency: 'month',
            status: 'executive',
            ratePAS: 10,
            taxParts: 2
        })

        expect(salary.incomeTaxYear).toBe(1012)
        expect(salary.incomeTaxMonth).toBe(84.33)
    })

    it('rounds all monetary values to 2 decimal places', () => {
        const salary = service.convertGrossToNet({
            amount: 44000,
            frequency: 'year',
            status: 'non-executive',
            ratePAS: 0
        })

        expect(salary.gross).toBe(3666.67)
        expect(salary.bossCostMonth).toBe(5206.67)
        expect(salary.netAfterIncomeTaxMonth).toBe(2662.47)
        expect(salary.netAfterIncomeTaxYear).toBe(31949.61)
    })

    it('throws an error when taxParts is 0 or negative', () => {
        expect(() => service.convertGrossToNet({
            amount: 3000,
            frequency: 'month',
            status: 'non-executive',
            ratePAS: 0,
            taxParts: 0
        })).toThrow()
    })

    it('throws an error for negative salary', () => {
        expect(() => service.convertGrossToNet({
            amount: -1000,
            frequency: 'month',
            status: 'executive',
            ratePAS: 10
        })).toThrow()
    })

    it('throws an error when PAS rate is below 0%', () => {
        expect(() => service.convertGrossToNet({
            amount: 3000,
            frequency: 'month',
            status: 'non-executive',
            ratePAS: -1
        })).toThrow()
    })

    it('throws an error when PAS rate is above 100%', () => {
        expect(() => service.convertGrossToNet({
            amount: 3000,
            frequency: 'month',
            status: 'non-executive',
            ratePAS: 101
        })).toThrow()
    })

})