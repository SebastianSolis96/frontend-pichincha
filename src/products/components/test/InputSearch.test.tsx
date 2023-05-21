import { fireEvent, render } from "@testing-library/react";
import { InputSearch } from "..";

describe('Pruebas en el componente InputSearch', () => {
  it("test_input_search_renders_correctly", () => {
    const { getByPlaceholderText } = render(<InputSearch value="test" onChange={() => {}} />);
    const inputElement = getByPlaceholderText(" Search...");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("test");
  });

  it("test_on_change_function_called", () => {
    const onChangeMock = jest.fn();
    const { getByPlaceholderText } = render(<InputSearch value="" onChange={onChangeMock} />);
    const inputElement = getByPlaceholderText(" Search...");
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it("test_value_prop_empty_string", () => {
    const { getByPlaceholderText } = render(<InputSearch value="" onChange={() => {}} />);
    const inputElement = getByPlaceholderText(" Search...");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("");
  });
});