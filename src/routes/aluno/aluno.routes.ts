import { Router } from 'express'
import alunoController from '../../controllers/aluno/aluno.controller'
import AlunoController from '../../controllers/aluno/aluno.controller'

const alunoRoutes = Router()

alunoRoutes.get('/', alunoController.index)
alunoRoutes.get('/:email', AlunoController.show)
alunoRoutes.delete('/:email', AlunoController.delete)
alunoRoutes.put('/:email', alunoController.update)


export default alunoRoutes