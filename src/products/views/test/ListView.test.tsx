import { fireEvent, render, screen } from '@testing-library/react';
import { InputSearch, MainButton } from "../../components";
import ListView from '../ListView';

describe('Prueba al componente ListView', () => {
  it("test_input_search_renders_correctly", () => {
    render(<InputSearch value="test" onChange={() => {}} />);
    const input = screen.getByPlaceholderText(' Search...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test');
  });

  it("test_main_button_renders_correctly", () => {
    render(<MainButton title="Test Button" action={() => {}} disabled={false} />);
    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("test_handle_change_updates_input_value", () => {
    render(<ListView />);
    const input = screen.getByPlaceholderText(' Search...');
    fireEvent.change(input, { target: { value: 'Test' } });
    expect(input).toHaveValue('Test');
  });
});