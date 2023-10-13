import {JoinTable, Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, OneToOne, JoinColumn, OneToMany } from 'typeorm'
import Aluno from './Aluno'
import MovimentacaoConta from './MovimentacaoConta';

@Entity()
export default class Conta extends BaseEntity {
  @PrimaryGeneratedColumn()
  idConta!: number 

  @OneToOne(() => Aluno)
  @JoinColumn({ name: 'idAluno' })
  idAluno!: Aluno;

  @Column()
  saldoAtual!: number

  @OneToMany(() => MovimentacaoConta, movimentacao => movimentacao.idConta)
  movimentacoes!: MovimentacaoConta[];
}