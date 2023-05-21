import { Product } from "../products/interfaces";

export const initPopup = {
  title: '¿Qué acción deseas realizar?',
  action: 'actions',
  titleMainButton: 'Eliminar',
  titleSecondaryButton: 'Editar',
}

export const filterHelper = (data: Product[] | undefined, filter: string) => {
  return data ? data.filter((item: Product) => {
    const { name, description, id, date_release, date_revision } = item;

    // Realiza el filtrado según los campos de búsqueda
    const lowerCaseQuery = filter.toLowerCase();
    return (
      name.toLowerCase().includes(lowerCaseQuery) ||
      description.toLowerCase().includes(lowerCaseQuery) ||
      id.toString().includes(lowerCaseQuery) ||
      date_release.includes(lowerCaseQuery) ||
      date_revision.includes(lowerCaseQuery)
    );
  }) : [];
}