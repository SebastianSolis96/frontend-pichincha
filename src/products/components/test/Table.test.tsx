import { fireEvent, render, screen } from "@testing-library/react";
import { Table } from "..";

describe('Pruebas en el componente Table', () => {
  it("test_rendering_table_with_data_and_filter", () => {
    const data = [
        { id: '1', name: "Product 1", description: "Description 1", date_release: "2022-01-01", date_revision: "2022-01-02", logo: "" },
        { id: '2', name: "Product 2", description: "Description 2", date_release: "2022-01-03", date_revision: "2022-01-04", logo: "" },
        { id: '3', name: "Product 3", description: "Description 3", date_release: "2022-01-05", date_revision: "2022-01-06", logo: "" },
    ];
    const filter = "product";
    const component = <Table data={data} filter={filter} />;

    render(component);
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Product 3")).toBeInTheDocument();
  });

  it("test_changing_results_per_page", () => {
    const data = [
        { id: '1', name: "Product 1", description: "Description 1", date_release: "2022-01-01", date_revision: "2022-01-02", logo: "" },
        { id: '2', name: "Product 2", description: "Description 2", date_release: "2022-01-03", date_revision: "2022-01-04", logo: "" },
        { id: '3', name: "Product 3", description: "Description 3", date_release: "2022-01-05", date_revision: "2022-01-06", logo: "" },
    ];
    const filter = "";
    const component = <Table data={data} filter={filter} />;
    render(component);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "10" } });

    expect(screen.getAllByRole("row")).toHaveLength(4); // Header + 3 rows
  });

  it("test_changing_current_page", () => {
    const data = [
        { id: '1', name: "Product 1", description: "Description 1", date_release: "2022-01-01", date_revision: "2022-01-02", logo: "" },
        { id: '2', name: "Product 2", description: "Description 2", date_release: "2022-01-03", date_revision: "2022-01-04", logo: "" },
        { id: '3', name: "Product 3", description: "Description 3", date_release: "2022-01-05", date_revision: "2022-01-06", logo: "" },
        { id: '4', name: "Product 4", description: "Description 4", date_release: "2022-01-07", date_revision: "2022-01-08", logo: "" },
        { id: '5', name: "Product 5", description: "Description 5", date_release: "2022-01-09", date_revision: "2022-01-10", logo: "" },
        { id: '6', name: "Product 6", description: "Description 6", date_release: "2022-01-11", date_revision: "2022-01-12", logo: "" },
        { id: '7', name: "Product 7", description: "Description 7", date_release: "2022-01-13", date_revision: "2022-01-14", logo: "" },
        { id: '8', name: "Product 8", description: "Description 8", date_release: "2022-01-15", date_revision: "2022-01-16", logo: "" },
        { id: '9', name: "Product 9", description: "Description 9", date_release: "2022-01-17", date_revision: "2022-01-18", logo: "" },
        { id: '10', name: "Product 10", description: "Description 10", date_release: "2022-01-19", date_revision: "2022-01-20", logo: "" },
    ];
    const filter = "";
    const component = <Table data={data} filter={filter} />;
    render(component);

    // Action
    const page2Button = screen.getByText("2");
    fireEvent.click(page2Button);

    // Assertion
    expect(screen.getByText("Product 6")).toBeInTheDocument();
    expect(screen.getByText("Product 7")).toBeInTheDocument();
    expect(screen.getByText("Product 8")).toBeInTheDocument();
    expect(screen.getByText("Product 9")).toBeInTheDocument();
    expect(screen.getByText("Product 10")).toBeInTheDocument();
  });

  it("test_clicking_edit_button", () => {
    // Test setup
    const data = [
        { id: '1', name: "Product 1", description: "Description 1", date_release: "2022-01-01", date_revision: "2022-01-02", logo: "" },
    ];
    const filter = "";
    const component = <Table data={data} filter={filter} />;
    render(component);

    const consoleSpy = jest.spyOn(console, "log");

    const editButton = screen.getByText("Editar");
    fireEvent.click(editButton);

    expect(consoleSpy).toHaveBeenCalledWith("Edit");

    consoleSpy.mockRestore();
  });

  it("test_clicking_delete_button", () => {
    // Test setup
    const data = [
        { id: '1', name: "Product 1", description: "Description 1", date_release: "2022-01-01", date_revision: "2022-01-02", logo: "" },
    ];
    const filter = "";
    const component = <Table data={data} filter={filter} />;
    render(component);

    const consoleSpy = jest.spyOn(console, "log");
    const deleteButton = screen.getByText("Eliminar");
    fireEvent.click(deleteButton);

    expect(consoleSpy).toHaveBeenCalledWith("Delete");
    consoleSpy.mockRestore();
  });
});