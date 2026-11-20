import { Body, Controller, Get, Post, Redirect, Render } from '@nestjs/common';
import { ValidationView } from 'nest-validation-view';
import { EmprestimoService } from './emprestimo.service';
import { CreateEmprestimoDto } from './dtos/create-emprestimo.dto';

@Controller('emprestimos')
export class EmprestimoController {

    constructor(private readonly emprestimoService: EmprestimoService) {}

    @Get()
    @Render('emprestimo/index')
    async getAll(): Promise<object> {
        let emprestimos = await this.emprestimoService.findAll();

        return { listaEmprestimos: emprestimos, titulo: 'Empréstimos' };
    }

    @Get('novo')
    @Render('emprestimo/formulario')
    async formularioNovo(): Promise<object> {
        return { titulo: 'Novo empréstimo' };
    }

    @Post('novo')
    @Redirect('/emprestimos')
    @ValidationView('emprestimo/formulario', ({ request, errors }) => {
        return {
            titulo: 'Novo empréstimo',
            emprestimo: request.body,
            errors
        };
    })
    async formularioNovoSalvar(@Body() dados: CreateEmprestimoDto): Promise<void> {
        await this.emprestimoService.create(dados);
    }
}