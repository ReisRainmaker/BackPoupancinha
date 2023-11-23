import { Request, Response } from 'express';
import Turma from '../../models/Turma';

export default class TurmaController {
  // Post
  static async store(req: Request, res: Response) {
    try {
      const { nomeTurma, serie, idProfessor } = req.body;

      // Verifique se os campos obrigatórios foram fornecidos.
      if (!nomeTurma || !serie || isNaN(Number(serie)) || !idProfessor || isNaN(Number(idProfessor))) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      // Crie uma instância de turma e defina seus atributos.
      const turma = new Turma();
      turma.nomeTurma = nomeTurma;
      turma.serie = serie;
      turma.idProfessor = idProfessor;

      // Salve a turma no banco de dados.
      await turma.save();

      return res.status(201).json(turma);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar a turma' });
    }
  }

  // Get (index)
  static async index(req: Request, res: Response) {
    const turmas = await Turma.find();
    return res.json(turmas);
  }

  // Get (show)
  static async show(req: Request, res: Response) {
    const { idTurma } = req.params;

    if (!idTurma || isNaN(Number(idTurma))) {
      return res.status(400).json({ error: 'O id é obrigatório' });
    }

    const turma = await Turma.findOneBy({idTurma: Number(idTurma)});

    if (!turma) {
      return res.status(404).json({ error: 'Turma não encontrada' });
    }

    return res.json(turma);
  }
  // Get turma pelo seu nome (para validar na criação de conta do aluno)
  static async showByName(req: Request, res: Response) {
    const { nomeTurma } = req.params;

    if (!nomeTurma) {
      return res.status(400).json({ error: 'O id é obrigatório' });
    }

    const turma = await Turma.findOneBy({nomeTurma: String(nomeTurma)});

    if (!turma) {
      return res.status(404).json({ error: 'Turma não encontrada' });
    }

    return res.json(turma);
  }

  // Get turma pelo id do professor
  static async showByIdProfessor(req: Request, res: Response) {
    const { idProfessor } = req.params;

    if (!idProfessor || isNaN(Number(idProfessor))) {
      return res.status(400).json({ error: 'O id é obrigatório' });
    }

    const turma = await Turma.findBy({idProfessor: Number(idProfessor)});

    if (!turma) {
      return res.status(404).json({ error: 'Turmas não encontradas' });
    }

    return res.json(turma);
  }


  // Delete
  static async delete(req: Request, res: Response) {
    const { idTurma } = req.params;

    if (!idTurma || isNaN(Number(idTurma))) {
      return res.status(400).json({ error: 'O id é obrigatório' });
    }

    const turma = await Turma.findOneBy({idTurma: Number(idTurma)});

    if (!turma) {
      return res.status(404).json({ error: 'Turma não encontrada' });
    }

    await turma.remove();
    return res.status(204).json(); // Vamos retornar 204 pois não temos conteúdo para retornar.
  }

  // Put (update)
  static async update(req: Request, res: Response) {
    const { idTurma } = req.params;
    const { nomeTurma, serie, idProfessor } = req.body;

    if (!idTurma || isNaN(Number(idTurma)) || !nomeTurma || !serie || isNaN(Number(serie)) || !idProfessor || isNaN(Number(idProfessor))) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
      const turma = await Turma.findOneBy({idTurma: Number(idTurma)});

      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada' });
      }

      turma.nomeTurma = nomeTurma;
      turma.serie = serie;
      turma.professor = idProfessor;

      await turma.save();

      return res.json(turma);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar a turma' });
    }
  }
}
