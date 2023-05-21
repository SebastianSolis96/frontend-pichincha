import { Dispatch, SetStateAction } from 'react';
import moment from 'moment';

import { FormValues, Product } from '../products/interfaces';
import { pichinchaApi } from '../api/pichinchaApi';

export type FormErrors = {
  id?: string;
  productName?: string;
  description?: string;
  logo?: string;
  date_release?: string;
  date_revision?: string;
};

export const initForm = {
  id: '',
  productName: '',
  description: '',
  logo: '',
  date_release: moment().format('YYYY-MM-DD'),
  date_revision: moment().add(1, 'year').format('YYYY-MM-DD'),
}

export const initErrors = {
  id: '',
  productName: '',
  description: '',
  logo: '',
  date_release: '',
  date_revision: '',
}

const getCurrentDate = (): string => {
  const currentDate = moment().format('YYYY-MM-DD');
  return currentDate;
};

const getOneYearLater = (date: string): string => {
  const releaseDate = moment(date);
  const reviewDate = releaseDate.add(1, 'year');
  return reviewDate.format('YYYY-MM-DD');
};

// Declaración de la caché
const cacheMap: Map<string | File | null, string> = new Map();

export const getCachedResult = (query: string | File | null): string | null => {
  // Verificar si el resultado está en la caché
  if (cacheMap.has(query)) {
    return cacheMap.get(query) || null;
  }

  return null;
};

export const cacheResult = (query: string | File | null, result: string) => {
  // Guardar el resultado en la caché
  cacheMap.set(query, result);
};

export const performSearch = async (query: string | File | null) => {
  try {
    // Verificar si el resultado ya está en la caché
    const cachedResult = getCachedResult(query);
    if (!cachedResult) {
      // Realizar la búsqueda en la API
      const { data } = await pichinchaApi.get(`/product/${query}`);
      
      // Almacenar el resultado en la caché
      if( data ){
        cacheResult(query, data);
        return ''
      }else{
        return 'El ID no es válido'
      }
    }
    return '';
  } catch (error) {
    return 'El ID no es válido';
  }
};

const performSearchWithDelay = async (value: string | File | null): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      reject(new Error('La búsqueda tardó demasiado en responder'));
    }, 500);

    performSearch(value)
      .then((result) => {
        clearTimeout(timeout);
        resolve(result ? 'El ID no es válido' : '');
      })
      .catch(() => {
        clearTimeout(timeout);
        reject(new Error('El ID no es válido'));
      });
  });
};

export const validateInput = async(
  fieldName: keyof FormValues, 
  value: string | File | null, 
  formValues: FormValues, 
  setFormErrors: Dispatch<SetStateAction<FormErrors>>,
  formErrors: FormErrors,
  setIsError: Dispatch<SetStateAction<boolean>>
) => {
  let errorMessage = '';
  let errorCount = 0; // Contador de errores
  let isAllFieldsFilled = true; // Mantener el estado de allFieldsFilled

  if (fieldName === 'id') {
    if (!value) {
      errorMessage = 'El campo es requerido';
      errorCount++;
    } else if (value.length < 3 || value.length > 10) {
      errorMessage = 'El campo debe tener entre 3 y 10 caracteres';
      errorCount++;
    } else {
      // Validar si es un ID válido mediante el consumo del servicio API
      try {
        errorMessage = await performSearchWithDelay(value);
        if (errorMessage.length > 0) {
          errorCount++;
        }
      } catch (error) {
        errorMessage = 'El ID no es válido';
        errorCount++;
      }
    }
    // Verificar si el mensaje de error es diferente al mensaje devuelto por la API
    if (errorMessage !== 'El ID no es válido') {
      isAllFieldsFilled = false;
    }

  } else if (fieldName === 'productName') {
    if (!value) {
      errorMessage = 'El campo es requerido';
      errorCount++;
    } else if (value.length < 5 || value.length > 100) {
      errorMessage = 'El campo debe tener entre 5 y 100 caracteres';
      errorCount++;
    }
  } else if (fieldName === 'description') {
    if (!value) {
      errorMessage = 'El campo es requerido';
      errorCount++;
    } else if (value.length < 10 || value.length > 200) {
      errorMessage = 'El campo debe tener entre 10 y 200 caracteres';
      errorCount++;
    }
  } else if (fieldName === 'logo') {
    if (!value) {
      errorMessage = 'El campo es requerido';
      errorCount++;
    }
  } else if (fieldName === 'date_release') {
    if (!value) {
      errorMessage = 'El campo es requerido';
      errorCount++;
    } else if (value < getCurrentDate()) {
      errorMessage = 'La fecha debe ser igual o mayor a la fecha actual';
      errorCount++;
    }
  } else if (fieldName === 'date_revision') {
    if (!value) {
      errorMessage = 'El campo es requerido';
      errorCount++;
    } else if (value !== getOneYearLater(formValues.date_revision)) {
      errorMessage = 'La fecha debe ser exactamente un año posterior a la fecha de liberación';
      errorCount++;
    }
  }

  setFormErrors({ ...formErrors, [fieldName]: errorMessage });

  // Verificar si todos los campos están llenos
  Object.keys(formValues).forEach((key) => {
    const fieldValue = formValues[key as keyof FormValues];
    if (fieldValue === null || fieldValue === '') {
      isAllFieldsFilled = false;
    }
  });

  // Comprobar si no hay errores y todos los campos están llenos
  setIsError(errorCount > 0 || !isAllFieldsFilled || formErrors.id === 'El ID no es válido');
};

export const createUpdatedFormValues = ( formValues: typeof initForm, productToUpdate: Product ) => {
  return {
    ...formValues,
    id: productToUpdate.id,
    productName: productToUpdate.name,
    description: productToUpdate.description,
    logo: productToUpdate.logo,
    date_release: moment(productToUpdate.date_release).format('YYYY-MM-DD'),
    date_revision: moment(productToUpdate.date_revision).format('YYYY-MM-DD'),
  };
};