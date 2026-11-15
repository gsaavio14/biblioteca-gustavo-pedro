import { BadRequestException, Injectable } from '@nestjs/common';
import { Emprestimo } from './emprestimo.entity';
import { CreateEmprestimoDto } from './dtos/create-emprestimo.dto';
import { Livro } from '../livro/livro.entity';
import { Usuario } from '../usuario/usuario.entity';

const DIAS_DE_EMPRESTIMO = 14;

@Injectable()
export class EmprestimoService {

    async findAll(): Promise<Emprestimo[]> {
        let emprestimos = await Emprestimo.find({
            relations: { usuario: true, livro: true },
            order: { id: 'DESC' }
        });

        return emprestimos;
    }

    async findOne(_id: number): Promise<Emprestimo | null> {
        return Emprestimo.findOne({
            where: { id: _id },
            relations: { usuario: true, livro: true }
        });
    }

    async create(dados: CreateEmprestimoDto): Promise<Emprestimo> {
        const usuario = await Usuario.findOne({ where: { id: dados.usuarioId } });

        if(!usuario) {
            throw new BadRequestException('Usuário não encontrado');
        }

        const livro = await Livro.findOne({ where: { id: dados.livroId } });

        if(!livro) {
            throw new BadRequestException('Livro não encontrado');
        }

        if(livro.quantidadeDisponivel < 1) {
            throw new BadRequestException('Não há exemplares disponíveis deste livro');
        }

        const hoje = new Date();
        const devolucao = new Date();
        devolucao.setDate(hoje.getDate() + DIAS_DE_EMPRESTIMO);

        livro.quantidadeDisponivel = livro.quantidadeDisponivel - 1;
        await livro.save();

        const emprestimo = Emprestimo.create({
            usuarioId: usuario.id,
            livroId: livro.id,
            dataEmprestimo: hoje,
            dataPrevistaDevolucao: devolucao
        });

        return emprestimo.save();
    }
}