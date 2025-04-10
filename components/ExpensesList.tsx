"use client";
import { useExpenses } from "@/hooks/useExpenses";
import React from "react";

import ExpenseCard from "./ExpenseCard";
import { Loader2 } from "lucide-react";

const ExpensesList = ({
  name,
  transactionType,
}: {
  name: string;
  transactionType: string;
}) => {
  const containerClassName =
    "w-full mx-auto border border-gray-300 rounded-lg p-4 shadow-md";

  const {
    data: expenses,
    isLoading,
    error,
  } = useExpenses(name, transactionType);

  if (isLoading)
    return (
      <div className={containerClassName}>
        {" "}
        <div className="flex items-center gap-2 text-black">
          <p>Loading...</p>
          <Loader2 className="animate-spin" />
        </div>
      </div>
    );

  if (error)
    return <div className={containerClassName}>Error: {error.message}</div>;

  if (!expenses || expenses.length === 0)
    return <div className={containerClassName}>No expenses found</div>;

  return (
    <div className=" w-full mx-auto border border-gray-300 rounded-lg p-4 shadow-md">
      <div className="flex flex-col gap-3 ">
        {expenses.map((expense: Expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
      </div>
    </div>
  );
};

export default ExpensesList;
