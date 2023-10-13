import { Router } from 'express'
import alunoController from '../../controllers/aluno/aluno.controller'
import AlunoController from '../../controllers/aluno/aluno.controller'

const alunoRoutes = Router()

alunoRoutes.post('/aluno', alunoController.store)
alunoRoutes.get('/aluno', alunoController.index)
alunoRoutes.get('/aluno/:idAluno', AlunoController.show)
alunoRoutes.delete('/aluno/:idAluno', AlunoController.delete)
alunoRoutes.put('/aluno/:idAluno', alunoController.update)

export default alunoRoutes