import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const deleteExpense = async (id: number) => {
  const response = await fetch(`/api/expenses/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete expense");
  }

  const data = await response.json();
  return data;
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("Expense deleted successfully");
    },
    onError: (error) => {
      // Handle error
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense");
    },
  });
};
