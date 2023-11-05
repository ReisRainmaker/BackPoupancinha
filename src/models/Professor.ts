import {OneToMany, Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'
import Turma from './Turma'
import Produto from './Produtos'
import User from './User'
import Jogos from './jogos'

@Entity()
export default class Professor extends BaseEntity {
  @PrimaryGeneratedColumn()
  idProfessor!: number

  @OneToOne(() => User)
  @JoinColumn()
  user!: User

  @OneToMany(() => Jogos, jogos => jogos.professor, { lazy: true })
  idJogos!: Jogos

  @OneToMany(() => Turma, turma => turma.professor, { lazy: true })
  turmas!: Turma[];

  @OneToMany(() => Produto, produto => produto.idProfessor, { lazy: true })
  produtos!: Produto[];
  
}
/*
  @OneToOne(() => User, user => user.tipoUsuario, {
    cascade: true,
  })
  tipoUsuario!: User
*/