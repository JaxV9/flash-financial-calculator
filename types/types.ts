export interface Salary {
    amount: number,
    frequency: 'year' | 'month',
    status: 'executive' | 'non-executive',
    ratePAS: number
}

export interface GrossToNetResult {
    gross: number,
    netMonth: number,
    netYear: number,
    bossCostMonth: number,
    bossCostYear: number
}