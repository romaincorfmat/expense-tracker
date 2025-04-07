import ExpenseForm from "@/components/ExpenseForm";
import ExpensesList from "@/components/ExpensesList";

export default function ExpensesPage() {
  return (
    <div>
      <h1 className="text-center text-3xl my-4">All Expenses</h1>
      <ul>
        <ExpensesList />
        <ExpenseForm />
      </ul>
    </div>
  );
}
