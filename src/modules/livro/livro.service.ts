import { Injectable } from '@nestjs/common';
import { Livro } from './livro.entity';

@Injectable()
export class LivroService {

    async findAll(): Promise<Livro[]> {
        let livros = await Livro.find();

        return livros;
    }

    async findOne(_id: number): Promise<Livro | null> {
        return Livro.findOne({
            where: { id: _id }
        });
    }
}