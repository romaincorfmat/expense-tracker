"use client";
import { useExpenses } from "@/hooks/useExpenses";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useDeleteExpense } from "@/hooks/useDeleteExpense";
import { useSearchParams } from "next/navigation";

const ExpensesList = () => {
  const containerClassName =
    "min-w-md w-full mx-auto border border-gray-300 rounded-lg p-4 shadow-md";
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const { data: expenses, isLoading, error } = useExpenses(name);
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
    <div className=" min-w-md w-full mx-auto border border-gray-300 rounded-lg p-4 shadow-md">
      <ul className="flex flex-col gap-3">
        {expenses.map((expense: Expense) => (
          <div
            key={expense.id}
            className="flex flex-col gap-2 border shadow-md p-3 rounded-sm"
          >
            <li className={"grid grid-cols-4 max-md:grid-cols-2 gap-2 "}>
              <p
                className={cn(
                  expense.transactionType === "INCOME"
                    ? "bg-green-300"
                    : "bg-red-300",
                  "text-center font-semibold text-gray-950 rounded-md p-2 px-3 truncate line-clamp-1 overflow-x-scroll custom-scrollbar  "
                )}
              >
                {expense.name}
              </p>
              <p className="p-1 font-bold">{formatCurrency(expense.amount)}$</p>
              <p className="p-1">({expense.category})</p>
              <p className="p-1">{formatDate(expense.date)}</p>
            </li>
            <Button
              variant="outline"
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
