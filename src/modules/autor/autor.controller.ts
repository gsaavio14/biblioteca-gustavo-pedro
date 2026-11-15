import { Body, Controller, Get, Param, Post, Redirect, Render } from '@nestjs/common';
import { AutorService } from './autor.service';
import { CreateAutorDto } from './dtos/create-autor.dto';
import { ValidationView } from 'nest-validation-view';

@Controller('autores')
export class AutorController {

    constructor(private readonly autorService: AutorService) {}

    @Get()
    @Render('autor/index')
    async getAll(): Promise<object> {
        let autores = await this.autorService.findAll();

        return { titulo: 'Autores', listaAutores: autores };
    }

    @Get('novo')
    @Render('autor/formulario')
    async formularioNovo(): Promise<object> {
        return { titulo: 'Novo Autor' };
    }

    @Post('novo')
    @Redirect('/autores')
    @ValidationView('autor/formulario', ({ request, errors }) => {
        return {
            titulo: 'Novo Autor',
            autor: request.body,
            errors
        };
    })
    async formularioNovoSalvar(@Body() dados: CreateAutorDto): Promise<void> {
        await this.autorService.create(dados);
    }

    @Get(':id/atualizacao')
    @Render('autor/formulario')
    async formularioAtualizacao(@Param('id') id: number): Promise<object> {

        const autor = await this.autorService.findOne(id);

        if(!autor) {
            throw new Error('Autor não encontrado');
        }

        return { titulo: 'Atualização de Autor', autor };
    }

    @Post(':id/atualizacao')
    @Redirect('/autores')
    @ValidationView('autor/formulario', ({ request, errors }) => {

        const { params, body } = request;

        return {
            titulo: 'Atualização de Autor',
            autor: { id: params.id, ...body },
            errors
        };
    })
    async formularioAtualizacaoSalvar(@Param('id') id: number, @Body() dados: CreateAutorDto): Promise<void> {
        await this.autorService.update(id, dados);
    }

    @Get(':id/exclusao')
    @Render('autor/exclusao')
    async confirmarExclusao(@Param('id') id: number): Promise<object> {
        const autor = await this.autorService.findOne(id);

        if(!autor) {
            throw new Error('Autor não encontrado');
        }

        return { titulo: 'Exclusão de Autor', autor };
    }

    @Post(':id/exclusao')
    @Redirect('/autores')
    async excluir(@Param('id') id: number): Promise<void> {
        await this.autorService.remove(id);
    }
}