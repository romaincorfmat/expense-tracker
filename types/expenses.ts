import type { Category, TransactionType } from "@prisma/client";

export interface ExpenseFormData {
  name: string;
  amount: number;
  category: Category;
  transactionType: TransactionType;
}
