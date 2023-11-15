import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import Conta from './Conta';

@Entity()
export default class MovimentacaoConta extends BaseEntity {
  @PrimaryGeneratedColumn()
  idMovimentacao!: number;

  @CreateDateColumn()
  dataHora!: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor!: number;

  @Column()
  tipo!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAnterior!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAtual!: number;

  @Column({ nullable: true })
  descricao!: string;

  @ManyToOne(() => Conta, conta => conta.movimentacoes)
  conta!: Conta;

  @Column()
  idConta!: number;
}
