import { Router } from 'express';
import MovimentacaoContaController from '../../controllers/movimentacaoConta/movimentacaoConta.controller';

const movimentacaoContaRoutes = Router();

movimentacaoContaRoutes.post('/', MovimentacaoContaController.store);
movimentacaoContaRoutes.get('/', MovimentacaoContaController.index);
movimentacaoContaRoutes.get('/:idMovimentacao', MovimentacaoContaController.show);
movimentacaoContaRoutes.delete('/:idMovimentacao', MovimentacaoContaController.delete);
movimentacaoContaRoutes.put('/:idMovimentacao', MovimentacaoContaController.update);

export default movimentacaoContaRoutes;
