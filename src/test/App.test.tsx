// import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Carga inicial de la aplicación', () => {
  it("test_app_renders_without_errors", () => {
    render(<App />);
    expect(screen.getByRole('header')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it("test_header_component_rendered", () => {
      render(<App />);
      expect(screen.getByRole('header')).toBeInTheDocument();
  });

  // Desactivar StrictMode

  // it("test_header_component_not_defined", () => {
  //   const originalHeader = Header;
  //   delete Header;
  //   expect(() => {
  //       render(<App />);
  //   }).toThrow();
  //   Header = originalHeader;
  // });
  // it("test_outlet_component_not_defined", () => {
  //   const originalOutlet = Outlet;
  //   delete Outlet;
  //   expect(() => {
  //       render(<App />);
  //   }).toThrow();
  //   Outlet = originalOutlet;
  // });

  it("test_outlet_component_rendered", () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});