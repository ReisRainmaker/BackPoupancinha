import { Request, Response } from 'express';
import Professor from '../../models/Professor';

export default class ProfessorController {
  // Post
  static async store(req: Request, res: Response) {
    try {
      const { nomeProfessor, sobrenomeProfessor, emailProfessor, senha, nascimento, idJogos } = req.body;

      // Verifique se os campos obrigatórios foram fornecidos.
      if (!nomeProfessor || !sobrenomeProfessor || !emailProfessor || !senha || !nascimento || !idJogos) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      // Crie uma instância de professor e defina seus atributos.
      const professor = new Professor();
      professor.nomeProfessor = nomeProfessor;
      professor.sobrenomeProfessor = sobrenomeProfessor;
      professor.emailProfessor = emailProfessor;
      professor.senha = senha;
      professor.nascimento = nascimento;
      professor.idJogos = idJogos;

      // Salve o professor no banco de dados.
      await professor.save();

      return res.status(201).json(professor);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar o professor' });
    }
  }

  // Get (index)
  static async index(req: Request, res: Response) {
    const professores = await Professor.find();
    return res.json(professores);
  }

  // Get (show)
  static async show(req: Request, res: Response) {
    const { idProfessor } = req.params;

    if (!idProfessor || isNaN(Number(idProfessor))) {
      return res.status(400).json({ error: 'O id é obrigatório' });
    }

    const professor = await Professor.findOneBy({idProfessor: Number(idProfessor)});

    if (!professor) {
      return res.status(404).json({ error: 'Professor não encontrado' });
    }

    return res.json(professor);
  }

  // Delete
  static async delete(req: Request, res: Response) {
    const { idProfessor } = req.params;

    if (!idProfessor || isNaN(Number(idProfessor))) {
      return res.status(400).json({ error: 'O id é obrigatório' });
    }

    const professor = await Professor.findOneBy({idProfessor: Number(idProfessor)});

    if (!professor) {
      return res.status(404).json({ error: 'Professor não encontrado' });
    }

    await professor.remove();
    return res.status(204).json(); // Vamos retornar 204 pois não temos conteúdo para retornar.
  }

  // Put (update)
  static async update(req: Request, res: Response) {
    const { idProfessor } = req.params;
    const { nomeProfessor, sobrenomeProfessor, emailProfessor, senha, nascimento, idJogos } = req.body;

    if (!idProfessor || isNaN(Number(idProfessor)) || !nomeProfessor || !sobrenomeProfessor || !emailProfessor || !senha || !nascimento || !idJogos) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
      const professor = await Professor.findOneBy({idProfessor: Number(idProfessor)});

      if (!professor) {
        return res.status(404).json({ error: 'Professor não encontrado' });
      }

      professor.nomeProfessor = nomeProfessor;
      professor.sobrenomeProfessor = sobrenomeProfessor;
      professor.emailProfessor = emailProfessor;
      professor.senha = senha;
      professor.nascimento = nascimento;
      professor.idJogos = idJogos;

      await professor.save();

      return res.json(professor);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar o professor' });
    }
  }
}
