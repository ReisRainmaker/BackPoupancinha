import {JoinTable, Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, OneToOne, JoinColumn, OneToMany } from 'typeorm'
import Aluno from './Aluno'
import MovimentacaoConta from './MovimentacaoConta';

@Entity()
export default class Conta extends BaseEntity {
  @PrimaryGeneratedColumn()
  idConta!: number 

  @OneToOne(() => Aluno)
  @JoinColumn({ name: 'idAluno' })
  aluno!: Aluno;

  @Column()
  idAluno!: number

  @Column()
  saldoAtual!: number

  @OneToMany(() => MovimentacaoConta, movimentacao => movimentacao.conta, { lazy: true })
  movimentacoes!: MovimentacaoConta[];
}