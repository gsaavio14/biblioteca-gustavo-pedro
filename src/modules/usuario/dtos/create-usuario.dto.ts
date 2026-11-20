import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class CreateUsuarioDto {

    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    @IsNotEmpty({ message: 'O nome é obrigatório' })
    @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'.-]+$/, { message: 'O nome não pode ter números nem símbolos' })
    nome!: string;

    @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
    @IsNotEmpty({ message: 'O e-mail é obrigatório' })
    @IsEmail({}, { message: 'Informe um e-mail válido' })
    email!: string;

    @Transform(({ value }) => (typeof value === 'string' ? value.replace(/\D/g, '') : value))
    @Matches(/^\d{10,11}$/, { message: 'O telefone deve ter 10 ou 11 números (com DDD)' })
    telefone!: string;
}