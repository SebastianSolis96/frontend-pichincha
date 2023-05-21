import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router';

import { InputSearch, MainButton, Table } from '../components';
import './ListView.css';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../interfaces';

const ListView = () => {
  const navigate = useNavigate();

  const { productsQuery } = useProducts();
  const { data } = productsQuery;

  const [inputValue, setInputValue] = useState('');
  const [preparedData, setPreparedData] = useState<Product[]>([]);

  useEffect(() => {
    data && setPreparedData(data);
  }, [data]);
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => { 
    setInputValue(event.target.value);
  };
  
  const handleAdd = () => {
    navigate('/products/form/');
  }

  return (
    <main className="main-list">
      <article className='actions-container'>
        <InputSearch value={ inputValue } onChange={ handleChange } />
        <MainButton title={ 'Agregar' } action={ () => handleAdd() } />
      </article>
      <article className='data-container'>
        <Table data={ preparedData } filter={inputValue} />
      </article>
    </main>
  );
};

export default ListView;