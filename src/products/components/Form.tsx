import { useState, Dispatch, SetStateAction, FC, useEffect } from 'react';
import moment from 'moment';

import { MainButton, SecondaryButton } from '.';
import { FormErrors, createUpdatedFormValues, initErrors, initForm, validateInput } from '../../helpers/formHelper';
import { FormValues, Product } from '../interfaces';

import './index.css';
import { useProducts } from '../hooks/useProducts';

interface Props {
  productToUpdate ?: Product;
}

export const Form: FC<Props> = ({ productToUpdate }) => {
  const { createProduct, updateProduct } = useProducts();
  const [formErrors, setFormErrors] = useState(initErrors);
  const [formValues, setFormValues] = useState(initForm); 
  const [isError, setIsError] = useState(true); 
  const { id, productName, description, logo, date_release, date_revision } = formValues;
  
  /* Useeffect para identificar si se va a editar, el formaVulues no sea initForm 
  sino el valor que tenga ese producto */
  useEffect(() => {
    if (productToUpdate) {
      const updatedFormValues = createUpdatedFormValues(formValues, productToUpdate);
      setFormValues(updatedFormValues);
    }
  }, [productToUpdate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(name === 'date_release'){
      setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
        date_revision: moment(value).add(1, 'year').format('YYYY-MM-DD')
      }));
    }else {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    validateInput(name as keyof FormValues, value, formValues, setFormErrors as Dispatch<SetStateAction<FormErrors>>, formErrors, setIsError as Dispatch<SetStateAction<boolean>>);
  };

  const handleResetValues = () => {
    const updatedFormValues = productToUpdate
      ? createUpdatedFormValues(formValues, productToUpdate)
      : initForm;
    setFormValues(updatedFormValues);
    setFormErrors(initErrors);
  }

  const handleSubmit = () => {
    // Validar todos los campos antes de enviar el formulario
    const fieldNames: Array<keyof FormValues> = ['id', 'productName', 'description', 'logo', 'date_release', 'date_revision'];
    let hasErrors = false;

    fieldNames.forEach((fieldName) => {
      const value = formValues[fieldName];
      validateInput(fieldName as keyof FormValues, value, formValues, setFormErrors as Dispatch<SetStateAction<FormErrors>>, formErrors, setIsError as Dispatch<SetStateAction<boolean>>);

      if (formErrors[fieldName]) {
        hasErrors = true;
      }
    });

    if (!hasErrors) {
      if (productToUpdate) {
        // Editar producto existente
        updateProduct( formValues );
      } else {
        // Crear nuevo producto
        createProduct( formValues );
      }
    }
  };

  return (
    <article className='form'>
      <form className="form-container">
        <div>
          <label htmlFor="id-input">ID:</label>
          <input type="text" id="id-input" placeholder='tj-13' 
            name="id" value={id} onChange={ handleInputChange }  
            className={formErrors.id ? 'input-error' : ''} disabled={productToUpdate ? true : false} />
          {formErrors.id && <span className="invalid-id">{formErrors.id}</span>}
        </div>
        <div>
          <label htmlFor="nombre-input">Nombre:</label>
          <input type="text" id="nombre-input" placeholder='Tarjeta de crédito' 
            name="productName" value={productName} onChange={ handleInputChange }  
            className={formErrors.productName ? 'input-error' : ''} />
          {formErrors.productName && <span className="invalid-id">{formErrors.productName}</span>}
        </div>
        <div>
          <label htmlFor="descripcion-input">Descripción:</label>
          <input type="text" id="descripcion-input" placeholder='Nuevo producto tarjeta de crédito' 
            name="description" value={description} onChange={ handleInputChange }   
            className={formErrors.description ? 'input-error' : ''} />
          {formErrors.description && <span className="invalid-id">{formErrors.description}</span>}
        </div>
        <div>
          <label htmlFor="logo-input">Logo:</label>
          <input type="url" id="logo-input" placeholder='Url con la imagen' 
            name="logo" value={logo} onChange={ handleInputChange }   
            className={formErrors.logo ? 'input-error' : ''} />
          {formErrors.logo && <span className="invalid-id">{formErrors.logo}</span>}
        </div>
        <div>
          <label htmlFor="fecha-liberacion-input">Fecha de Liberación:</label>
          <input type="date" id="fecha-liberacion-input" 
            name="date_release" value={date_release} onChange={ handleInputChange } 
            className={formErrors.date_release ? 'input-error' : ''} />
          {formErrors.date_release && <span className="invalid-id">{formErrors.date_release}</span>}
        </div>
        <div>
          <label htmlFor="fecha-revision-input">Fecha de Revisión:</label>
          <input type="date" id="fecha-revision-input" disabled 
            name="date_revision" value={date_revision} onChange={ handleInputChange }
            className={formErrors.date_revision ? 'input-error' : ''} />
          {formErrors.date_revision && <span className="invalid-id">{formErrors.date_revision}</span>}
        </div>

        <footer className="buttons-container">
          <SecondaryButton title={ 'Reiniciar' } action={ handleResetValues } />
          <MainButton title={ 'Enviar' } action={ handleSubmit } disabled={ isError } />
        </footer>
      </form>
    </article>
  );
};