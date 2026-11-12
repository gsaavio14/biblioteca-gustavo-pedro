import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

    @CreateDateColumn()
    criadoEm!: Date;

    @UpdateDateColumn()
    atualizadoEm!: Date;
}