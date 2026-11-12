import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('inicial')
  getHello(): object {
    return {
      titulo: 'Início',
      horaAgora: new Date().toLocaleString('pt-BR'),
    };
  }
}