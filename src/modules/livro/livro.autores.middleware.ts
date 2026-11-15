import { NextFunction, Request, Response } from 'express';
import { Autor } from '../autor/autor.entity';

export const carregarAutores = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.locals.autores = await Autor.find({ order: { nome: 'ASC' } });

        next();
    } catch (error) {
        next(error);
    }
};