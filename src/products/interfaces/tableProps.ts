import { Product } from ".";

export interface TableProps {
  data: Product[] | undefined;
  filter: string;
}