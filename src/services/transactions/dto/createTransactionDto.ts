export interface CreateTransactionDto {
  _id?: string;
  date: string;
  concept: string;
  amountInCents: number | null;
  category?: string;
  subcategory?: string;
  subsubcategory?: string;
  quantity?: number | null;
  unitPrice?: number | null;
  store?: string;
  brand?: string;
  notes?: string;
  type: "payment" | "income";
}
