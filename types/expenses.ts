import type { Category } from "@prisma/client";

export interface ExpenseFormData {
  name: string;
  amount: number;
  category: Category;
}
