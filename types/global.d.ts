interface Expense {
  id?: number;
  name: string;
  amount: number;
  category: Category;
  transactionType: "INCOME" | "EXPENSE";
  date: Date;
}
