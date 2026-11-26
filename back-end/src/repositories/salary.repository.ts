import type { GrossToNetResult } from "../../../types/types.ts";


export interface SalaryRepository {
    grossToNet(result: GrossToNetResult): GrossToNetResult
}

export class SalaryRepositoryMemory implements SalaryRepository {
    private readonly results: GrossToNetResult[] = [];

    grossToNet(result: GrossToNetResult): GrossToNetResult {
        this.results.push(result);
        return result;
    }
}