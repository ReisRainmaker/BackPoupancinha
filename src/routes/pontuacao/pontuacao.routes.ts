import { Router } from 'express';
import PontuacaoController from '../../controllers/pontuacao/pontuacao.controller';

const pontuacaoRoutes = Router();

pontuacaoRoutes.post('/pontuacao', PontuacaoController.store);
pontuacaoRoutes.get('/pontuacao', PontuacaoController.index);
pontuacaoRoutes.get('/pontuacao/:idPontuacao', PontuacaoController.show);
pontuacaoRoutes.delete('/pontuacao/:idPontuacao', PontuacaoController.delete);
pontuacaoRoutes.put('/pontuacao/:idPontuacao', PontuacaoController.update);

export default pontuacaoRoutes;
