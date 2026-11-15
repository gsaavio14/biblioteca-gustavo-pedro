import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { LivroModule } from './modules/livro/livro.module';
import { AutorModule } from './modules/autor/autor.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { EmprestimoModule } from './modules/emprestimo/emprestimo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    LivroModule,
    AutorModule,
    UsuarioModule,
    EmprestimoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}