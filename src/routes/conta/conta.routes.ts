import { Router } from 'express';
import ContaController from '../../controllers/conta/conta.controller';

const contaRoutes = Router();

contaRoutes.post('/conta', ContaController.store);
contaRoutes.get('/conta', ContaController.index);
contaRoutes.get('/conta/:idConta', ContaController.show);
contaRoutes.delete('/conta/:idConta', ContaController.delete);
contaRoutes.put('/conta/:idConta', ContaController.update);

export default contaRoutes;


