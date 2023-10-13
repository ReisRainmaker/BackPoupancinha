import { Router } from 'express';
import TurmaController from '../../controllers/turma/turma.controller';

const turmaRoutes = Router();

turmaRoutes.post('/turma', TurmaController.store);
turmaRoutes.get('/turma', TurmaController.index);
turmaRoutes.get('/turma/:idTurma', TurmaController.show);
turmaRoutes.delete('/turma/:idTurma', TurmaController.delete);
turmaRoutes.put('/turma/:idTurma', TurmaController.update);

export default turmaRoutes;
