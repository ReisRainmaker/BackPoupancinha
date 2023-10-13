import { Request, Response } from 'express';
import Pontuacao from '../../models/Pontuacao';

export default class PontuacaoController {
  // Post
  static async store(req: Request, res: Response) {
    try {
      const { idAluno, idProfessor, dataHoraAcesso, pontosPossiveis, pontosFeitos, acertos, erros, tempoJogo } = req.body;

      // Verifique se os campos obrigatórios foram fornecidos.
      if (!idAluno || isNaN(Number(idAluno)) || !idProfessor || isNaN(Number(idProfessor)) || !dataHoraAcesso || !pontosPossiveis || isNaN(Number(pontosPossiveis)) || !pontosFeitos || isNaN(Number(pontosFeitos)) || !acertos || isNaN(Number(acertos)) || !erros || isNaN(Number(erros)) || !tempoJogo || isNaN(Number(tempoJogo))) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      // Crie uma instância de pontuação e defina seus atributos.
      const pontuacao = new Pontuacao();
      pontuacao.idAluno = idAluno;
      pontuacao.idProfessor = idProfessor;
      pontuacao.dataHoraAcesso = dataHoraAcesso;
      pontuacao.pontosPossiveis = pontosPossiveis;
      pontuacao.pontosFeitos = pontosFeitos;
      pontuacao.acertos = acertos;
      pontuacao.erros = erros;
      pontuacao.tempoJogo = tempoJogo;

      // Salve a pontuação no banco de dados.
      await pontuacao.save();

      return res.status(201).json(pontuacao);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar a pontuação' });
    }
  }

  // Get (index)
  static async index(req: Request, res: Response) {
    const pontuacoes = await Pontuacao.find();
    return res.json(pontuacoes);
  }

  // Get (show)
  static async show(req: Request, res: Response) {
    const { idPontuacao } = req.params;

    if (!idPontuacao || isNaN(Number(idPontuacao))) {
      return res.status(400).json({ error: 'O id é obrigatório' });
    }

    const pontuacao = await Pontuacao.findOneBy({idPontuacao: Number(idPontuacao)});

    if (!pontuacao) {
      return res.status(404).json({ error: 'Pontuação não encontrada' });
    }

    return res.json(pontuacao);
  }

  // Delete
  static async delete(req: Request, res: Response) {
    const { idPontuacao } = req.params;

    if (!idPontuacao || isNaN(Number(idPontuacao))) {
      return res.status(400).json({ error: 'O id é obrigatório' });
    }

    const pontuacao = await Pontuacao.findOneBy({idPontuacao: Number(idPontuacao)});

    if (!pontuacao) {
      return res.status(404).json({ error: 'Pontuação não encontrada' });
    }

    await pontuacao.remove();
    return res.status(204).json(); // Vamos retornar 204 pois não temos conteúdo para retornar.
  }

  // Put (update)
  static async update(req: Request, res: Response) {
    const { idPontuacao } = req.params;
    const { idAluno, idProfessor, dataHoraAcesso, pontosPossiveis, pontosFeitos, acertos, erros, tempoJogo } = req.body;

    if (!idPontuacao || isNaN(Number(idPontuacao)) || !idAluno || isNaN(Number(idAluno)) || !idProfessor || isNaN(Number(idProfessor)) || !dataHoraAcesso || !pontosPossiveis || isNaN(Number(pontosPossiveis)) || !pontosFeitos || isNaN(Number(pontosFeitos)) || !acertos || isNaN(Number(acertos)) || !erros || isNaN(Number(erros)) || !tempoJogo || isNaN(Number(tempoJogo))) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
      const pontuacao = await Pontuacao.findOneBy({idPontuacao: Number(idPontuacao)});

      if (!pontuacao) {
        return res.status(404).json({ error: 'Pontuação não encontrada' });
      }

      pontuacao.idAluno = idAluno;
      pontuacao.idProfessor = idProfessor;
      pontuacao.dataHoraAcesso = dataHoraAcesso;
      pontuacao.pontosPossiveis = pontosPossiveis;
      pontuacao.pontosFeitos = pontosFeitos;
      pontuacao.acertos = acertos;
      pontuacao.erros = erros;
      pontuacao.tempoJogo = tempoJogo;

      await pontuacao.save();

      return res.json(pontuacao);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar a pontuação' });
    }
  }
}
