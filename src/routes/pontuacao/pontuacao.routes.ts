import { Router } from 'express';
import PontuacaoController from '../../controllers/pontuacao/pontuacao.controller';

const pontuacaoRoutes = Router();

pontuacaoRoutes.post('/', PontuacaoController.store);
pontuacaoRoutes.get('/', PontuacaoController.index);
pontuacaoRoutes.get('/:idPontuacao', PontuacaoController.show);
pontuacaoRoutes.delete('/:idPontuacao', PontuacaoController.delete);
pontuacaoRoutes.put('/:idPontuacao', PontuacaoController.update);

export default pontuacaoRoutes;
