import {OneToMany, Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from 'typeorm'

import Professor from './Professor'

@Entity()
export default class Jogos extends BaseEntity {
  @PrimaryGeneratedColumn()
  idJogo!: number

  @ManyToOne(() => Professor, professor => professor.idJogos)
  professor!: Professor[]

}