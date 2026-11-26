import { beforeEach, describe, expect, it } from "vitest";
import { SalaryService } from "./salary.service.ts";


describe('SalaryService.create', () => {

    let service: SalaryService;

    beforeEach(() => {
        service = new SalaryService();
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
            bossCostMonth: 0,
            bossCostYear: 0
        })
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