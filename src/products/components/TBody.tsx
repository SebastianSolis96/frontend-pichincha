import { FC } from 'react';

import MenuIcon from '../../assets/MenuIcon.svg';
import { useProducts } from '../hooks/useProducts';
import { getDate } from '../../helpers/getDate';
import { Product } from '../interfaces';

interface Props {
  handleOpenMenu: () => void;
  currentPage: number;
  resultsPerPage: number;
  data: Product[] | undefined;
  onIdUpdate: (data: string) => void;
}
export const TBody:FC<Props> = ({ handleOpenMenu, currentPage, resultsPerPage, data, onIdUpdate }) => {
  const { productsQuery } = useProducts();

  // Calculamos el índice inicial y final de los resultados a mostrar en la página actual
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;

  // Obtenemos los resultados que se mostrarán en la página actual
  const currentResults = data?.slice(startIndex, endIndex);
  
  return (
    <tbody>
      {productsQuery.isLoading 
        ? (<tr><td>...</td></tr>) 
        : ( currentResults?.map((product) => (
              <tr key={product.id}>
                <td>
                  <img src={product.logo} className="product-logo" alt="Logo del producto" width="50" height="50" />
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{ getDate( product.date_release ) }</td>
                <td>{ getDate( product.date_revision) }</td>
                <td className="menu-popup"
                  onClick={() => { 
                    onIdUpdate(product.id); 
                    handleOpenMenu(); 
                  }}
                >
                  <img
                    src={MenuIcon}
                    className="logo"
                    alt="Menu logo"
                  />
                </td>
              </tr>
          ))
        )
      }
    </tbody>
  );
};