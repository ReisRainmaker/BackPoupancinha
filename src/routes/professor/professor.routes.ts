import { Router } from 'express';
import ProfessorController from '../../controllers/professor/professor.controller';

const professorRoutes = Router();

professorRoutes.post('/', ProfessorController.store);
professorRoutes.get('/', ProfessorController.index);
professorRoutes.get('/:idProfessor', ProfessorController.show);
professorRoutes.get('/byTurma/:idTurma', ProfessorController.getByTurma);
professorRoutes.get('/byUser/:idUser', ProfessorController.getByUser);
professorRoutes.delete('/:idProfessor', ProfessorController.delete);
professorRoutes.put('/:idProfessor', ProfessorController.update);

export default professorRoutes;
