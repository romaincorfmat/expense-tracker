"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { useDeleteExpense } from "@/hooks/useDeleteExpense";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Ellipsis, Trash2Icon } from "lucide-react";

const DeleteExpenseButton = ({ expenseId }: { expenseId: number }) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { mutate: deleteExpense, error: deleteError } = useDeleteExpense();

  const handleDelete = (expenseId: number) => {
    if (expenseId) {
      setDeletingId(expenseId);
      deleteExpense(expenseId, {
        onSettled: () => {
          setDeletingId(null);
        },
      });
    } else {
      console.error("Expense ID is undefined. Cannot delete.");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 w-8 h-8 focus-visible:ring-0 focus-visible:ring-transparent"
        >
          <Ellipsis className="w-6 h-6 font-bold" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuItem
          asChild
          onClick={() => handleDelete(expenseId)}
          disabled={deletingId === expenseId}
        >
          <div className="text-red-500 font-semibold  text-lg flex items-center justify-between">
            {deletingId === expenseId ? (
              <p className="text-red-500">Deleting</p>
            ) : (
              <p className="text-red-500">Delete</p>
            )}
            <Trash2Icon className="text-red-500 font-semibold" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DeleteExpenseButton;
