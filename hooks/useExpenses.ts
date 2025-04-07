import { useQuery } from "@tanstack/react-query";

const fetchExpenses = async () => {
  const res = await fetch("http://localhost:3000/api/expenses");
  if (!res.ok) {
    throw new Error("Failed to fetch expenses");
  }
  return res.json();
};

export function useExpenses() {
  return useQuery<Expense[]>({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });
}
