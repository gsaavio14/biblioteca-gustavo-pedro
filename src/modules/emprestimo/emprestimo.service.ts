import { BadRequestException, Injectable } from '@nestjs/common';
import { Emprestimo } from './emprestimo.entity';
import { CreateEmprestimoDto } from './dtos/create-emprestimo.dto';
import { Usuario } from '../usuario/usuario.entity';
import { Livro } from '../livro/livro.entity';

const DIAS_DE_EMPRESTIMO = 14;
const VALOR_MULTA_POR_DIA = 1;
const MILISSEGUNDOS_POR_DIA = 1000 * 60 * 60 * 24;

@Injectable()
export class EmprestimoService {

    async findAll(): Promise<Emprestimo[]> {
        return Emprestimo.find({
            relations: { usuario: true, livro: true },
            order: { id: 'DESC' },
        });
    }

    async findOne(id: number): Promise<Emprestimo | null> {
        return Emprestimo.findOne({
            where: { id },
            relations: { usuario: true, livro: true },
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

        if(livro.quantidadeDisponivel <= 0) {
            throw new BadRequestException('Não há exemplares disponíveis deste livro');
        }

        livro.quantidadeDisponivel = livro.quantidadeDisponivel - 1;
        await livro.save();

        const hoje = new Date();
        const prevista = new Date();
        prevista.setDate(prevista.getDate() + DIAS_DE_EMPRESTIMO);

        const emprestimo = Emprestimo.create({
            usuarioId: dados.usuarioId,
            livroId: dados.livroId,
            dataEmprestimo: hoje,
            dataPrevistaDevolucao: prevista,
        });

        return emprestimo.save();
    }

    async devolver(id: number): Promise<Emprestimo> {
        const emprestimo = await this.findOne(id);
        if(!emprestimo) {
            throw new BadRequestException('Empréstimo não encontrado');
        }

        if(emprestimo.dataEfetivaDevolucao) {
            throw new BadRequestException('Este livro já foi devolvido');
        }

        const agora = new Date();
        let multa = 0;

        if(agora > emprestimo.dataPrevistaDevolucao) {
            const diferenca = agora.getTime() - emprestimo.dataPrevistaDevolucao.getTime();
            const diasDeAtraso = Math.ceil(diferenca / MILISSEGUNDOS_POR_DIA);
            multa = diasDeAtraso * VALOR_MULTA_POR_DIA;
        }

        emprestimo.livro.quantidadeDisponivel = emprestimo.livro.quantidadeDisponivel + 1;
        await emprestimo.livro.save();

        emprestimo.dataEfetivaDevolucao = agora;
        emprestimo.valorMulta = multa;

        return emprestimo.save();
    }
}