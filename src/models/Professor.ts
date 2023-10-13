import {OneToMany, Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'
import Turma from './Turma'
import Produto from './Produtos'

@Entity()
export default class Professor extends BaseEntity {
  @PrimaryGeneratedColumn()
  idProfessor!: number

  @Column()
  nomeProfessor!: string

  @Column()
  sobrenomeProfessor!: string

  @Column()
  emailProfessor!: string

  @Column()
  senha!: string

  @Column()
  nascimento!: Date

  @Column()
  idJogos!: number

  @OneToMany(() => Turma, turma => turma.idProfessor)
  turmas!: Turma[];

  @OneToMany(() => Produto, produto => produto.idProfessor)
  produtos!: Produto[];
  
}