import { JoinTable, Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm'
import Turma from './Turma'
import User from './User'

@Entity()
export default class Aluno extends BaseEntity {
  @PrimaryGeneratedColumn()
  idAluno!: number
 
  @Column()
  idTurma!: number

  @ManyToOne(() => Turma, (idTurma) => idTurma.idAluno)
  turma!: Turma;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User

  @Column()
  userId!: number
}