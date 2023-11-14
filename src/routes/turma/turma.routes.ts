import { Router } from 'express';
import TurmaController from '../../controllers/turma/turma.controller';

const turmaRoutes = Router();

turmaRoutes.post('/', TurmaController.store);
turmaRoutes.get('/', TurmaController.index);
turmaRoutes.get('/:idTurma', TurmaController.show);
turmaRoutes.get('/:nomeTurma', TurmaController.showByName);
turmaRoutes.delete('/:idTurma', TurmaController.delete);
turmaRoutes.put('/:idTurma', TurmaController.update);

export default turmaRoutes;
