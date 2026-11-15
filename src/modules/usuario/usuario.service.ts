import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';

@Injectable()
export class UsuarioService {

    async findAll(): Promise<Usuario[]> {
        let usuarios = await Usuario.find();

        return usuarios;
    }

    async findOne(_id: number): Promise<Usuario | null> {
        return Usuario.findOne({
            where: { id: _id }
        });
    }

    async create(dados: CreateUsuarioDto): Promise<Usuario> {
        const usuario = Usuario.create({ ...dados });

        return usuario.save();
    }

    async update(id: number, dados: CreateUsuarioDto): Promise<Usuario | null> {
        const usuario = await this.findOne(id);

        if(!usuario) return null;

        Object.assign(usuario, { ...dados });

        return usuario.save();
    }

    async remove(id: number): Promise<boolean> {
        const usuario = await this.findOne(id);

        if(!usuario) return false;

        await usuario.remove();

        return true;
    }
}