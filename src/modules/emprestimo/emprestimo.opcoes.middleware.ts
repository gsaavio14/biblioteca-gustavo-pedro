import { NextFunction, Request, Response } from 'express';
import { MoreThan } from 'typeorm';
import { Livro } from '../livro/livro.entity';
import { Usuario } from '../usuario/usuario.entity';

export async function carregarOpcoes(req: Request, res: Response, next: NextFunction) {
    try {
        res.locals.usuarios = await Usuario.find({ order: { nome: 'ASC' } });
        res.locals.livros = await Livro.find({
            where: { quantidadeDisponivel: MoreThan(0) },
            order: { titulo: 'ASC' },
        });
        next();
    } catch (error) {
        next(error);
    }
}