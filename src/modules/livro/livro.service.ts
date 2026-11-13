import { Injectable } from '@nestjs/common';
import { Livro } from './livro.entity';
import { CreateLivroDto } from './dtos/create-livro.dto';

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

    async create(dados: CreateLivroDto): Promise<Livro> {
        const livro = Livro.create({ ...dados, quantidadeDisponivel: dados.quantidadeTotal });

        return livro.save();
    }
}