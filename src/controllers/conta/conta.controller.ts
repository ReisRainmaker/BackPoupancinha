import { Request, Response } from 'express';
import Conta from '../../models/Conta';

export default class ContaController {
  // Post
  static async store(req: Request, res: Response) {
    try {
      const { idAluno, saldoAtual } = req.body;

      // Verifique se os campos obrigatórios foram fornecidos.
      if (!idAluno || isNaN(Number(idAluno)) || saldoAtual === undefined) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      // Crie uma instância da conta e defina seus atributos.
      const conta = new Conta();
      conta.aluno = idAluno;
      conta.saldoAtual = saldoAtual;

      // Salve a conta no banco de dados.
      await conta.save();

      return res.status(201).json(conta);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar a conta' });
    }
  }

  // Get (index)
  static async index(req: Request, res: Response) {
    const contas = await Conta.find();
    return res.json(contas);
  }

  // Get (show)
  static async show(req: Request, res: Response) {
    const { idConta } = req.params;

    if (!idConta || isNaN(Number(idConta))) {
      return res.status(400).json({ error: 'O id é obrigatório' });
    }

    const conta = await Conta.findOneBy({idConta: Number(idConta) });

    if (!conta) {
      return res.status(404).json({ error: 'Conta não encontrada' });
    }

    return res.json(conta);
  }

  // Delete
  static async delete(req: Request, res: Response) {
    const { idConta } = req.params;

    if (!idConta || isNaN(Number(idConta))) {
      return res.status(400).json({ error: 'O id é obrigatório' });
    }

    const conta = await Conta.findOneBy({idConta: Number(idConta)});

    if (!conta) {
      return res.status(404).json({ error: 'Conta não encontrada' });
    }

    await conta.remove();
    return res.status(204).json(); // Vamos retornar 204 pois não temos conteúdo para retornar.
  }

  // Put (update)
  static async update(req: Request, res: Response) {
    const { idConta } = req.params;
    const { idAluno, saldoAtual } = req.body;

    if (!idConta || isNaN(Number(idConta)) || !idAluno || isNaN(Number(idAluno)) || saldoAtual === undefined) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
      const conta = await  Conta.findOneBy({idConta: Number(idConta)});

      if (!conta) {
        return res.status(404).json({ error: 'Conta não encontrada' });
      }

      conta.aluno = idAluno;
      conta.saldoAtual = saldoAtual;

      await conta.save();

      return res.json(conta);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar a conta' });
    }
  }
}
