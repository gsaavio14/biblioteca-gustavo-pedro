import { BadRequestException, Injectable } from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';

@Injectable()
export class UsuarioService {

    async findAll(): Promise<Usuario[]> {
        return Usuario.find();
    }

    async findOne(id: number): Promise<Usuario | null> {
        return Usuario.findOne({ where: { id } });
    }

    async create(dados: CreateUsuarioDto): Promise<Usuario> {
        await this.verificarRepetidos(dados);

        const usuario = Usuario.create({ ...dados });

        return usuario.save();
    }

    async update(id: number, dados: CreateUsuarioDto): Promise<Usuario> {
        const usuario = await this.findOne(id);

        if(!usuario) {
            throw new Error('Usuário não encontrado');
        }

        await this.verificarRepetidos(dados, id);

        usuario.nome = dados.nome;
        usuario.email = dados.email;
        usuario.telefone = dados.telefone;

        return usuario.save();
    }

    async remove(id: number): Promise<void> {
        const usuario = await this.findOne(id);

        if(!usuario) {
            throw new Error('Usuário não encontrado');
        }

        await usuario.remove();
    }

    private async verificarRepetidos(dados: CreateUsuarioDto, idIgnorado?: number): Promise<void> {
        const comMesmoEmail = await Usuario.findOne({ where: { email: dados.email } });

        if(comMesmoEmail && comMesmoEmail.id !== Number(idIgnorado)) {
            throw new BadRequestException('Já existe um usuário com este e-mail');
        }

        const comMesmoTelefone = await Usuario.findOne({ where: { telefone: dados.telefone } });

        if(comMesmoTelefone && comMesmoTelefone.id !== Number(idIgnorado)) {
            throw new BadRequestException('Já existe um usuário com este telefone');
        }
    }
}