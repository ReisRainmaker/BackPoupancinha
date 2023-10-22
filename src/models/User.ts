import {JoinTable, Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, OneToOne, JoinColumn, OneToMany } from 'typeorm'
import Token from './Tokens'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  senha!: string

  @Column()
  tipoUsuario!: string

  @OneToMany(() => Token, token => token.user)
  tokens!: Token[]  
}