import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class CreateEmprestimoDto {

    @Type(() => Number)
    @IsInt({ message: 'Selecione um usuário' })
    @Min(1, { message: 'Selecione um usuário' })
    usuarioId!: number;

    @Type(() => Number)
    @IsInt({ message: 'Selecione um livro' })
    @Min(1, { message: 'Selecione um livro' })
    livroId!: number;
}