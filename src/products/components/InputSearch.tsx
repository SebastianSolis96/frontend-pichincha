import { FC, ChangeEvent } from 'react';

import './index.css';

interface Props {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputSearch: FC<Props> = ({ value, onChange }) => {
  return (
    <input onChange={ onChange } 
      value={ value }
      className="input-search" 
      type='text' 
      placeholder=' Search...' />
  );
};
