import { useMutation, useQuery } from '@tanstack/react-query';

import { Product, productToSave } from '../interfaces';
import { pichinchaApi } from '../../api/pichinchaApi';
import moment from 'moment';

const getProducts = async(): Promise<Product[]> => {
    try {
        const { data } = await pichinchaApi.get<Product[]>('/');
        return data;
    } catch (err) {
        alert('Error: Header ‘authorId’ is missing');
        return [];
    }
}

const deleteProduct = async (productId: string): Promise<Product[]> => {
    try {
        const { data } = await pichinchaApi.delete(`/${productId}`);
        return data;
    } catch (err: any) {
        alert(err.response.data.error);
        return [];
    }
};

const redirectToURL = (path: string) => {
    const currentURL = window.location.href;
    const baseURL = currentURL.split('?')[0]; // Obtener la URL base sin parámetros de consulta

    const newURL = `${baseURL}/${path}`; // Añadir más a la URL

    window.location.href = newURL; // Redireccionar a la nueva URL
};

const createProduct = async (product: productToSave): Promise<Product> => {
    try {
        const { productName, ...modifiedProduct } = product;
        const updatedProduct = { 
            ...modifiedProduct, name: productName, 
            date_release: moment.utc(product.date_release).format('YYYY-MM-DDTHH:mm:ss.SSSZ'), 
            date_revision: moment.utc(product.date_revision).format('YYYY-MM-DDTHH:mm:ss.SSSZ') 
        };
        
        const { data } = await pichinchaApi.post('/', updatedProduct);
        alert('!Guardado¡');
        redirectToURL('/products/list');
        return data;
    } catch (err: any) {
        alert(err.response.data.error);
        throw err;
    }
};

const updateProduct = async (product: productToSave): Promise<Product> => {
    try {
        const { productName, ...modifiedProduct } = product;
        const updatedProduct = {
            ...modifiedProduct,
            name: productName,
            date_release: moment.utc(product.date_release).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
            date_revision: moment.utc(product.date_revision).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        };

        const { data } = await pichinchaApi.put(`/`, updatedProduct);
        alert('¡Actualizado!');
        redirectToURL('/products/list');
        return data;
    } catch (err: any) {
        alert(err.response.data.error);
        throw err;
    }
};

export const useProducts = () => {
    const productsQuery = useQuery(
        ['products'],
        () => getProducts(),
    );

    const deleteProductMutation = useMutation(deleteProduct, {
        onSuccess: () => {
            // Actualizar la consulta de productos después de eliminar
            productsQuery.refetch();
        },
    });

    const createProductMutation = useMutation(createProduct, {
        onSuccess: () => {
            // Actualizar la consulta de productos después de crear
            productsQuery.refetch();
        },
    });

    const updateProductMutation = useMutation(updateProduct, {
        onSuccess: () => {
            // Actualizar la consulta de productos después de actualizar
            productsQuery.refetch();
        },
    });

    return {
        /* Properties */
        productsQuery,
        deleteProduct: deleteProductMutation.mutate,
        createProduct: createProductMutation.mutate,
        updateProduct: updateProductMutation.mutate,
    }
}