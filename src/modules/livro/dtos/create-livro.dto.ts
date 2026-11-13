import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min, MinLength } from 'class-validator';

export class CreateLivroDto {

    @IsNotEmpty({ message: 'O campo título é obrigatório' })
    titulo!: string;

    @IsNotEmpty({ message: 'O campo ISBN é obrigatório' })
    @MinLength(10, { message: 'O ISBN deve ter no mínimo 10 caracteres' })
    isbn!: string;

    @IsNotEmpty({ message: 'O campo editora é obrigatório' })
    editora!: string;

    @Type(() => Number)
    @IsInt({ message: 'O ano de publicação deve ser um número inteiro' })
    @Min(1, { message: 'Informe um ano de publicação válido' })
    anoPublicacao!: number;

    @IsNotEmpty({ message: 'O campo gênero é obrigatório' })
    genero!: string;

    @Type(() => Number)
    @IsInt({ message: 'A quantidade de exemplares deve ser um número inteiro' })
    @Min(1, { message: 'A quantidade de exemplares deve ser no mínimo 1' })
    quantidadeTotal!: number;

    @IsNotEmpty({ message: 'O campo sinopse é obrigatório' })
    @MinLength(10, { message: 'A sinopse deve ter no mínimo 10 caracteres' })
    sinopse!: string;
}