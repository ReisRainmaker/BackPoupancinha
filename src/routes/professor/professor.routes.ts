import { Router } from 'express';
import ProfessorController from '../../controllers/professor/professor.controller';

const professorRoutes = Router();

professorRoutes.post('/professor', ProfessorController.store);
professorRoutes.get('/professor', ProfessorController.index);
professorRoutes.get('/professor/:idProfessor', ProfessorController.show);
professorRoutes.delete('/professor/:idProfessor', ProfessorController.delete);
professorRoutes.put('/professor/:idProfessor', ProfessorController.update);

export default professorRoutes;
