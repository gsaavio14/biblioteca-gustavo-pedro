import { Module } from '@nestjs/common';
import { EmprestimoService } from './emprestimo.service';

@Module({
  providers: [EmprestimoService]
})
export class EmprestimoModule {}