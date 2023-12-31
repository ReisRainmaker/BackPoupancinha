import { Request, Response } from 'express';
import Aluno from '../../models/Aluno';
import User from '../../models/User';

export default class AlunoController {
  //get
  
  static async index(req: Request, res: Response) {
    const alunos = await Aluno.find()
    return res.json(alunos)
  }
  
  static async show(req: Request, res: Response) {
    //usa id do aluno para encontrar aluno
    const { idAluno } = req.params
    if (!idAluno) {
      return res.status(400).json({ error: 'O Id é obrigatório' })
    }
    const idAlunoNumber: number = +idAluno;
    try {    
      const aluno = await Aluno.findOneBy({ idAluno: idAlunoNumber})
      if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      return res.json(aluno)
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
  //delete
  static async delete(req: Request, res: Response) {
    const { idAluno } = req.params

    if (!idAluno || isNaN(Number(idAluno))) {
      return res.status(400).json({ error: 'O id é obrigatório' })
    }

    const aluno = await Aluno.findOneBy({ idAluno: Number(idAluno) })
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' })
    }

    await aluno.remove()
    return res.status(204).json() // Vamos retornar 204 pois não temos conteúdo para retornar
  }
  //put
  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { nomeAluno, sobrenomeAluno, emailAluno, senha, dataNascimento } = req.body;

    if (!id || isNaN(Number(id)) || !nomeAluno || !sobrenomeAluno || !emailAluno || !senha || !dataNascimento) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    try {
      const aluno = await Aluno.findOneBy({ idAluno: Number(id) })

      if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }


      await Aluno.save(aluno);

      return res.json(aluno); // Retorna o aluno atualizado.
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar o aluno' });
    }
  }
}
