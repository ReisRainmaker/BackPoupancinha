import { Router } from 'express'
import HomeController from '../../controllers/homeAluno/homeAluno.controller'

const homeRoutes = Router()

homeRoutes.get('/user/:email', HomeController.getUserByEmail)
homeRoutes.get('/aluno/:userId', HomeController.getAlunoByUserid)
homeRoutes.get('/conta/:idAluno', HomeController.getContaByidAluno)

export default homeRoutes