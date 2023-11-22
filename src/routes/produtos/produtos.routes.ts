import { Router } from 'express';
import ProdutoController from '../../controllers/produtos/produtos.controller';

const produtoRoutes = Router();

produtoRoutes.post('/', ProdutoController.store);
produtoRoutes.get('/', ProdutoController.index);
produtoRoutes.get('/:idProduto', ProdutoController.show);
produtoRoutes.get('/byProfessor/:idProfessor', ProdutoController.getByProfessor);
produtoRoutes.delete('/:idProduto', ProdutoController.delete);
produtoRoutes.put('/:idProduto', ProdutoController.update);

export default produtoRoutes;
