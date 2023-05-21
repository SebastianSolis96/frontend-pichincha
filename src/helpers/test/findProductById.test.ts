import { Product } from "../../products/interfaces";
import { findProductById } from "../findProductById";

describe('Prueba al helper findProductById', () => {
  it("test_find_product_by_id_with_valid_id", () => {
    const products: Product[] = [
      {
        id: "1",
        name: "Product 1",
        description: "Description 1",
        logo: "Logo 1",
        date_release: "2022-01-01",
        date_revision: "2022-01-02"
      },
      {
        id: "2",
        name: "Product 2",
        description: "Description 2",
        logo: "Logo 2",
        date_release: "2022-01-03",
        date_revision: "2022-01-04"
      }
    ];
    const result = findProductById("1", products);
    expect(result).toEqual(products[0]);
  });

  it("test_find_first_product", () => {
    const products: Product[] = [
      {
        id: "1",
        name: "Product 1",
        description: "Description 1",
        logo: "Logo 1",
        date_release: "2022-01-01",
        date_revision: "2022-01-02"
      },
      {
        id: "2",
        name: "Product 2",
        description: "Description 2",
        logo: "Logo 2",
        date_release: "2022-01-03",
        date_revision: "2022-01-04"
      }
    ];
    const result = findProductById(undefined, products);
    expect(result).toEqual(products[0]);
  });

  it("test_find_product_by_id_with_invalid_id", () => {
    const products: Product[] = [
      {
        id: "1",
        name: "Product 1",
        description: "Description 1",
        logo: "Logo 1",
        date_release: "2022-01-01",
        date_revision: "2022-01-02"
      },
      {
        id: "2",
        name: "Product 2",
        description: "Description 2",
        logo: "Logo 2",
        date_release: "2022-01-03",
        date_revision: "2022-01-04"
      }
    ];
    const result = findProductById("3", products);
    expect(result).toBeUndefined();
  });
});