import { pichinchaApi } from "../../api/pichinchaApi";
import { FormValues } from "../../products/interfaces";
import { FormErrors, cacheResult, getCachedResult, performSearch, validateInput } from "../formHelper";

describe('Prueba al helper formHelper', () => {
  it("test_perform_search_with_cached_result", async () => {
    const query = "testQuery";
    cacheResult(query, "testResult");

    const result = await performSearch(query);
    expect(result).toBe("");
  });

  it("test_perform_search_with_valid_api_result", async () => {
    const query = "testQuery";
    const data = { id: 1, name: "testProduct" };
    jest.spyOn(pichinchaApi, "get").mockResolvedValueOnce({ data });

    const result = await performSearch(query);

    expect(result).toBe("");
    expect(getCachedResult(query)).toBe(JSON.stringify(data));
  });

  it("test_perform_search_with_empty_api_result", async () => {
    const query = "testQuery";
    jest.spyOn(pichinchaApi, "get").mockResolvedValueOnce({ data: null });

    const result = await performSearch(query);

    expect(result).toBe("El ID no es válido");
  });

  it("test_validate_input_with_valid_input", () => {
    const formValues: FormValues = {
      id: "123",
      productName: "Product Name",
      description: "Product Description",
      logo: "logo.png",
      date_release: "2022-01-01",
      date_revision: "2023-01-01"
    };
    const formErrors: FormErrors = {};
    const setFormErrors = jest.fn();
    const setIsError = jest.fn();

    validateInput("id", "123", formValues, setFormErrors, formErrors, setIsError);
    validateInput("productName", "Product Name", formValues, setFormErrors, formErrors, setIsError);
    validateInput("description", "Product Description", formValues, setFormErrors, formErrors, setIsError);
    validateInput("logo", "logo.png", formValues, setFormErrors, formErrors, setIsError);
    validateInput("date_release", "2022-01-01", formValues, setFormErrors, formErrors, setIsError);
    validateInput("date_revision", "2023-01-01", formValues, setFormErrors, formErrors, setIsError);

    expect(setFormErrors).toHaveBeenCalledTimes(6);
    expect(setIsError).toHaveBeenCalledWith(false);
  });

  it("test_validate_input_with_invalid_id", async () => {
    const formValues: FormValues = {
      id: "123",
      productName: "Product Name",
      description: "Product Description",
      logo: "logo.png",
      date_release: "2022-01-01",
      date_revision: "2023-01-01"
    };
    const formErrors: FormErrors = {};
    const setFormErrors = jest.fn();
    const setIsError = jest.fn();
    const performSearchWithDelayMock = jest.fn().mockRejectedValue(new Error("El ID no es válido"));

    await validateInput("id", "invalid_id", formValues, setFormErrors, formErrors, setIsError);
    expect(performSearchWithDelayMock).toHaveBeenCalledWith("invalid_id");
    expect(setFormErrors).toHaveBeenCalledWith({ ...formErrors, id: "El ID no es válido" });
    expect(setIsError).toHaveBeenCalledWith(true);
  });

  it("test_validate_input_with_release_date_before_current_date", () => {
    const formValues: FormValues = {
      id: "123",
      productName: "Product Name",
      description: "Product Description",
      logo: "logo.png",
      date_release: "2021-01-01",
      date_revision: "2022-01-01"
    };
    const formErrors: FormErrors = {};
    const setFormErrors = jest.fn();
    const setIsError = jest.fn();

    validateInput("date_release", "2021-01-01", formValues, setFormErrors, formErrors, setIsError);
    expect(setFormErrors).toHaveBeenCalledWith({ ...formErrors, date_release: "La fecha debe ser igual o mayor a la fecha actual" });
    expect(setIsError).toHaveBeenCalledWith(true);
  });
});