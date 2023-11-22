import { JoinTable, Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm'
import Turma from './Turma'
import User from './User'

@Entity()
export default class Aluno extends BaseEntity {
  @PrimaryGeneratedColumn()
  idAluno!: number
  
  @ManyToOne(() => Turma, (idTurma) => idTurma.idAluno)
  idTurma!: Turma;


  @OneToOne(() => User)
  @JoinColumn()
  user!: User

  @Column()
  userId!: number
}