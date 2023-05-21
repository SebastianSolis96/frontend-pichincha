import { useMemo } from 'react';
import { useParams } from 'react-router';
import { useProducts } from '../hooks/useProducts';
import { Form } from '../components/Form';
import { findProductById } from '../../helpers/findProductById';

import './FormView.css';

const FormView = () => {
  const { productId } = useParams();
  const { productsQuery } = useProducts();
  const { data } = productsQuery;

  const productToUpdate = useMemo(() => findProductById( productId, data ), [productId, data]);

  return (
    <main className="main">
      <article className='form-view'>
        <section>
          <h1>Formulario de { productToUpdate ? 'Edición' : 'Registro' }</h1>
          <hr />
        </section>
        <section>
          <Form productToUpdate={ productToUpdate } />
        </section>
      </article>
    </main>
  );
};
export default FormView;