import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm'
import Professor from './Professor'
import Aluno from './Aluno'

@Entity()
export default class Turma extends BaseEntity {
  @PrimaryGeneratedColumn()
  idTurma!: number

  @Column()
  nomeTurma!: string

  @Column()
  serie!: number

  @Column()
  idProfessor!: number

  @ManyToOne(() => Professor)
  @JoinColumn({name: 'idProfessor'})
  professor!: Professor;

  @ManyToMany(() => Aluno, aluno => aluno.turmas, { lazy: true })
  @JoinTable()
  idAlunos!: Aluno[];

}