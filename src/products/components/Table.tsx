import { useState, FC } from 'react';
import { useNavigate } from 'react-router';

import { FooterTable } from '.';
import { Popup } from './Popup';
import { handleCloseMenu, handleOpenMenu } from '../../helpers/uiControllersPopup';
import { THead } from './THead';
import { TBody } from './TBody';
import { Pagination } from './Pagination';
import { TableProps } from '../interfaces';
import { initPopup, filterHelper } from '../../helpers/tableHelper';
import { useProducts } from '../hooks/useProducts';

export const Table: FC<TableProps> = ({ data, filter }) => {
  const navigate = useNavigate();
  const { deleteProduct } = useProducts();

  const [popupState, setPopupState] = useState(initPopup);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [sharedId, setSharedId] = useState('');

  const handleIdChange = (id: string) => {
    // Actualizar el estado compartido con el id del product
    setSharedId(id);
  };

  const filteredData = filterHelper(data, filter);

  const totalPages = filteredData ? Math.ceil(filteredData.length / resultsPerPage) : 0;

  const handlePageChange = (page: number) => { setCurrentPage(page); };
  
  const handleEdit = () => {
    navigate(`/products/form/${ sharedId }`);
  }

  const handleClose = () => {
    setPopupState(initPopup);
    handleCloseMenu();
  }

  const handleDeleteQuestion = () => {
    handleCloseMenu();
    setPopupState({
      title: '¿Seguro desea eliminar?',
      action: 'delete',
      titleMainButton: 'Eliminar',
      titleSecondaryButton: 'Cancelar',
    });
    handleOpenMenu();
  }

  const handleDelete = () => {
    deleteProduct(sharedId);
    handleClose();
  }

  return (
    <>
      <Popup title={ popupState.title }
        action = { popupState.action }
        titleMainButton={ popupState.titleMainButton }
        titleSecondaryButton={ popupState.titleSecondaryButton }
        handleEdit={ () => handleEdit() }
        handleDelete={ () => handleDelete() } 
        handleDeleteQuestion={ () => handleDeleteQuestion() } 
        handleCloseMenu={ () => handleClose() }
      />
      <table>
        <THead />
        <TBody onIdUpdate={ handleIdChange } data={ filteredData } 
          currentPage={currentPage} resultsPerPage={resultsPerPage} handleOpenMenu={ () => handleOpenMenu() } />
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

      <FooterTable data={ filteredData } setResultsPerPage={ setResultsPerPage } />
    </>
  );
};