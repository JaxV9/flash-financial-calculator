import { createApp } from './app.ts';
import { SalaryRepositoryMemory } from './repositories/salary.repository.ts';
import { SalaryService } from './services/salary/salary.service.ts';

const salaryRepository = new SalaryRepositoryMemory();
const salaryService = new SalaryService(salaryRepository);
const app = createApp({ salaryService });

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
    console.log(`Port ${port}`);
});
