import {OneToMany, Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import Turma from './Turma'
import Produto from './Produtos'
import Token from './Tokens'
import User from './User'

@Entity()
export default class Professor extends BaseEntity {
  @PrimaryGeneratedColumn()
  idProfessor!: number

  @OneToOne(() => User, user => user.tipoUsuario)
  tipoUsuario!: User

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

  @OneToMany(() => Turma, turma => turma.professor)
  turmas!: Turma[];

  @OneToMany(() => Produto, produto => produto.idProfessor)
  produtos!: Produto[];
  
}