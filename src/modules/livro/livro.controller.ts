import { Body, Controller, Get, Param, Post, Redirect, Render } from '@nestjs/common';
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

    @Get(':id/atualizacao')
    @Render('livro/formulario')
    async formularioAtualizacao(@Param('id') id: number): Promise<object> {

        const livro = await this.livroService.findOne(id);

        if(!livro) {
            throw new Error('Livro não encontrado');
        }

        return { titulo: 'Atualização de Livro', livro };
    }

    @Post(':id/atualizacao')
    @Redirect('/livros')
    @ValidationView('livro/formulario', ({ request, errors }) => {

        const { params, body } = request;

        return {
            titulo: 'Atualização de Livro',
            livro: { id: params.id, ...body },
            errors
        };
    })
    async formularioAtualizacaoSalvar(@Param('id') id: number, @Body() dados: CreateLivroDto): Promise<void> {
        await this.livroService.update(id, dados);
    }

    @Get(':id/exclusao')
    @Render('livro/exclusao')
    async confirmarExclusao(@Param('id') id: number): Promise<object> {
        const livro = await this.livroService.findOne(id);

        if(!livro) {
            throw new Error('Livro não encontrado');
        }

        return { titulo: 'Exclusão de Livro', livro, _h: helpers };
    }

    @Post(':id/exclusao')
    @Redirect('/livros')
    async excluir(@Param('id') id: number): Promise<void> {
        await this.livroService.remove(id);
    }
}