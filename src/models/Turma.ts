import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm'
import Professor from './Professor'
import Aluno from './Aluno'

@Entity()
export default class Turma extends BaseEntity {
  @PrimaryGeneratedColumn()
  idTurma!: number

  @Column()
  nomeTurma!: string

  @Column()
  nomeEscola!: string

  @Column()
  serie!: number

  @Column()
  imagemTurma!: number

  @ManyToOne(() => Professor)
  @JoinColumn({name: 'idProfessor'})
  professor!: Professor;

  @Column()
  idProfessor!: number;

  @OneToMany(() => Aluno, aluno => aluno.idTurma, { lazy: true })
  @JoinTable({name: 'idAlunos'})
  idAluno!: Aluno[];

  
}