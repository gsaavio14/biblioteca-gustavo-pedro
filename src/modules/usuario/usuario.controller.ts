import { Body, Controller, Get, Param, Post, Redirect, Render } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';
import { ValidationView } from 'nest-validation-view';

@Controller('usuarios')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) {}

    @Get()
    @Render('usuario/index')
    async getAll(): Promise<object> {
        let usuarios = await this.usuarioService.findAll();

        return { titulo: 'Usuários', listaUsuarios: usuarios };
    }

    @Get('novo')
    @Render('usuario/formulario')
    async formularioNovo(): Promise<object> {
        return { titulo: 'Novo Usuário' };
    }

    @Post('novo')
    @Redirect('/usuarios')
    @ValidationView('usuario/formulario', ({ request, errors }) => {
        return {
            titulo: 'Novo Usuário',
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

        return { titulo: 'Atualização de Usuário', usuario };
    }

    @Post(':id/atualizacao')
    @Redirect('/usuarios')
    @ValidationView('usuario/formulario', ({ request, errors }) => {

        const { params, body } = request;

        return {
            titulo: 'Atualização de Usuário',
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

        return { titulo: 'Exclusão de Usuário', usuario };
    }

    @Post(':id/exclusao')
    @Redirect('/usuarios')
    async excluir(@Param('id') id: number): Promise<void> {
        await this.usuarioService.remove(id);
    }
}