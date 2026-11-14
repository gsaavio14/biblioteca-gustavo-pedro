import { Injectable } from '@nestjs/common';
import { Autor } from './autor.entity';
import { CreateAutorDto } from './dtos/create-autor.dto';

@Injectable()
export class AutorService {

    async findAll(): Promise<Autor[]> {
        let autores = await Autor.find();

        return autores;
    }

    async findOne(_id: number): Promise<Autor | null> {
        return Autor.findOne({
            where: { id: _id }
        });
    }

    async create(dados: CreateAutorDto): Promise<Autor> {
        const autor = Autor.create({ ...dados });

        return autor.save();
    }

    async update(id: number, dados: CreateAutorDto): Promise<Autor | null> {
        const autor = await this.findOne(id);

        if(!autor) return null;

        Object.assign(autor, { ...dados });

        return autor.save();
    }

    async remove(id: number): Promise<boolean> {
        const autor = await this.findOne(id);

        if(!autor) return false;

        await autor.remove();

        return true;
    }
}