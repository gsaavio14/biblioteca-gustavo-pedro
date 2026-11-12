import { Module } from '@nestjs/common';
import { LivroService } from './livro.service';

@Module({
  providers: [LivroService]
})
export class LivroModule {}