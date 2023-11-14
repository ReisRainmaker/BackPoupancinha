import { Request, Response } from 'express';
import MovimentacaoConta from '../../models/MovimentacaoConta';

export default class MovimentacaoContaController {
  // Post
  static async store(req: Request, res: Response) {
    try {
      const { idConta, valor, tipo, totalAnterior, totalAtual } = req.body;

      // Verifique se os campos obrigatórios foram fornecidos.
      if (!idConta || isNaN(Number(idConta)) || valor === undefined || tipo === undefined || totalAnterior === undefined || totalAtual === undefined) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      // Crie uma instância de movimentação de conta e defina seus atributos.
      const movimentacaoConta = new MovimentacaoConta();
      movimentacaoConta.conta = idConta;
      movimentacaoConta.valor = valor;
      movimentacaoConta.tipo = tipo;
      movimentacaoConta.totalAnterior = totalAnterior;
      movimentacaoConta.totalAtual = totalAtual;

      // Salve a movimentação de conta no banco de dados.
      await movimentacaoConta.save();

      return res.status(201).json(movimentacaoConta);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar a movimentação de conta' });
    }
  }

  // Get (index)
  static async index(req: Request, res: Response) {
    const movimentacoesConta = await MovimentacaoConta.find();
    return res.json(movimentacoesConta);
  }

  // Get (show)
  static async show(req: Request, res: Response) {
    const { idMovimentacao } = req.params;

    if (!idMovimentacao || isNaN(Number(idMovimentacao))) {
      return res.status(400).json({ error: 'O id é obrigatório' });
    }

    const movimentacaoConta = await MovimentacaoConta.findOneBy({idMovimentacao: Number(idMovimentacao)});

    if (!movimentacaoConta) {
      return res.status(404).json({ error: 'Movimentação de conta não encontrada' });
    }

    return res.json(movimentacaoConta);
  }

  // Delete
  static async delete(req: Request, res: Response) {
    const { idMovimentacao } = req.params;

    if (!idMovimentacao || isNaN(Number(idMovimentacao))) {
      return res.status(400).json({ error: 'O id é obrigatório' });
    }

    const movimentacaoConta = await MovimentacaoConta.findOneBy({idMovimentacao: Number(idMovimentacao)});

    if (!movimentacaoConta) {
      return res.status(404).json({ error: 'Movimentação de conta não encontrada' });
    }

    await movimentacaoConta.remove();
    return res.status(204).json(); // Vamos retornar 204 pois não temos conteúdo para retornar.
  }

  // Put (update)
  static async update(req: Request, res: Response) {
    const { idMovimentacao } = req.params;
    const { idConta, valor, tipo, totalAnterior, totalAtual } = req.body;

    if (!idMovimentacao || isNaN(Number(idMovimentacao)) || !idConta || isNaN(Number(idConta)) || valor === undefined || tipo === undefined || totalAnterior === undefined || totalAtual === undefined) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
      const movimentacaoConta = await MovimentacaoConta.findOneBy({idMovimentacao: Number(idMovimentacao)});

      if (!movimentacaoConta) {
        return res.status(404).json({ error: 'Movimentação de conta não encontrada' });
      }

      movimentacaoConta.conta = idConta;
      movimentacaoConta.valor = valor;
      movimentacaoConta.tipo = tipo;
      movimentacaoConta.totalAnterior = totalAnterior;
      movimentacaoConta.totalAtual = totalAtual;

      await movimentacaoConta.save();

      return res.json(movimentacaoConta);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar a movimentação de conta' });
    }
  }
}
