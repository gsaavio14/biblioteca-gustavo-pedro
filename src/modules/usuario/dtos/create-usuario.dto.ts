import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUsuarioDto {

    @IsNotEmpty({ message: 'O campo nome é obrigatório' })
    @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
    nome!: string;

    @IsNotEmpty({ message: 'O campo e-mail é obrigatório' })
    @IsEmail({}, { message: 'Informe um e-mail válido' })
    email!: string;

    @IsNotEmpty({ message: 'O campo telefone é obrigatório' })
    @MinLength(8, { message: 'O telefone deve ter no mínimo 8 caracteres' })
    telefone!: string;
}