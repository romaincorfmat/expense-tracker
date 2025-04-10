import { cn, formatCurrency, formatDate } from "@/lib/utils";
import DeleteExpenseButton from "./DeleteExpenseButton";

const ExpenseCard = ({ expense }: { expense: Expense }) => {
  return (
    <div className="w-full text-sm border-b-[1px] pb-1 ">
      {/* Scrollable Wrapper */}
      <div className="flex items-center justify-between gap-4 w-full overflow-x-auto whitespace-nowrap no-scrollbar">
        <div className="grid grid-cols-5 gap-2 min-w-[500px]">
          {" "}
          {/* Set min-width to avoid shrinking */}
          <p>{expense.name}</p>
          <p>{formatCurrency(expense.amount)}</p>
          <p>{expense.category.toLowerCase()}</p>
          <p
            className={cn(
              expense.transactionType === "INCOME"
                ? "bg-green-400"
                : "bg-red-400",
              "text-center text-gray-950 rounded-md w-20"
            )}
          >
            {expense.transactionType.toLowerCase()}
          </p>
          <p>{formatDate(expense.date)}</p>
        </div>
        <DeleteExpenseButton expenseId={Number(expense.id)} />
      </div>
    </div>
  );
};
export default ExpenseCard;
