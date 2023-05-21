import { fireEvent, render } from "@testing-library/react";
import { Form } from "../Form";

describe('Pruebas en el componente Form', () => {
  it('renders_the_form_with_initial_values', () => {
    const { getByLabelText } = render(<Form />);

    expect(getByLabelText('ID:')).toHaveValue('');
    expect(getByLabelText('Nombre:')).toHaveValue('');
    expect(getByLabelText('Descripción:')).toHaveValue('');
    expect(getByLabelText('Logo:')).toHaveValue('');
    expect(getByLabelText('Fecha de Liberación:')).toHaveValue('');
    expect(getByLabelText('Fecha de Revisión:')).toHaveValue('');
  });

  it('updates_form_values_on_input_change', () => {
    const { getByLabelText } = render(<Form />);
    const idInput = getByLabelText('ID:');
    const nombreInput = getByLabelText('Nombre:');
    const descripcionInput = getByLabelText('Descripción:');
    const logoInput = getByLabelText('Logo:');
    const fechaLiberacionInput = getByLabelText('Fecha de Liberación:');
    const fechaRevisionInput = getByLabelText('Fecha de Revisión:');

    fireEvent.change(idInput, { target: { value: 'tj-123' } });
    fireEvent.change(nombreInput, { target: { value: 'Tarjeta de crédito' } });
    fireEvent.change(descripcionInput, { target: { value: 'Nuevo producto tarjeta de crédito' } });
    fireEvent.change(logoInput, { target: { value: 'https://example.com/image.png' } });
    fireEvent.change(fechaLiberacionInput, { target: { value: '2022-12-31' } });
    fireEvent.change(fechaRevisionInput, { target: { value: '2023-12-31' } });

    expect(idInput).toHaveValue('tj-123');
    expect(nombreInput).toHaveValue('Tarjeta de crédito');
    expect(descripcionInput).toHaveValue('Nuevo producto tarjeta de crédito');
    expect(logoInput).toHaveValue('https://example.com/image.png');
    expect(fechaLiberacionInput).toHaveValue('2022-12-31');
    expect(fechaRevisionInput).toHaveValue('2023-12-31');
  });
});