import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { Livro } from '../livro/livro.entity';

@Entity('emprestimo')
export class Emprestimo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int' })
    usuarioId!: number;

    @ManyToOne(() => Usuario, { nullable: false, onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'usuarioId' })
    usuario!: Usuario;

    @Column({ type: 'int' })
    livroId!: number;

    @ManyToOne(() => Livro, { nullable: false, onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'livroId' })
    livro!: Livro;

    @Column({ type: 'datetime' })
    dataEmprestimo!: Date;

    @Column({ type: 'datetime' })
    dataPrevistaDevolucao!: Date;

    @Column({ type: 'datetime', nullable: true })
    dataEfetivaDevolucao!: Date | null;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0,
        transformer: {
            to: (valor: number) => valor,
            from: (valor: string) => Number(valor),
        },
    })
    valorMulta!: number;

    @CreateDateColumn()
    criadoEm!: Date;

    @UpdateDateColumn()
    atualizadoEm!: Date;
}