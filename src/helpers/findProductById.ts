import { Product } from '../products/interfaces';

export const findProductById = ( id: string | undefined, products: Product[] | undefined ): Product | undefined => {
  if (!id || !products) {
    return undefined; // Si id o products son undefined, retorna undefined
  }

  const foundProduct = products.find((product) => product.id === id);
  return foundProduct;
}