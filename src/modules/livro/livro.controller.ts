import { Body, Controller, Get, Post, Redirect, Render } from '@nestjs/common';
import { LivroService } from './livro.service';
import { helpers } from './livro.view.helpers';
import { CreateLivroDto } from './dtos/create-livro.dto';
import { ValidationView } from 'nest-validation-view';

@Controller('livros')
export class LivroController {

    constructor(private readonly livroService: LivroService) {}

    @Get()
    @Render('livro/index')
    async getAll(): Promise<object> {
        let livros = await this.livroService.findAll();

        return { titulo: 'Livros', listaLivros: livros, _h: helpers };
    }

    @Get('novo')
    @Render('livro/formulario')
    async formularioNovo(): Promise<object> {
        return { titulo: 'Novo Livro' };
    }

    @Post('novo')
    @Redirect('/livros')
    @ValidationView('livro/formulario', ({ request, errors }) => {
        return {
            titulo: 'Novo Livro',
            livro: request.body,
            errors
        };
    })
    async formularioNovoSalvar(@Body() dados: CreateLivroDto): Promise<void> {
        await this.livroService.create(dados);
    }
}