import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import Aluno from './Aluno';
import Professor from './Professor';

@Entity()
export default class Pontuacao extends BaseEntity {
  @PrimaryGeneratedColumn()
  idPontuacao!: number;

  @CreateDateColumn()
  dataHoraAcesso!: Date;

  @Column({ type: 'int' })
  pontosPossiveis!: number;

  @Column({ type: 'int' })
  pontosFeitos!: number;

  @Column({ type: 'int' })
  acertos!: number;

  @Column({ type: 'int' })
  erros!: number;

  @Column({ type: 'int' })
  tempoJogo!: number;

  @ManyToOne(() => Aluno)
  idAluno!: Aluno;

  @ManyToOne(() => Professor)
  idProfessor!: Professor;
}
