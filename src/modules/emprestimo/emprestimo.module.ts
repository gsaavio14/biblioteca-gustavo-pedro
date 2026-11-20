import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EmprestimoController } from './emprestimo.controller';
import { EmprestimoService } from './emprestimo.service';
import { carregarOpcoes } from './emprestimo.opcoes.middleware';

@Module({
    controllers: [EmprestimoController],
    providers: [EmprestimoService],
})
export class EmprestimoModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(carregarOpcoes).forRoutes(EmprestimoController);
    }
}