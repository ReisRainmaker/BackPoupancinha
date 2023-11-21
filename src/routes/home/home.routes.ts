import { Router } from 'express'
import HomeAlunoController from '../../controllers/home/home.controller'

const homeRoutes = Router()

homeRoutes.get('/userEmail/:email', HomeAlunoController.getUserByEmail)
homeRoutes.get('/aluno/:userId', HomeAlunoController.getAlunoByUserid)
homeRoutes.get('/contaAluno/:idAluno', HomeAlunoController.getContaByidAluno)
homeRoutes.get('/userId/:id', HomeAlunoController.getUserById)
homeRoutes.get('/professor/:userId', HomeAlunoController.getProfessorByUserid)

export default homeRoutes