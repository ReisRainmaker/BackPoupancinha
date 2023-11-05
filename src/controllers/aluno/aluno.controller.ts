import { Request, Response } from 'express';
import Aluno from '../../models/Aluno';

export default class AlunoController {
  //Post
  static async store(req: Request, res: Response) {
    try {
      const { nomeAluno, sobrenomeAluno, emailAluno, senha, dataNascimento, turmas } = req.body;

      // Verifique se os campos obrigatórios foram fornecidos.
      if (!nomeAluno || !sobrenomeAluno || !emailAluno || !senha || !dataNascimento || !turmas) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      // Crie uma instância do aluno e defina seus atributos.
      const aluno = new Aluno();
      aluno.turmas = turmas; // Certifique-se de que 'turmas' seja um array de IDs de turmas existentes.


      // Salve o aluno no banco de dados.
      await aluno.save();

      return res.status(201).json(aluno);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar o aluno' });
    }
  }
  //get
  static async index(req: Request, res: Response) {
    const alunos = await Aluno.find()
    return res.json(alunos)
  }
  //get
  static async show(req: Request, res: Response) {
    const { idAluno } = req.params

    if (!idAluno || isNaN(Number(idAluno))) {
      return res.status(400).json({ error: 'O id é obrigatório' })
    }

    const aluno = await Aluno.findOneBy({ idAluno: Number(idAluno) })
    return res.json(aluno)
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
