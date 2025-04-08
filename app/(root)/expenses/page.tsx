import ExpenseForm from "@/components/ExpenseForm";
import ExpensesList from "@/components/ExpensesList";
import ExpenseStat from "@/components/ExpenseStat";
import Search from "@/components/Search/Search";

export default function ExpensesPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-center text-3xl my-4">All Expenses</h1>
      <div className="flex flex-col gap-4  p-6 md:min-w-2xl ">
        <ExpenseStat />
        <Search />
        <ExpenseForm />
        <ExpensesList />
      </div>
    </div>
  );
}
