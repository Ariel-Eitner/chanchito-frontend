export interface Category {
  id: string;
  name: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  name: string;
  subSubcategories?: string[];
}

export interface FormData {
  categoria?: string;
  subcategoria?: string;
  subsubcategoria?: string;
  cantidad: number;
  precioUnitario: number;
  tienda: string;
  marca: string;
  notas: string;
}
