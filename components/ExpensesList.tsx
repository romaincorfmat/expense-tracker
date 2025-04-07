"use client";
import { useExpenses } from "@/hooks/useExpenses";
import { formatDate } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useDeleteExpense } from "@/hooks/useDeleteExpense";

const ExpensesList = () => {
  const containerClassName =
    "max-w-xl mx-auto border border-gray-300 rounded-lg p-4 shadow-md";

  const { data: expenses, isLoading, error } = useExpenses();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { mutate: deleteExpense, error: deleteError } = useDeleteExpense();

  const handleDelete = (expense: Expense) => {
    if (expense.id) {
      setDeletingId(expense.id);
      deleteExpense(expense.id, {
        onSettled: () => {
          setDeletingId(null);
        },
      });
    } else {
      console.error("Expense ID is undefined. Cannot delete.");
    }
  };

  if (isLoading) return <div className={containerClassName}>Loading...</div>;
  if (error)
    return <div className={containerClassName}>Error: {error.message}</div>;
  if (!expenses || expenses.length === 0)
    return <div className={containerClassName}>No expenses found</div>;

  return (
    <div className="max-w-xl mx-auto border border-gray-300 rounded-lg p-4 shadow-md">
      <ul className="flex flex-col gap-3">
        {expenses.map((expense: Expense) => (
          <div
            key={expense.id}
            className="flex flex-col gap-2 border shadow-md p-3 rounded-sm"
          >
            <li className="grid grid-cols-4 max-md:grid-cols-2 gap-2 ">
              <p> {expense.name}:</p>
              <p>{expense.amount}$</p>
              <p>({expense.category})</p>
              <p>{formatDate(expense.date)}</p>
            </li>
            <Button
              variant="destructive"
              className="min-w-26 max-w-38"
              onClick={() => handleDelete(expense)}
              disabled={deletingId === expense.id}
            >
              {deletingId === expense.id ? "Deleting..." : "Delete Expense"}
            </Button>
            {deleteError && (
              <p className="text-red-500">
                Error deleting expense: {deleteError.message}
              </p>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ExpensesList;
