"use client";
import { useExpenses } from "@/hooks/useExpenses";
import { cn, formatCurrency } from "@/lib/utils";
import React from "react";

const ExpenseStat = () => {
  const { data, isLoading, error } = useExpenses();
  if (!data) return <div>No data Found</div>;

  const totalIncome = data
    ?.filter((expense) => expense.transactionType === "INCOME")
    .map((expense) => expense.amount)
    .reduce((acc, amount) => acc + amount, 0)
    .toFixed(2);

  const totalExpense = data
    ?.filter((expense) => expense.transactionType === "EXPENSE")
    .map((expense) => expense.amount)
    .reduce((acc, amount) => acc + amount, 0)
    .toFixed(2);

  function calculateBalance() {
    return (Number(totalIncome) - Number(totalExpense)).toFixed(2);
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="border shadow-md p-4 rounded-lg flex flex-col">
        Income Card
        <span className="font-bold text-green-500">
          {formatCurrency(totalIncome)}
        </span>
      </div>
      <div className="border shadow-md p-4 rounded-lg flex flex-col">
        Balance
        <span
          className={cn(
            Number(calculateBalance()) >= 0 ? "text-green-400" : "text-red-500",
            "font-bold"
          )}
        >
          {formatCurrency(calculateBalance())}
        </span>
      </div>
      <div className="border shadow-md p-4 rounded-lg flex flex-col ">
        Expense Card
        <span className="font-bold text-red-500">
          {formatCurrency(totalExpense)}
        </span>
      </div>
    </div>
  );
};

export default ExpenseStat;
