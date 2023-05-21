export interface Product {
  id:            string;
  name:          string;
  description:   string;
  logo:          string;
  date_release:  string;
  date_revision: string;
}

export interface productToSave {
    id:            string;
    productName:   string;
    description:   string;
    logo:          string;
    date_release:  string;
    date_revision: string;
}