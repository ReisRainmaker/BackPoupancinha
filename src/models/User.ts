import {JoinTable, Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, OneToOne, JoinColumn, OneToMany } from 'typeorm'
import { IsIn } from 'class-validator';
import Token from './Tokens'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  nome!: string

  @Column()
  sobrenome!: string

  @Column()
  email!: string

  @Column()
  dataNascimento!: Date

  @Column()
  senha!: string

  @Column()
  @IsIn(['Aluno', 'Professor'])
  tipoUsuario!: string

  @OneToMany(() => Token, token => token.user)
  tokens!: Token[]  
}