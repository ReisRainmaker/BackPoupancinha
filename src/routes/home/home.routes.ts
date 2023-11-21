import { Router } from 'express'
import HomeController from '../../controllers/home/home.controller'

const homeRoutes = Router()

homeRoutes.get('/userEmail/:email', HomeController.getUserByEmail)
homeRoutes.get('/aluno/:userId', HomeController.getAlunoByUserid)
homeRoutes.get('/contaAluno/:idAluno', HomeController.getContaByidAluno)
homeRoutes.get('/userId/:id', HomeController.getUserById)
homeRoutes.get('/professor/:userId', HomeController.getProfessorByUserid)

export default homeRoutes