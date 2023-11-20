import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
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
  quantDisponivel!: string;

  @Column()
  quantVendidos!: string;

  @Column()
  descricao!: string;

  @ManyToOne(() => Professor)
  idProfessor!: Professor;

}
