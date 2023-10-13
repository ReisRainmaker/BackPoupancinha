import { Request, Response } from 'express';
import Produto from '../../models/Produtos';

export default class ProdutoController {
  // Post
  static async store(req: Request, res: Response) {
    try {
      const { nome, preco, imagem, idProfessor } = req.body;

      // Verifique se os campos obrigatórios foram fornecidos.
      if (!nome || !preco || isNaN(Number(preco)) || !imagem || !idProfessor || isNaN(Number(idProfessor))) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      // Crie uma instância de produto e defina seus atributos.
      const produto = new Produto();
      produto.nome = nome;
      produto.preco = preco;
      produto.imagem = imagem;
      produto.idProfessor = idProfessor;

      // Salve o produto no banco de dados.
      await produto.save();

      return res.status(201).json(produto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar o produto' });
    }
  }

  // Get (index)
  static async index(req: Request, res: Response) {
    const produtos = await Produto.find();
    return res.json(produtos);
  }

  // Get (show)
  static async show(req: Request, res: Response) {
    const { idProduto } = req.params;

    if (!idProduto || isNaN(Number(idProduto))) {
      return res.status(400).json({ error: 'O id é obrigatório' });
    }

    const produto = await Produto.findOneBy({idProduto: Number(idProduto)});

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    return res.json(produto);
  }

  // Delete
  static async delete(req: Request, res: Response) {
    const { idProduto } = req.params;

    if (!idProduto || isNaN(Number(idProduto))) {
      return res.status(400).json({ error: 'O id é obrigatório' });
    }

    const produto = await Produto.findOneBy({idProduto: Number(idProduto)});

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await produto.remove();
    return res.status(204).json(); // Vamos retornar 204 pois não temos conteúdo para retornar.
  }

  // Put (update)
  static async update(req: Request, res: Response) {
    const { idProduto } = req.params;
    const { nome, preco, imagem, idProfessor } = req.body;

    if (!idProduto || isNaN(Number(idProduto)) || !nome || !preco || isNaN(Number(preco)) || !imagem || !idProfessor || isNaN(Number(idProfessor))) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
      const produto = await Produto.findOneBy({idProduto: Number(idProduto)});

      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      produto.nome = nome;
      produto.preco = preco;
      produto.imagem = imagem;
      produto.idProfessor = idProfessor;

      await produto.save();

      return res.json(produto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar o produto' });
    }
  }
}
