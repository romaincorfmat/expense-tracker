interface Expense {
  id?: number;
  name: string;
  amount: number;
  category: Category;
  transactionType: "INCOME" | "EXPENSE";
  date: Date;
}

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}
