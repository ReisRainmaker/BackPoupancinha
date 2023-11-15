import { Router } from 'express';
import ContaController from '../../controllers/conta/conta.controller';

const contaRoutes = Router();

contaRoutes.post('/', ContaController.store);
contaRoutes.get('/', ContaController.index);
contaRoutes.get('/:idConta', ContaController.show);
contaRoutes.delete('/:idConta', ContaController.delete);
contaRoutes.put('/:idConta', ContaController.update);

export default contaRoutes;


