import { Product } from "../../products/interfaces";
import { filterHelper } from "../tableHelper";

describe('Prueba al helper tableHelper', () => {
  it("test_filter_helper_is_case_insensitive_when_filtering", () => {
    const data: Product[] = [
        {
            id: "1",
            name: "Product One",
            description: "This is product one",
            logo: "",
            date_release: "",
            date_revision: ""
        },
        {
            id: "2",
            name: "Product Two",
            description: "This is product two",
            logo: "",
            date_release: "",
            date_revision: ""
        }
    ];
    const filter = "product";
    const result = filterHelper(data, filter);
    expect(result.length).toBe(2);
  });

  it("test_filter_helper_returns_all_items_when_filter_is_empty_string", () => {
    const data: Product[] = [
        {
            id: "1",
            name: "Product One",
            description: "This is product one",
            logo: "",
            date_release: "",
            date_revision: ""
        },
        {
            id: "2",
            name: "Product Two",
            description: "This is product two",
            logo: "",
            date_release: "",
            date_revision: ""
        }
    ];
    const filter = "";
    const result = filterHelper(data, filter);
    expect(result.length).toBe(2);
  });

  it("test_filter_helper_handles_filter_containing_special_characters_or_numbers", () => {
    const data: Product[] = [
        {
            id: "1",
            name: "Product One",
            description: "This is product one",
            logo: "",
            date_release: "",
            date_revision: ""
        },
        {
            id: "2",
            name: "Product Two",
            description: "This is product two",
            logo: "",
            date_release: "",
            date_revision: ""
        }
    ];
    const filter = "!@#$%^&*()1234567890";
    const result = filterHelper(data, filter);
    expect(result.length).toBe(0);
  });

  it("test_filter_helper_returns_empty_array_when_data_is_undefined", () => {
    const data: Product[] | undefined = undefined;
    const filter = "product";
    const result = filterHelper(data, filter);
    expect(result.length).toBe(0);
  });
});