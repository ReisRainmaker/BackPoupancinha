import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Professor from './Professor';

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

  @ManyToOne(() => Professor)
  idProfessor!: Professor;
}
