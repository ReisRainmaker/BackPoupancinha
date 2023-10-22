import {JoinTable, Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, OneToOne, JoinColumn, OneToMany } from 'typeorm'
import Turma from './Turma'
import Conta from './Conta'
import User from './User'
import Token from './Tokens'

@Entity()
export default class Aluno extends BaseEntity {
  @PrimaryGeneratedColumn()
  idAluno!: number

  @Column()
  nomeAluno!: string

  @Column()
  sobrenomeAluno!: string

  @Column()
  emailAluno!: string

  @Column()
  senha!: string

  @Column({ type: 'date' })
  dataNascimento!: Date;

  @ManyToMany(() => Turma)
  @JoinTable() 
  turmas!: Turma[];

  @OneToOne(() => User, user => user.tipoUsuario)
  tipoUsuario!: User[]

  @OneToOne(() => Conta, conta => conta.idConta)
  numeroConta!: Conta[]
}