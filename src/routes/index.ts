import { Router } from 'express';
import alunoRoutes from './aluno/aluno.routes';
import contaRoutes from './conta/conta.routes';
import movimentacaoRoutes from './movimentacaoConta/movimentacaoConta.routes';
import pontuacaoRoutes from './pontuacao/pontuacao.routes';
import produtoRoutes from './produtos/produtos.routes';
import professorRoutes from './professor/professor.routes';
import turmaRoutes from './turma/turma.routes';

const routes = Router();

routes.use('/aluno', alunoRoutes);
routes.use('/conta', contaRoutes);
routes.use('/movimentacao', movimentacaoRoutes);
routes.use('/pontuacao', pontuacaoRoutes);
routes.use('/produto', produtoRoutes);
routes.use('/professor', professorRoutes);
routes.use('/turma', turmaRoutes);

export default routes;
