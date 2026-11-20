import { Body, Controller, Get, Param, Post, Redirect, Render } from '@nestjs/common';
import { ValidationView } from 'nest-validation-view';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';

@Controller('usuarios')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) {}

    @Get()
    @Render('usuario/index')
    async getAll(): Promise<object> {
        let usuarios = await this.usuarioService.findAll();

        return { listaUsuarios: usuarios, titulo: 'Usuários' };
    }

    @Get('novo')
    @Render('usuario/formulario')
    async formularioNovo(): Promise<object> {
        return { titulo: 'Novo usuário' };
    }

    @Post('novo')
    @Redirect('/usuarios')
    @ValidationView('usuario/formulario', ({ request, errors }) => {
        return {
            titulo: 'Novo usuário',
            usuario: request.body,
            errors
        };
    })
    async formularioNovoSalvar(@Body() dados: CreateUsuarioDto): Promise<void> {
        await this.usuarioService.create(dados);
    }

    @Get(':id/atualizacao')
    @Render('usuario/formulario')
    async formularioAtualizacao(@Param('id') id: number): Promise<object> {

        const usuario = await this.usuarioService.findOne(id);

        if(!usuario) {
            throw new Error('Usuário não encontrado');
        }

        return { titulo: 'Atualização de usuário', usuario };
    }

    @Post(':id/atualizacao')
    @Redirect('/usuarios')
    @ValidationView('usuario/formulario', ({ request, errors }) => {

        const { params, body } = request;

        return {
            titulo: 'Atualização de usuário',
            usuario: { id: params.id, ...body },
            errors
        };
    })
    async formularioAtualizacaoSalvar(@Param('id') id: number, @Body() dados: CreateUsuarioDto): Promise<void> {
        await this.usuarioService.update(id, dados);
    }

    @Get(':id/exclusao')
    @Render('usuario/exclusao')
    async confirmarExclusao(@Param('id') id: number): Promise<object> {
        const usuario = await this.usuarioService.findOne(id);

        if(!usuario) {
            throw new Error('Usuário não encontrado');
        }

        return { titulo: 'Exclusão de usuário', usuario };
    }

    @Post(':id/exclusao')
    @Redirect('/usuarios')
    @ValidationView('usuario/exclusao', ({ request, errors }) => {
        return {
            titulo: 'Exclusão de usuário',
            usuario: { id: request.params.id },
            errors
        };
    })
    async excluir(@Param('id') id: number): Promise<void> {
        await this.usuarioService.remove(id);
    }
}