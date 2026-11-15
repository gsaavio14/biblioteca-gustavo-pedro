import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Livro } from '../livro/livro.entity';

@Entity('autor')
export class Autor extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 200 })
    nome!: string;

    @Column({ type: 'varchar', length: 100 })
    nacionalidade!: string;

    @Column({ type: 'int' })
    anoNascimento!: number;

    @Column({ type: 'text', nullable: true })
    biografia!: string;

    @OneToMany(() => Livro, (livro) => livro.autor)
    livros!: Livro[];

    @CreateDateColumn()
    criadoEm!: Date;

    @UpdateDateColumn()
    atualizadoEm!: Date;
}