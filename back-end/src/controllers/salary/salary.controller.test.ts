import { beforeEach, describe } from "node:test";
import { createApp } from "../../app.ts";
import request from 'supertest';
import { SalaryService } from "../../services/salary/salary.service.ts";
import { SalaryRepositoryMemory } from "../../repositories/salary.repository.ts";
import { expect, it, } from "vitest";

const app = createApp({ salaryService: new SalaryService(new SalaryRepositoryMemory()) });

describe('POST /grosstonet', () => {

    it('200 gross to net for non-executive without PAS', async () => {
        const res = await request(app).post('/grosstonet').send({
            amount: 36000,
            frequency: 'year',
            status: 'non-executive',
            ratePAS: 0
        })
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            gross: 3000,
            netMonth: 2340,
            netYear: 28080,
            bossCostMonth: 4260,
            bossCostYear: 51120
        })
    })

    it('200 gross to net for monthly executive with PAS', async () => {
        const res = await request(app).post('/grosstonet').send({
            amount: 4000,
            frequency: 'month',
            status: 'executive',
            ratePAS: 10
        })
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            gross: 48000,
            netMonth: 2700,
            netYear: 32400,
            bossCostMonth: 5680,
            bossCostYear: 68160
        })
    })

    it('200 returns strictly 0 for zero salary', async () => {
        const res = await request(app).post('/grosstonet').send({
            amount: 0,
            frequency: 'month',
            status: 'executive',
            ratePAS: 15
        })
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            gross: 0,
            netMonth: 0,
            netYear: 0,
            bossCostMonth: 0,
            bossCostYear: 0
        })
    })

    it('400 throws an error for negative salary', async () => {
        const res = await request(app).post('/grosstonet').send({
            amount: -1000,
            frequency: 'month',
            status: 'executive',
            ratePAS: 10
        })
        expect(res.status).toBe(400);
    })

    it('400 throws an error when PAS rate is below 0%', async () => {
        const res = await request(app).post('/grosstonet').send({
            amount: 3000,
            frequency: 'month',
            status: 'non-executive',
            ratePAS: -1
        })
        expect(res.status).toBe(400);
    })

    it('400 throws an error when PAS rate is above 100%', async () => {
        const res = await request(app).post('/grosstonet').send({
            amount: 3000,
            frequency: 'month',
            status: 'non-executive',
            ratePAS: 101
        })
        expect(res.status).toBe(400);
    })
})