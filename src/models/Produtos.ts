import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import Professor from './Professor';
import { Url } from 'url';

@Entity()
export default class Produto extends BaseEntity {
  @PrimaryGeneratedColumn()
  idProduto!: number;

  @Column()
  nome!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco!: number;

  @Column()
  imagem!: string;
  
  @Column()
  quantDisponivel!: number;

  @Column()
  quantVendidos!: number;

  @Column()
  descricao!: string;

  @ManyToOne(() => Professor)
  Professor!: Professor;

  @Column()
  idProfessor!: number;

}
