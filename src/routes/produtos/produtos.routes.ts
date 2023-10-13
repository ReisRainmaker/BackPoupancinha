import { Router } from 'express';
import ProdutoController from '../../controllers/produtos/produtos.controller';

const produtoRoutes = Router();

produtoRoutes.post('/produto', ProdutoController.store);
produtoRoutes.get('/produto', ProdutoController.index);
produtoRoutes.get('/produto/:idProduto', ProdutoController.show);
produtoRoutes.delete('/produto/:idProduto', ProdutoController.delete);
produtoRoutes.put('/produto/:idProduto', ProdutoController.update);

export default produtoRoutes;
