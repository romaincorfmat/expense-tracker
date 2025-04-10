"use client";
import { useExpenses } from "@/hooks/useExpenses";
import { cn, formatCurrency } from "@/lib/utils";
import { ChartLine, Loader2, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

const ExpenseStat = () => {
  const { data, isLoading, error } = useExpenses();
  // if (!data) return <div>No data Found</div>;
  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
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
    <div className="flex max-md:flex-col w-full  items-center  gap-4">
      <div className="border shadow-md p-4 rounded-lg flex flex-col w-full">
        <div className="flex items-center justify-between">
          Balance
          <ChartLine />
        </div>
        <span
          className={cn(
            Number(calculateBalance()) >= 0 ? "text-green-400" : "text-red-500",
            "font-bold"
          )}
        >
          {isLoading ? (
            <div className="flex items-center gap-2 text-black">
              <p>Loading...</p>
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            formatCurrency(calculateBalance())
          )}
          {}
        </span>
      </div>
      <div className="border shadow-md p-4 rounded-lg flex flex-col w-full">
        <div className="flex items-center justify-between">
          Income Card
          <TrendingUp />
        </div>
        <span className="font-bold text-green-500">
          {isLoading ? (
            <div className="flex items-center gap-2 text-black">
              <p>Loading...</p>
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            formatCurrency(totalIncome || 0)
          )}
        </span>
      </div>

      <div className="border shadow-md p-4 rounded-lg flex flex-col w-full">
        <div className="flex items-center justify-between">
          Expense Card
          <TrendingDown />
        </div>
        <span className="font-bold text-red-500">
          {isLoading ? (
            <div className="flex items-center gap-2 text-black">
              <p>Loading...</p>
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            formatCurrency(totalExpense || 0)
          )}
        </span>
      </div>
    </div>
  );
};

export default ExpenseStat;
