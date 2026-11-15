import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LivroController } from './livro.controller';
import { LivroService } from './livro.service';
import { carregarAutores } from './livro.autores.middleware';

@Module({
  controllers: [LivroController],
  providers: [LivroService]
})
export class LivroModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(carregarAutores).forRoutes(LivroController);
  }
}