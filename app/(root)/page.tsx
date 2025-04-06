export default async function ExpensesPage() {
  const res = await fetch("http://localhost:3000/api/expenses", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch expenses");
  }

  // Ensure the body is read only once
  const { expenses } = await res.json();

  return (
    <div>
      <h1>All Expenses</h1>
      <ul>
        {expenses.map((expense: Expense) => (
          <li key={expense.id}>
            {expense.name}: ${expense.amount} ({expense.category})
          </li>
        ))}
      </ul>
    </div>
  );
}
