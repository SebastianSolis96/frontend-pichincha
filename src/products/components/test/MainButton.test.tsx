import { fireEvent, render } from "@testing-library/react";
import { MainButton } from "..";

describe('Pruebas en el componente MainButton', () => {
  it("test_button_renders_with_correct_title_and_action", () => {
    const mockAction = jest.fn();
    const { getByText } = render(<MainButton title="Test Button" action={mockAction} />);
    const button = getByText("Test Button");
    fireEvent.click(button);
    expect(mockAction).toHaveBeenCalled();
  });

  it("test_button_renders_without_disabled_class_when_not_disabled", () => {
    const { getByText } = render(<MainButton title="Test Button" action={() => {}} />);
    const button = getByText("Test Button");
    expect(button).not.toHaveClass("disabled-button");
  });

  it("test_title_is_an_empty_string", () => {
    const { getByText } = render(<MainButton title="" action={() => {}} />);
    const button = getByText("");
    expect(button).toBeInTheDocument();
  });

  it("test_button_renders_with_disabled_class_when_disabled_is_true", () => {
    const { getByText } = render(<MainButton title="Test Button" action={() => {}} disabled={true} />);
    const button = getByText("Test Button");
    expect(button).toHaveClass("disabled-button");
  });
});