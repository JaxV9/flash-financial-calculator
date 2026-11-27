export interface Salary {
    amount: number,
    frequency: 'year' | 'month',
    status: 'executive' | 'non-executive',
    ratePAS: number,
    taxParts?: number
}

export interface GrossToNetResult {
    gross: number,
    netMonth: number,
    netYear: number,
    incomeTaxMonth: number,
    incomeTaxYear: number,
    netAfterIncomeTaxMonth: number,
    netAfterIncomeTaxYear: number,
    bossCostMonth: number,
    bossCostYear: number
}