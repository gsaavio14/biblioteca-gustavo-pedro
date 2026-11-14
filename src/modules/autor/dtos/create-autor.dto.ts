import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min, MinLength } from 'class-validator';

export class CreateAutorDto {

    @IsNotEmpty({ message: 'O campo nome é obrigatório' })
    @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
    nome!: string;

    @IsNotEmpty({ message: 'O campo nacionalidade é obrigatório' })
    nacionalidade!: string;

    @Type(() => Number)
    @IsInt({ message: 'O ano de nascimento deve ser um número inteiro' })
    @Min(1, { message: 'Informe um ano de nascimento válido' })
    anoNascimento!: number;

    @IsNotEmpty({ message: 'O campo biografia é obrigatório' })
    @MinLength(10, { message: 'A biografia deve ter no mínimo 10 caracteres' })
    biografia!: string;
}