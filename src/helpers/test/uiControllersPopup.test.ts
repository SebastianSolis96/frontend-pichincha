import { handleCloseMenu, handleOpenMenu } from "../uiControllersPopup";

describe('Prueba al helper uiControllersPopup', () => {
  it("test_no_return_value", () => {
    document.body.innerHTML = '<div id="popup"></div>';
    const returnValue = handleOpenMenu();
    
    expect(returnValue).toBeUndefined();
  });

  it("test_dom_modification_only", () => {
    document.body.innerHTML = '<div id="popup"></div>';
    
    handleOpenMenu();
    expect(document.body.innerHTML).toBe('<div id="popup" class="open"></div>');
  });

  it("test_remove_popup_class_successfully", () => {
    const popup = document.createElement("div");
    popup.id = "popup";
    popup.classList.add("open");
    document.body.appendChild(popup);

    handleCloseMenu();
    expect(popup.classList.contains("open")).toBe(false);
  });

  it("test_popup_element_does_not_exist", () => {
    const popup = document.getElementById("popup");

    handleCloseMenu();
    expect(popup).toBeNull();
  });
});