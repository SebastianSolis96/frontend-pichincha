import { FC } from 'react';

import './index.css';
import { MainButton, SecondaryButton } from '.';
import { LightButton } from './LightButton';

interface Props {
  title: string;
  action: string;
  titleMainButton: string;
  titleSecondaryButton: string;
  handleDelete: () => void;
  handleDeleteQuestion: () => void;
  handleEdit: () => void;
  handleCloseMenu: () => void;
}

export const Popup: FC<Props> = ({ 
  title, 
  action, 
  titleMainButton,
  titleSecondaryButton,
  handleDelete, 
  handleDeleteQuestion,
  handleEdit, 
  handleCloseMenu }) => {
  return (
    <div id="popup" className="popup">
      <div className="popup-content">
        <p>{ title }</p>
      </div>
      <div className="popup-options">
        <MainButton title={ titleMainButton } 
          action={ action === 'actions' ? () => handleDeleteQuestion() : () => handleDelete() } 
        />
        <SecondaryButton title={ titleSecondaryButton } 
          action={ action === 'actions' ? () => handleEdit() : () => handleCloseMenu() } 
        />
        {
          action === 'actions' &&
            <LightButton title={ 'Cancelar' } action={ () => handleCloseMenu() } />
        }
      </div>
    </div>
  );
};
