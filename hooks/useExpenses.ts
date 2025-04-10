import { useQuery } from "@tanstack/react-query";

const fetchExpenses = async (name?: string, transactionType?: string) => {
  const url = new URL("http://localhost:3000/api/expenses");
  if (name) {
    url.searchParams.append("name", name);
  }
  if (transactionType) {
    url.searchParams.append("transactionType", transactionType);
  }
  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error("Failed to fetch expenses");
  }
  return res.json();
};

export function useExpenses(name?: string, transactionType?: string) {
  return useQuery<Expense[]>({
    queryKey: ["expenses", name, transactionType],
    queryFn: () => fetchExpenses(name, transactionType),
  });
}
