import {JoinTable, Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, OneToOne, JoinColumn, OneToMany } from 'typeorm'
import Turma from './Turma'
import Conta from './Conta'
import User from './User'
import Token from './Tokens'

@Entity()
export default class Aluno extends BaseEntity {
  @PrimaryGeneratedColumn()
  idAluno!: number

  @ManyToMany(() => Turma)
  @JoinTable() 
  turmas!: Turma[];

  @OneToOne(() => User)
  @JoinColumn()
  user!: User[]
}