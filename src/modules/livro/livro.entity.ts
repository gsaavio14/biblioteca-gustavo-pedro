import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Autor } from '../autor/autor.entity';

@Entity('livro')
export class Livro extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 200 })
    titulo!: string;

    @Column({ type: 'varchar', length: 20 })
    isbn!: string;

    @Column({ type: 'varchar', length: 100 })
    editora!: string;

    @Column({ type: 'int' })
    anoPublicacao!: number;

    @Column({ type: 'varchar', length: 100 })
    genero!: string;

    @Column({ type: 'int' })
    quantidadeTotal!: number;

    @Column({ type: 'int' })
    quantidadeDisponivel!: number;

    @Column({ type: 'text', nullable: true })
    sinopse!: string;

    @Column({ type: 'int', nullable: true })
    autorId!: number | null;

    @ManyToOne(() => Autor, (autor) => autor.livros, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'autorId' })
    autor!: Autor | null;

    @CreateDateColumn()
    criadoEm!: Date;

    @UpdateDateColumn()
    atualizadoEm!: Date;
}