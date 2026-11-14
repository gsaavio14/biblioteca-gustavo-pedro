import { Module } from '@nestjs/common';
import { AutorService } from './autor.service';

@Module({
  providers: [AutorService]
})
export class AutorModule {}