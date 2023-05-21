import { FC, ChangeEvent } from 'react';

import { Product } from '../interfaces';

interface Props {
  setResultsPerPage: (resultsPerPage: number) => void;
  data: Product[] | undefined;
}

export const FooterTable: FC<Props> = ({ setResultsPerPage, data }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setResultsPerPage( parseInt(selectedValue) );
  };

  return (
    <footer>
      <p>{`${data?.length || 0} Resultados`}</p>
      
      <select onChange={ handleChange }>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </footer>
  );
};