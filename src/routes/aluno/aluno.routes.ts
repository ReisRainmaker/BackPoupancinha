import { Router } from 'express'
import AlunoController from '../../controllers/aluno/aluno.controller'

const alunoRoutes = Router()

alunoRoutes.get('/', AlunoController.index)
alunoRoutes.get('/:idAluno', AlunoController.show)
alunoRoutes.delete('/:idAluno', AlunoController.delete)
alunoRoutes.put('/:idAluno', AlunoController.update)


export default alunoRoutes