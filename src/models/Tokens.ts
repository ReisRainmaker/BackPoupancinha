import {OneToMany, Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import User from './User'


@Entity()
export default class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  tokenId!: number

  @Column()
  token!: string

  @Column()
  refreshToken!: string

  @Column()
  expiresAt!: Date  

  @Column()
  idUser!: number

  @ManyToOne(() => User, user => user.tokens)
  user!: User
}