import { fireEvent, render } from "@testing-library/react";
import FormView from "../FormView";
import moment from "moment";
import { useProducts } from '../../hooks/useProducts';

jest.mock('../hooks/useProducts'); // Mockear el módulo useProducts

describe('Prueba al componente FormView', () => {
  it("test_submit_form_with_valid_inputs_and_create_new_product", () => {
    // Mockear la función createProduct del hook useProducts
    const mockCreateProduct = jest.fn();

    // Establecer el mock para el hook useProducts
    jest.spyOn(useProducts(), 'createProduct').mockImplementation(mockCreateProduct);

    const { getByTitle, getByLabelText } = render(<FormView />);
    const idInput = getByLabelText('ID:');
    const nameInput = getByLabelText('Nombre:');
    const descriptionInput = getByLabelText('Descripción:');
    const logoInput = getByLabelText('Logo:');
    const releaseDateInput = getByLabelText('Fecha de Liberación:');
    const submitButton = getByTitle('Enviar');

    fireEvent.change(idInput, { target: { value: 'tj-14' } });
    fireEvent.change(nameInput, { target: { value: 'Tarjeta de débito' } });
    fireEvent.change(descriptionInput, { target: { value: 'Nuevo producto tarjeta de débito' } });
    fireEvent.change(logoInput, { target: { value: 'https://example.com/image.png' } });
    fireEvent.change(releaseDateInput, { target: { value: '2022-01-01' } });
    fireEvent.click(submitButton);

    expect(mockCreateProduct).toHaveBeenCalledWith({
        id: 'tj-14',
        productName: 'Tarjeta de débito',
        description: 'Nuevo producto tarjeta de débito',
        logo: 'https://example.com/image.png',
        date_release: '2022-01-01',
        date_revision: moment('2022-01-01').add(1, 'year').format('YYYY-MM-DD')
    });
  });

  it("test_submit_form_with_valid_inputs_and_update_existing_product", () => {
    const { getByTitle, getByLabelText } = render(<FormView />);
    const nameInput = getByLabelText('Nombre:');
    const descriptionInput = getByLabelText('Descripción:');
    const logoInput = getByLabelText('Logo:');
    const releaseDateInput = getByLabelText('Fecha de Liberación:');
    const submitButton = getByTitle('Enviar');

    // Mockear la función updateProduct del hook useProducts
    const mockUpdateProduct = jest.fn();

    // Establecer el mock para el hook useProducts
    jest.spyOn(useProducts(), 'updateProduct').mockImplementation(mockUpdateProduct);

    fireEvent.change(nameInput, { target: { value: 'Tarjeta de crédito actualizada' } });
    fireEvent.change(descriptionInput, { target: { value: 'Producto tarjeta de crédito actualizado' } });
    fireEvent.change(logoInput, { target: { value: 'https://example.com/updated-image.png' } });
    fireEvent.change(releaseDateInput, { target: { value: '2023-01-01' } });
    fireEvent.click(submitButton);

    expect(mockUpdateProduct).toHaveBeenCalledWith({
      id: 'tj-13',
      productName: 'Tarjeta de crédito actualizada',
      description: 'Producto tarjeta de crédito actualizado',
      logo: 'https://example.com/updated-image.png',
      date_release: '2023-01-01',
      date_revision: moment('2023-01-01').add(1, 'year').format('YYYY-MM-DD')
    });
  });

  it("test_submit_form_with_invalid_inputs", () => {
    const { getByTitle } = render(<FormView />);
    const submitButton = getByTitle('Enviar');

    // Mockear la función createProduct del hook useProducts
    const mockCreateProduct = jest.fn();
    // Mockear la función updateProduct del hook useProducts
    const mockUpdateProduct = jest.fn();

    // Establecer el mock para el hook useProducts
    jest.spyOn(useProducts(), 'updateProduct').mockImplementation(mockUpdateProduct);
    jest.spyOn(useProducts(), 'createProduct').mockImplementation(mockCreateProduct);


    fireEvent.click(submitButton);

    expect(mockCreateProduct).not.toHaveBeenCalled();
    expect(mockUpdateProduct).not.toHaveBeenCalled();
  });
});