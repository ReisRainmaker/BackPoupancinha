import { Router } from 'express'
import HomeController from '../../controllers/home/home.controller'

const homeRoutes = Router()

homeRoutes.get('/userEmail/:email', HomeController.getUserByEmail)
homeRoutes.get('/aluno/:idUser', HomeController.getAlunoByidUser)
homeRoutes.get('/contaAluno/:idAluno', HomeController.getContaByidAluno)
homeRoutes.get('/idUser/:id', HomeController.getUserById)
homeRoutes.get('/professor/:idUser', HomeController.getProfessorByidUser)

export default homeRoutes