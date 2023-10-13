import {JoinTable, Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, OneToOne, JoinColumn } from 'typeorm'
import Turma from './Turma'
import Conta from './Conta'

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
}