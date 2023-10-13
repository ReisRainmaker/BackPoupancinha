import { Router } from 'express';
import MovimentacaoContaController from '../../controllers/movimentacaoConta/movimentacaoConta.controller';

const movimentacaoContaRoutes = Router();

movimentacaoContaRoutes.post('/movimentacaoConta', MovimentacaoContaController.store);
movimentacaoContaRoutes.get('/movimentacaoConta', MovimentacaoContaController.index);
movimentacaoContaRoutes.get('/movimentacaoConta/:idMovimentacao', MovimentacaoContaController.show);
movimentacaoContaRoutes.delete('/movimentacaoConta/:idMovimentacao', MovimentacaoContaController.delete);
movimentacaoContaRoutes.put('/movimentacaoConta/:idMovimentacao', MovimentacaoContaController.update);

export default movimentacaoContaRoutes;
