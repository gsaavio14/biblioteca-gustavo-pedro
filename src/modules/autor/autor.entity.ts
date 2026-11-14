import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

    @CreateDateColumn()
    criadoEm!: Date;

    @UpdateDateColumn()
    atualizadoEm!: Date;
}