import { ExpenseFormData } from "@/types/expenses";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createExpense = async (expenseData: ExpenseFormData) => {
  const res = await fetch("/api/expenses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expenseData),
  });

  if (!res.ok) {
    throw new Error("Failed to create expense");
  }
  const data = await res.json();
  return data;
};

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: (error) => {
      console.error("Error creating expense:", error);
    },
  });
}
