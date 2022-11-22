import { Request, Response } from 'express';

import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';

class MainProductsController {
  public async index(_: Request, res: Response): Promise<Response> {
    const listProducts = new ListProductService();

    const products = await listProducts.execute();

    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showProduct = new ShowProductService();

    const product = await showProduct.execute({ id });

    return res.json(product);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;

    const createProduct = new CreateProductService();

    const newProduct = await createProduct.execute({ name, price, quantity });

    return res.json(newProduct);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;

    const { id } = req.params;

    const updateProduct = new UpdateProductService();

    const updatedProduct = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });

    return res.json(updatedProduct);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteProduct = new DeleteProductService();

    const result = await deleteProduct.execute({ id });

    return res.json(result);
  }
}

export default MainProductsController;
